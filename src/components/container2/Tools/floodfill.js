export class FloodFillTool {
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
export class FloodFillRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    this.color = null;
    this.pos = null;
  }

  beginStroke(pos, color) {
    console.log("flood fill", pos);
    this.pos = pos;
    this.color = this.parseColor(color);

    this.floodFill(
      Math.floor(this.pos.x),
      Math.floor(this.pos.y),
      this.color,
      10, // tolerance
    );
  }

  parseColor(cssColor) {
    const ctx = this.ctx;
    ctx.fillStyle = cssColor;
    ctx.fillRect(0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    return [data[0], data[1], data[2], data[3]];
  }
  floodFill(x, y, fillColor, range = 1) {
    const ctx = this.ctx;
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );

    const width = imageData.width;
    const height = imageData.height;

    const visited = new Uint8Array(width * height);
    const stack = [[x, y]];

    const targetColor = this.getPixel(imageData, x, y);
    const rangeSq = range * range;

    while (stack.length > 0) {
      const [cx, cy] = stack.pop();

      if (
        cx >= 0 &&
        cx < width &&
        cy >= 0 &&
        cy < height &&
        !visited[cy * width + cx] &&
        this.colorsMatch(this.getPixel(imageData, cx, cy), targetColor, rangeSq)
      ) {
        this.setPixel(imageData, cx, cy, fillColor);
        visited[cy * width + cx] = 1;

        stack.push([cx + 1, cy]);
        stack.push([cx - 1, cy]);
        stack.push([cx, cy + 1]);
        stack.push([cx, cy - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  getPixel(imageData, x, y) {
    const offset = (y * imageData.width + x) * 4;
    return [
      imageData.data[offset],
      imageData.data[offset + 1],
      imageData.data[offset + 2],
      imageData.data[offset + 3],
    ];
  }

  setPixel(imageData, x, y, color) {
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset] = color[0];
    imageData.data[offset + 1] = color[1];
    imageData.data[offset + 2] = color[2];
    imageData.data[offset + 3] = color[3];
  }

  colorsMatch(a, b, rangeSq) {
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    const da = a[3] - b[3];
    return dr * dr + dg * dg + db * db + da * da < rangeSq;
  }
  drawTo() {}

  endStroke() {
    this.pos = null;
  }
}
