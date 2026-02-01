export class BrushTool {
  constructor(meta) {
    this.meta = meta;
  }
  begin(ctx) {
    ctx.renderer.beginStroke(ctx.pos, ctx.color, ctx.size);
  }

  update(ctx) {
    ctx.renderer.drawTo(ctx.pos);
  }

  end(ctx) {
    ctx.renderer.endStroke();
  }
}
export class BrushRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.style.cursor = "crosshair";

    this.brushSize = 1;
    this.oldPos = null;
  }

  beginStroke(pos, color, size) {
    this.brushSize = size;
    this.oldPos = pos;
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;


    // Sizes 1-3: Round brushes (8px, 5px, 3px)
    // Sizes 4-6: Square brushes (8px, 5px, 3px)
    if (size >= 1 && size <= 3) {
      // Round brushes
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = size === 1 ? 8 : size === 2 ? 5 : 3;
    } else if (size >= 4 && size <= 6) {
      // Square brushes
      this.ctx.lineCap = "square";
      this.ctx.lineJoin = "miter";
      this.ctx.lineWidth = size === 4 ? 8 : size === 5 ? 5 : 3;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
    // Draw initial dot for single clicks
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  drawTo(pos) {
    if (!this.oldPos) return;

    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();

    this.oldPos = pos;
  }

  endStroke() {
    this.ctx.closePath();
    this.oldPos = null;
  }
}
