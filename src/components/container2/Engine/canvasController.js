import StrokeController from "./strokeController";
import ModalController from "./modalController";
import { InteractionType } from "./Interaction/ToolInteraction";

export default class CanvasController {
  constructor(engine, renderer, getState) {
    this.engine = engine;
    this.renderer = renderer;
    this.getState = getState;

    this.activeTool = null;
    this.activeController = null;
  }

  setTool(tool) {
    console.log(tool, "tools: ", tool.meta.interaction);
    if (!tool || !tool.meta.interaction) {
      throw new Error("Invalid tool instance passed to CanvasController");
    }

    this.activeController?.cancel?.();
    this.activeTool = tool;
    this.activeController = this.createController(tool);
  }

  setRenderer(renderer) {
    if (this.renderer === renderer) return;

    // cancel current interaction cleanly
    this.activeController?.cancel?.();

    this.renderer = renderer;

    // re-create controller with same tool
    if (this.activeTool) {
      this.activeController = this.createController(this.activeTool);
    }
  }

  createController(tool) {
    switch (tool.meta.interaction) {
      case InteractionType.STROKE:
        return new StrokeController(
          tool,
          this.renderer,
          this.engine,
          this.getState,
        );

      case InteractionType.MODAL:
        return new ModalController(
          tool,
          this.renderer,
          this.engine,
          this.getState,
        );

      default:
        throw new Error("Unknown tool interaction type");
    }
  }

  /* -------- event forwarding -------- */

  pointerDown(pos) {
    this.activeController?.pointerDown(pos);
  }

  pointerMove(pos) {
    this.activeController?.pointerMove(pos);
  }

  pointerUp(pos) {
    this.activeController?.pointerUp?.(pos);
  }

  keyDown(key) {
    this.activeController?.keyDown?.(key);
  }
}
