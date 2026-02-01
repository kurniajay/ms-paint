export class RectEllipseTool {
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
export class RectEllipseRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.radius = 10;
    this.canvas.style.cursor = "crosshair";

    this.start = null;
    this.end = null;
    this.color = "#000";
    this.type = 1; // 1=stroke, 2=fill+stroke, 3=fill
  }

  beginStroke(pos, color, type) {
    this.start = pos;
    this.color = color;
    this.type = type;
    console.log(this.color, "pos:", pos);
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
    if (!this.start) return;

    this.end = pos;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    const { x, y, width, height } = this.computeRect();
    this.drawRoundedRect(x, y, width, height);
  }

  endStroke() {
    this.start = null;
    this.end = null;
  }

  computeRect() {
    const dx = this.end.x - this.start.x;
    const dy = this.end.y - this.start.y;

    return {
      width: Math.abs(dx),
      height: Math.abs(dy),
      x: dx > 0 ? this.start.x : this.start.x + dx,
      y: dy > 0 ? this.start.y : this.start.y + dy,
    };
  }

  drawRoundedRect(x, y, width, height) {
    const r = Math.min(this.radius, Math.min(width / 2, height / 2));

    this.ctx.beginPath();
    this.ctx.moveTo(x + r, y);
    this.ctx.lineTo(x + width - r, y);
    this.ctx.arcTo(x + width, y, x + width, y + r, r);
    this.ctx.lineTo(x + width, y + height - r);
    this.ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
    this.ctx.lineTo(x + r, y + height);
    this.ctx.arcTo(x, y + height, x, y + height - r, r);
    this.ctx.lineTo(x, y + r);
    this.ctx.arcTo(x, y, x + r, y, r);
    this.ctx.closePath();

    if (this.type === 1) {
      // Border only
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
    } else if (this.type === 2) {
      // Border + filled
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
    } else if (this.type === 3) {
      // Filled only
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }
}
