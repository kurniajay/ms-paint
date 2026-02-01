import React from "react";
import { createCanvasEngine } from "./Engine/canvasEngine";
import CanvasController from "./Engine/canvasController";
import { createTool, TOOLS } from "./Engine/toolFactory";

function getPos(e, canvas, zoom = 1) {
  const rect = canvas.getBoundingClientRect();
  
  // getBoundingClientRect returns the scaled (transformed) size
  // Map from visual position to actual canvas pixel position
  const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
  
  return {
    x: Math.floor(x),
    y: Math.floor(y),
  };
}

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    /* ---------- refs ---------- */
    this.canvasRef = React.createRef();
    this.canvasContainerRef = React.createRef();
    this.overlayRef = React.createRef();
    /* ---------- buffers ---------- */
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    /* ---------- engine ---------- */
    this.engine = null;
    this.controller = null;

    /* ---------- resize ---------- */
    this.isResizing = false;
    this.currentHandle = null;

    /* ---------- undo/redo history ---------- */
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 20;

    /* ---------- state ---------- */
    // Calculate canvas size to fill available space
    const availableWidth = window.innerWidth - 60; // minus sidebar
    const availableHeight = window.innerHeight - 19 - 40 - 20; // minus menubar, palette, footer
    
    this.state = {
      width: Math.max(600, availableWidth),
      height: Math.max(400, availableHeight),
      zoom: 1,
    };

    this.stateRef = {
      color: this.props.color || "black",
      size: 1,
      type: 2,
      setColor: (color) => {
        this.stateRef.color = color;
        this.props.onColorPick?.(color);
      },
    };
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = this.state.width;
    canvas.height = this.state.height;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state to history
    this.saveToHistory();

    // ✅ overlay passed correctly
    this.engine = createCanvasEngine(canvas, this.overlayRef.current);

    this.controller = new CanvasController(
      this.engine,
      null,
      () => this.stateRef,
    );

    this.switchTool(this.props.tool);

    window.addEventListener("mousemove", this.resize);
    window.addEventListener("mouseup", this.stopResize);

    this.props.dim?.({
      WIDTH: canvas.width,
      HEIGHT: canvas.height,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tool !== this.props.tool) {
      this.switchTool(this.props.tool);
    }

    if (prevProps.color !== this.props.color) {
      this.stateRef.color = this.props.color;
    }

    if (prevProps.toolConfig !== this.props.toolConfig) {
      Object.assign(this.stateRef, this.props.toolConfig || {});
      
      // Notify tool about config change
      const strokeController = this.controller?.activeController;
      if (strokeController?.tool?.configChanged && strokeController?.buildCtx) {
        strokeController.tool.configChanged(strokeController.buildCtx({ x: 0, y: 0 }));
      }
    }
    
    // Reset canvas context transform when zoom changes
    if (prevState && prevState.zoom !== this.state.zoom) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset to identity matrix
    }
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.stopResize);
  }

  // ==================== FILE OPERATIONS ====================

  // Clear canvas to white
  clearCanvas = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.saveToHistory();
  };

  // Get canvas as base64 data URL
  getImageData = () => {
    return this.canvasRef.current?.toDataURL("image/png");
  };

  // Get canvas element
  getCanvas = () => {
    return this.canvasRef.current;
  };

  // Get canvas dimensions
  getWidth = () => this.state.width;
  getHeight = () => this.state.height;

  // Load image onto canvas
  loadImage = (dataUrl) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      // Resize canvas if needed
      canvas.width = img.width;
      canvas.height = img.height;
      this.setState({ width: img.width, height: img.height });
      
      // Draw image
      ctx.drawImage(img, 0, 0);
      
      // Update footer
      this.props.dim?.({ WIDTH: img.width, HEIGHT: img.height });
      
      // Save to history
      this.saveToHistory();
    };
    
    img.src = dataUrl;
  };

  // ==================== UNDO/REDO ====================

  // Save current canvas state to history
  saveToHistory = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL("image/png");
    
    // Add to undo stack
    this.undoStack.push(imageData);
    
    // Limit stack size
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    
    // Clear redo stack when new action is performed
    this.redoStack = [];
  };

  // Undo last action
  undo = () => {
    if (this.undoStack.length <= 1) {
      console.log("Nothing to undo");
      return;
    }
    
    // Move current state to redo stack
    const currentState = this.undoStack.pop();
    this.redoStack.push(currentState);
    
    // Restore previous state
    const previousState = this.undoStack[this.undoStack.length - 1];
    this.restoreState(previousState);
  };

  // Redo last undone action
  redo = () => {
    if (this.redoStack.length === 0) {
      console.log("Nothing to redo");
      return;
    }
    
    // Get state from redo stack
    const nextState = this.redoStack.pop();
    this.undoStack.push(nextState);
    
    // Restore state
    this.restoreState(nextState);
  };

  // Restore canvas from data URL
  restoreState = (dataUrl) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    
    img.src = dataUrl;
  };

  switchTool(toolKey) {
    if (!this.controller) return;

    const { tool, renderer } = createTool(toolKey, this.canvasRef.current);
    
    // Pass Canvas component reference to magnify renderer
    if (toolKey === 'MAGNIFY' && renderer.setCanvasComponent) {
      renderer.setCanvasComponent(this);
    }
    
    this.controller.setRenderer(renderer);
    this.controller.setTool(tool);

    console.log("Tool switched →", toolKey, TOOLS[toolKey]);
  }

  /* ---------- pointer ---------- */

  handlePointerDown = (e) => {
    const pos = getPos(e, this.canvasRef.current, this.state.zoom);
    this.controller?.pointerDown(pos);
    this.props.coord?.(pos);
  };

  handlePointerMove = (e) => {
    const pos = getPos(e, this.canvasRef.current, this.state.zoom);
    this.controller?.pointerMove(pos);
    this.props.coord?.(pos);
  };

  handlePointerUp = () => {
    this.controller?.pointerUp();
    this.props.clearCoord?.();
    
    // Save state for undo after each drawing action
    this.saveToHistory();
  };

  /* ---------- resizing ---------- */

  startResize = (e) => {
    e.preventDefault();
    this.isResizing = true;
    this.currentHandle = e.target;

    const canvas = this.canvasRef.current;
    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;
    this.bufferCtx.drawImage(canvas, 0, 0);
  };

  resize = (e) => {
    if (!this.isResizing) return;

    const container = this.canvasContainerRef.current;
    const rect = container.getBoundingClientRect();

    let w = container.clientWidth;
    let h = container.clientHeight;

    if (this.currentHandle.classList.contains("right")) {
      w = Math.max(100, e.clientX - rect.left);
    }
    if (this.currentHandle.classList.contains("bottom")) {
      h = Math.max(100, e.clientY - rect.top);
    }
    if (this.currentHandle.classList.contains("corner")) {
      w = Math.max(100, e.clientX - rect.left);
      h = Math.max(100, e.clientY - rect.top);
    }

    container.style.width = `${w}px`;
    container.style.height = `${h}px`;

    this.applyResize(w, h);
  };

  stopResize = () => {
    this.isResizing = false;
    this.currentHandle = null;
  };

  applyResize(w, h) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(this.bufferCanvas, 0, 0);

    this.props.dim?.({ WIDTH: w, HEIGHT: h });
  }

  render() {
    return (
      <div className="canvasbackcontainer">
        <div
          className="canvascontainer"
          ref={this.canvasContainerRef}
          style={{
            width: this.state.width,
            height: this.state.height,
            position: "relative",
          }}
        >
          <canvas
            ref={this.canvasRef}
            className="canvas"
            style={{ 
              width: "100%", 
              height: "100%",
            }}
            onPointerDown={this.handlePointerDown}
            onPointerMove={this.handlePointerMove}
            onPointerUp={this.handlePointerUp}
            onPointerLeave={() => this.props.clearCoord?.()}
          />

          <div
            ref={this.overlayRef}
            className="canvas-overlay"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />

          <img
            src="../../imgs/point.png"
            className="resize-handle right"
            onMouseDown={this.startResize}
          />
          <img
            src="../../imgs/point.png"
            className="resize-handle bottom"
            onMouseDown={this.startResize}
          />
          <img
            src="../../imgs/point.png"
            className="resize-handle corner"
            onMouseDown={this.startResize}
          />
        </div>
      </div>
    );
  }
}
