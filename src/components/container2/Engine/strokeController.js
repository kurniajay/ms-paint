export default class StrokeController {
  constructor(tool, renderer, engine, getState) {
    this.tool = tool;
    this.renderer = renderer;
    this.engine = engine;
    this.getState = getState;

    this.isDrawing = false;
    this.prevPos = null;
  }

  buildCtx(pos) {
    const state = this.getState();

    return {
      pos,
      prevPos: this.prevPos ?? null,
      color: state.color,
      size: state.size,
      zoom: state.zoom,
      type: state.type,

      renderer: this.renderer,
      engine: this.engine,
      setColor: state.setColor,
    };
  }

  pointerDown(pos) {
    this.isDrawing = true;
    this.prevPos = pos;

    this.tool.begin?.(this.buildCtx(pos));
  }

  pointerMove(pos) {
    if (!this.isDrawing) return;

    this.tool.update?.(this.buildCtx(pos));
    this.prevPos = pos;
  }

  pointerUp(pos) {
    if (!this.isDrawing) return;

    this.tool.end?.(this.buildCtx(pos));
    this.isDrawing = false;
    this.prevPos = null;
  }
}
