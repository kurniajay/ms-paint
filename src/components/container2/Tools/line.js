export class LineTool {
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
export class LineRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.start = null;
    this.end = null;
    this.color = "#000";
    this.size = 1;
  }

  beginStroke(pos, color, size) {
    this.start = pos;
    this.end = pos;
    this.color = color;
    this.size = size;

    // keep buffer in sync
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;

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

    // restore base
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    // draw preview
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.size;
    this.ctx.lineCap = "round";

    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.lineTo(this.end.x, this.end.y);
    this.ctx.stroke();
  }

  endStroke() {
    // final draw already exists (last preview)
    this.start = null;
    this.end = null;
  }
}
