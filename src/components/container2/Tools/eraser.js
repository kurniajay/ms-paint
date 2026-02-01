export class EraserTool {
  constructor(meta) {
    this.meta = meta;
  }
  begin(ctx) {
    ctx.renderer.beginStroke(ctx.pos, ctx.size || 4);
  }

  update(ctx) {
    ctx.renderer.drawTo(ctx.pos);
  }

  end(ctx) {
    ctx.renderer.endStroke();
  }
}
export class EraserRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.lastPos = null;
    this.size = 1;
  }

  beginStroke(pos, size) {
    this.size = size;
    this.lastPos = pos;

    this.ctx.save();
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.lineWidth = size;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  drawTo(pos) {
    if (!this.lastPos) return;

    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();

    this.lastPos = pos;
  }

  endStroke() {
    this.ctx.closePath();
    this.ctx.restore();

    this.lastPos = null;
  }
}
