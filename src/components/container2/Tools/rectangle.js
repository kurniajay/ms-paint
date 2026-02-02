export class RectTool {
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
export class RectRenderer {
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
    this.end = pos;

    const x1 = this.start.x;
    const y1 = this.start.y;
    const x2 = this.end.x;
    const y2 = this.end.y;

    // normalize (MS Paint behavior)
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1);
    const h = Math.abs(y2 - y1);

    // restore snapshot
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    this.ctx.beginPath();

    if (this.type === 1) {
      // Border only
      this.ctx.strokeStyle = this.color;
      this.ctx.strokeRect(x, y, w, h);
    } else if (this.type === 3) {
      // Filled only
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, w, h);
    }

    this.ctx.closePath();
  }

  endStroke() {
    if (!this.start || !this.end) return;

    const x1 = this.start.x;
    const y1 = this.start.y;
    const x2 = this.end.x;
    const y2 = this.end.y;

    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1);
    const h = Math.abs(y2 - y1);

    this.ctx.beginPath();

    if (this.type === 1) {
      // Border only
      this.ctx.strokeStyle = this.color;
      this.ctx.strokeRect(x, y, w, h);
    } else if (this.type === 3) {
      // Filled only
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, w, h);
    }

    this.ctx.closePath();
  }
}
