import React from "react";
import Menubar from "./components/container1/Menubar";
import Sidebar from "./components/container2/Sidebar";
import Canvas from "./components/container2/Canvas";
import Pallete from "./components/container3/Pallete";
import Footer from "./components/container4/Footer";
// Dialogs reuse existing modal styles; inline rendering below

// API base URL
const API_URL = "http://localhost:5000/api";

const AppMode = {
  DRAW: "DRAW",
  EDIT: "EDIT",
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.footerRef = React.createRef();
    this.canvasRef = React.createRef();
    this.dialogInputRef = React.createRef();

    this.state = {
      mode: AppMode.DRAW,
      currTool: "PENCIL",
      currColor: "black",
      toolConfig: {
        type: null,
        options: {
          size: null,
        },
      },
      defaultFooterMsg: "For Help, click Help Topics on the Help Menu",
      // File state
      currentDrawingId: null,
      currentDrawingTitle: "Untitled",
      hasUnsavedChanges: false,
      // View state
      showToolBox: true,
      showColorBox: true,
      showStatusBar: true,
    };
  }

  componentDidMount() {
    // Add global keyboard shortcuts
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const { ctrlKey, key } = e;

    // Only Undo/Redo shortcuts
    if (ctrlKey) {
      switch (key.toLowerCase()) {
        case "z": // Undo
          e.preventDefault();
          this.handleUndo();
          break;
        case "y": // Redo
          e.preventDefault();
          this.handleRedo();
          break;
        default:
          break;
      }
    }

    // F11 - Fullscreen
    if (key === "F11") {
      e.preventDefault();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  };

  setToolConfig = (config) => {
    this.setState({ toolConfig: config });
  };

  footer = {
    coord: (pos) => {
      // console.log("[App] coord forwarded:", pos, this.footerRef.current);
      this.footerRef.current?.updateCoord(pos);
    },
    dim: (dim) => {
      // console.log("[App] dim forwarded:", dim, this.footerRef.current);
      this.footerRef.current?.updateDim(dim);
    },
    msg: (text) => {
      // console.log("[App] msg forwarded:", text, this.footerRef.current);
      this.footerRef.current?.updateMessage(text);
    },
    clearCoord: () => {
      // console.log("[App] clearCoord forwarded");
      this.footerRef.current?.clearCoord();
    },
  };
  setTool = (toolName) => {
    this.setState({ currTool: toolName });
  };

  setColor = (color) => {
    this.setState({ currColor: color });
  };

  // Handle color selection from Edit Colors dialog
  handleColorSelect = (color) => {
    this.setState({ currColor: color });
  };

  // ==================== FILE OPERATIONS ====================

  // NEW - Clear canvas
  handleNew = () => {
    // replaced browser confirm with themed dialog
    if (this.state.hasUnsavedChanges) {
      return this.showDialog("confirm", "Create new drawing? Unsaved changes will be lost.")
        .then((ok) => {
          if (!ok) return;
          this.canvasRef.current?.clearCanvas();
          this.setState({
            currentDrawingId: null,
            currentDrawingTitle: "Untitled",
            hasUnsavedChanges: false,
          });
        });
    }

    // Clear canvas
    this.canvasRef.current?.clearCanvas();

    // Reset state
    this.setState({
      currentDrawingId: null,
      currentDrawingTitle: "Untitled",
      hasUnsavedChanges: false,
    });
  };

  // SAVE - Save to database
  handleSave = async () => {
    const imageData = this.canvasRef.current?.getImageData();
    if (!imageData) return;

    // If already saved before, update it
    if (this.state.currentDrawingId) {
      try {
        const response = await fetch(`${API_URL}/drawings/${this.state.currentDrawingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.state.currentDrawingTitle,
            imageData,
          }),
        });
        if (response.ok) {
          this.setState({ hasUnsavedChanges: false });
          await this.showDialog("alert", "Drawing saved!");
        }
      } catch (error) {
        await this.showDialog("alert", "Error saving: " + error.message);
      }
    } else {
      // First time save - ask for title
      this.handleSaveAs();
    }
  };

  // SAVE AS - Always create new
  handleSaveAs = async () => {
    const imageData = this.canvasRef.current?.getImageData();
    if (!imageData) return;

    const title = await this.showDialog("prompt", "Enter drawing title:", this.state.currentDrawingTitle);
    if (!title) return;

    try {
      const response = await fetch(`${API_URL}/drawings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          imageData,
          width: this.canvasRef.current?.getWidth(),
          height: this.canvasRef.current?.getHeight(),
        }),
      });

      if (response.ok) {
        const saved = await response.json();
        this.setState({
          currentDrawingId: saved._id,
          currentDrawingTitle: saved.title,
          hasUnsavedChanges: false,
        });
        await this.showDialog("alert", "Drawing saved!");
      }
    } catch (error) {
      await this.showDialog("alert", "Error saving: " + error.message);
    }
  };

  // OPEN - Load from database
  handleOpen = async (drawingId) => {
    if (this.state.hasUnsavedChanges) {
      const ok = await this.showDialog("confirm", "Open another drawing? Unsaved changes will be lost.");
      if (!ok) return;
    }

    try {
      const response = await fetch(`${API_URL}/drawings/${drawingId}`);
      if (response.ok) {
        const drawing = await response.json();
        
        // Load image onto canvas
        this.canvasRef.current?.loadImage(drawing.imageData);
        
        this.setState({
          currentDrawingId: drawing._id,
          currentDrawingTitle: drawing.title,
          hasUnsavedChanges: false,
        });
      }
    } catch (error) {
      alert("Error opening: " + error.message);
    }
  };

  // GET ALL DRAWINGS - For gallery
  getDrawings = async () => {
    try {
      const response = await fetch(`${API_URL}/drawings`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching drawings:", error);
    }
    return [];
  };

  // DELETE - Remove from database
  handleDelete = async (drawingId) => {
    const ok = await this.showDialog("confirm", "Are you sure you want to delete this drawing?");
    if (!ok) return;

    try {
      const response = await fetch(`${API_URL}/drawings/${drawingId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await this.showDialog("alert", "Drawing deleted!");
        // If deleted current drawing, reset
        if (drawingId === this.state.currentDrawingId) {
          this.handleNew();
        }
      }
    } catch (error) {
      await this.showDialog("alert", "Error deleting: " + error.message);
    }
  };

  // EXPORT - Download as file
  handleExport = (format = "png") => {
    const canvas = this.canvasRef.current?.getCanvas();
    if (!canvas) return;

    const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
    const dataUrl = canvas.toDataURL(mimeType);
    
    const link = document.createElement("a");
    link.download = `${this.state.currentDrawingTitle}.${format}`;
    link.href = dataUrl;
    link.click();
  };

  // Mark canvas as changed
  markUnsaved = () => {
    if (!this.state.hasUnsavedChanges) {
      this.setState({ hasUnsavedChanges: true });
    }
  };

  // ==================== EDIT OPERATIONS ====================

  // Undo last action
  handleUndo = () => {
    this.canvasRef.current?.undo();
  };

  // Redo last undone action
  handleRedo = () => {
    this.canvasRef.current?.redo();
  };

  // Clear entire image
  handleClearImage = () => {
    this.showDialog("confirm", "Clear the entire image?").then((ok) => {
      if (ok) this.canvasRef.current?.clearCanvas();
    });
  };

  // Show a themed dialog and return a Promise
  showDialog = (type, message, defaultValue = "") => {
    return new Promise((resolve) => {
      this.setState({
        dialog: { open: true, type, message, defaultValue, resolve },
      });
    });
  };

  // Close dialog helper
  closeDialog = (result) => {
    const dlg = this.state.dialog;
    if (dlg?.resolve) dlg.resolve(result);
    this.setState({ dialog: null });
  };

  // ==================== VIEW OPERATIONS ====================

  // Toggle tool box visibility
  handleToggleToolBox = () => {
    this.setState((prev) => ({ showToolBox: !prev.showToolBox }));
  };

  // Toggle color box visibility
  handleToggleColorBox = () => {
    this.setState((prev) => ({ showColorBox: !prev.showColorBox }));
  };

  // Toggle status bar visibility
  handleToggleStatusBar = () => {
    this.setState((prev) => ({ showStatusBar: !prev.showStatusBar }));
  };

  render() {
    const { showToolBox, showColorBox, showStatusBar } = this.state;

    return (
      <>
        <Menubar
          setFooter={this.footer.msg}
          clearFooter={this.footer.resetMsg}
          onNew={this.handleNew}
          onSave={this.handleSave}
          onSaveAs={this.handleSaveAs}
          onOpen={this.handleOpen}
          onExport={this.handleExport}
          onDelete={this.handleDelete}
          getDrawings={this.getDrawings}
          onUndo={this.handleUndo}
          onRedo={this.handleRedo}
          onClearImage={this.handleClearImage}
          onToggleToolBox={this.handleToggleToolBox}
          onToggleColorBox={this.handleToggleColorBox}
          onToggleStatusBar={this.handleToggleStatusBar}
          showToolBox={showToolBox}
          showColorBox={showColorBox}
          showStatusBar={showStatusBar}
          onColorSelect={this.handleColorSelect}
        />

        <div className="container-2">
          {showToolBox && (
            <Sidebar
              setFooter={this.footer.msg}
              clearFooter={this.footer.resetMsg}
              tool={this.state.currTool}
              setTool={this.setTool}
              currConfig={this.state.toolConfig}
              onToolConfigChange={this.setToolConfig}
            />
          )}

          <Canvas
            ref={this.canvasRef}
            Dim={{ WIDTH: 750, HEIGHT: 500 }}
            coord={this.footer.coord}
            clearCoord={this.footer.clearCoord}
            dim={this.footer.dim}
            tool={this.state.currTool}
            color={this.state.currColor}
            toolConfig={this.state.toolConfig}
            onColorPick={this.setColor}
          />

          <div className="right-sidebar"></div>
        </div>

        {showColorBox && <Pallete setColor={this.setColor} />}

        {showStatusBar && <Footer ref={this.footerRef} />}

        {/* Themed dialog overlay - reuse existing .modal styles */}
        {this.state.dialog && (
          <div className="modal-overlay" onClick={() => this.closeDialog(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>{this.state.dialog.type === "prompt" ? "Enter value" : "Message"}</h3>
              <p>{this.state.dialog.message}</p>
              {this.state.dialog.type === "prompt" && (
                <input
                  ref={this.dialogInputRef}
                  defaultValue={this.state.dialog.defaultValue || ""}
                  className="win95-input"
                />
              )}
              <div className="modal-buttons">
                <button
                  onClick={() => {
                    if (this.state.dialog.type === "prompt") {
                      this.closeDialog(this.dialogInputRef.current?.value ?? "");
                    } else {
                      this.closeDialog(true);
                    }
                  }}
                >
                  OK
                </button>
                {this.state.dialog.type !== "alert" && (
                  <button onClick={() => this.closeDialog(false)}>Cancel</button>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;
