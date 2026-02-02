export class MagnificationTool {
  constructor(meta) {
    this.meta = meta;
  }

  begin(ctx) {
    // Get zoom level - try both zoom and size properties
    const zoomLevel = ctx.zoom || ctx.size || 1;
    
    // Apply CSS zoom centered on the click position
    ctx.renderer.applyZoom(zoomLevel, ctx.pos);
  }

  update() {}
  end() {}
}

export class MagnificationRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.zoom = 1;
    this.canvasComponent = null;
  }

  setCanvasComponent(component) {
    this.canvasComponent = component;
  }

  applyZoom(zoomLevel, clickPos) {
    this.zoom = zoomLevel;
    
    // Update Canvas component state
    if (this.canvasComponent) {
      this.canvasComponent.setState({ zoom: zoomLevel });
    }
    
    // Apply CSS transform for visual zoom to canvas
    this.canvas.style.transform = `scale(${zoomLevel})`;
    this.canvas.style.transformOrigin = 'top left';
    this.canvas.style.imageRendering = 'pixelated';
    
    // Also apply zoom to overlay (used for tool previews)
    const overlay = this.canvas.nextElementSibling;
    if (overlay && overlay.classList.contains('canvas-overlay')) {
      overlay.style.transform = `scale(${zoomLevel})`;
      overlay.style.transformOrigin = 'top left';
    }
    
    // Adjust container to accommodate zoomed size
    const container = this.canvas.parentElement;
    if (container) {
      container.style.overflow = 'auto';
      
      // Center on clicked point if provided
      if (clickPos) {
        requestAnimationFrame(() => {
          container.scrollLeft = clickPos.x * zoomLevel - container.clientWidth / 2;
          container.scrollTop = clickPos.y * zoomLevel - container.clientHeight / 2;
        });
      }
    }
  }

  reset() {
    this.applyZoom(1, null);
  }
}
