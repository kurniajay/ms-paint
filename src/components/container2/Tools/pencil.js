export class PencilTool {
  constructor(meta) {
    this.meta = meta;
  }
  begin(ctx) {
    ctx.renderer.beginStroke(ctx.pos, ctx.color);
  }

  update(ctx) {
    ctx.renderer.drawTo(ctx.pos);
  }

  end(ctx) {
    ctx.renderer.endStroke();
  }
}
export class PencilRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }

  beginStroke(pos, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    // Draw a dot at the initial click position
    this.ctx.fillStyle = color;
    this.ctx.fillRect(pos.x, pos.y, 1, 1);
  }

  drawTo(pos) {
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  endStroke() {
    this.ctx.closePath();
  }
}
