export class EllipseTool {
  constructor(meta) {
    this.meta = meta;
  }
  begin(ctx) {
    ctx.renderer.beginStroke(ctx.pos, ctx.color, ctx.type);
  }

  update(ctx) {
    ctx.renderer.drawTo(ctx.pos);
  }

  end(ctx) {
    ctx.renderer.endStroke();
  }
}
export class EllipseRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.canvas.style.cursor = "crosshair";

    this.start = null;
    this.end = null;
    this.color = null;
    this.type = null;
  }

  beginStroke(pos, color, type) {
    this.start = pos;
    this.color = color;
    this.type = type;

    // snapshot
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
    this.bufferCtx.drawImage(this.canvas, 0, 0);
  }

  drawTo(pos) {
    if (!this.start) return;
    this.end = pos;

    const { x: x1, y: y1 } = this.start;
    const { x: x2, y: y2 } = this.end;

    const rx = Math.abs(x2 - x1) / 2;
    const ry = Math.abs(y2 - y1) / 2;
    const cx = x1 + (x2 - x1) / 2;
    const cy = y1 + (y2 - y1) / 2;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    this.drawEllipse(this.ctx, cx, cy, rx, ry);
  }

  endStroke() {
    if (!this.start || !this.end) return;

    const { x: x1, y: y1 } = this.start;
    const { x: x2, y: y2 } = this.end;

    const rx = Math.abs(x2 - x1) / 2;
    const ry = Math.abs(y2 - y1) / 2;
    const cx = x1 + (x2 - x1) / 2;
    const cy = y1 + (y2 - y1) / 2;

    this.drawEllipse(this.ctx, cx, cy, rx, ry);
  }
  drawEllipse(ctx, cx, cy, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);

    if (this.type === 1) {
      // Border only
      ctx.strokeStyle = this.color;
      ctx.stroke();
    } else if (this.type === 3) {
      // Filled only
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}
