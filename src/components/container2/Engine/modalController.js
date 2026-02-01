import { InteractionType } from "./Interaction/ToolInteraction";

export default class ModalController {
  constructor(tool, renderer, engine, getState) {
    if (tool.meta.interaction != InteractionType.MODAL) {
      console.log("interaction:", InteractionType.MODAL, "tool:", tool);
      throw new Error(
        "ModalController received non-modal tool Interaction type",
      );
    }

    this.tool = tool;
    this.renderer = renderer;
    this.engine = engine;
    this.getState = getState;

    this.phase = 0;
    this.active = false;
    this.lastPos = null;
  }

  buildCtx(pos) {
    const state = this.getState();

    return {
      pos,
      phase: this.phase,
      color: state.color,
      size: state.size,
      type: state.type,

      renderer: this.renderer,
      engine: this.engine,

      advancePhase: () => this.advancePhase(),
      commit: () => this.commit(),
      cancel: () => this.cancel(),
    };
  }

  /* ---------------- lifecycle ---------------- */

  pointerDown(pos) {
    this.lastPos = pos;

    console.log("[MC] pointerDown", {
      active: this.active,
      phase: this.phase,
      pos,
    });

    if (!this.active) {
      console.log("[MC] BEGIN interaction");
      this.active = true;
      this.phase = 0;
    }

    this.tool.begin?.(this.buildCtx(pos));
  }

  pointerMove(pos) {
    if (!this.active) return;

    this.lastPos = pos;
    this.tool.update?.(this.buildCtx(pos));
  }

  pointerUp(pos) {
    if (!this.active) return;

    this.lastPos = pos;
    this.tool.end?.(this.buildCtx(pos));
  }
  keyDown(key) {
    if (!this.active) return;

    if (key === "Escape") {
      this.cancel();
    }

    if (key === "Enter") {
      this.commit();
    }
  }

  /* ---------------- phase control ---------------- */

  advancePhase(pos = this.lastPos) {
    if (!this.active) return; // 🔒 guard

    this.phase++;

    const result = this.tool.onPhaseAdvance?.(this.buildCtx(pos));

    if (result === "commit") {
      this.commit();
    }
  }

  /* ---------------- termination ---------------- */

  commit() {
    console.log("[MC] COMMIT", {
      active: this.active,
      phase: this.phase,
    });

    if (!this.active) return;
    this.tool.commit?.(this.buildCtx(this.lastPos));
    this.reset();
  }
  cancel() {
    if (!this.active) return;

    this.tool.cancel?.(this.buildCtx(this.lastPos));
    this.reset();
  }

  reset() {
    console.log("[MC] RESET");
    this.active = false;
    this.phase = 0;
    this.lastPos = null;
    this.renderer.clearPreview?.();
  }
}
