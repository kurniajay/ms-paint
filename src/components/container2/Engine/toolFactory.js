import { PencilTool, PencilRenderer } from "../Tools/pencil.js";
import { EraserTool, EraserRenderer } from "../Tools/eraser.js";
import { BrushTool, BrushRenderer } from "../Tools/brush.js";
import { LineTool, LineRenderer } from "../Tools/line.js";
import { RectTool, RectRenderer } from "../Tools/rectangle.js";
import { RectEllipseTool, RectEllipseRenderer } from "../Tools/rectellipse.js";
import { EllipseTool, EllipseRenderer } from "../Tools/ellipse.js";
import { FloodFillTool, FloodFillRenderer } from "../Tools/floodfill.js";
import { TextTool, TextRenderer } from "../Tools/text.js";
import { MagnificationTool, MagnificationRenderer } from "../Tools/magnify.js";
import { InteractionType } from "./Interaction/ToolInteraction";

export const TOOLS = {
  PENCIL: {
    name: "Pencil",
    interaction: InteractionType.STROKE,
    options: {},
  },

  BRUSH: {
    name: "Brush",
    interaction: InteractionType.STROKE,
    options: {
      size: {
        type: "number",
        default: 1,
        min: 1,
        max: 6,
        step: 1,
      },
    },
  },

  CURVELINE: {
    name: "Curve Line",
    interaction: InteractionType.STROKE,
    options: {
      size: {
        type: "number",
        default: 3,
        min: 1,
        max: 5,
        step: 1,
      },
    },
  },

  AIRBRUSH: {
    name: "Airbrush",
    interaction: InteractionType.STROKE,
    options: {
      size: {
        type: "number",
        default: 2,
        min: 1,
        max: 3,
        step: 1,
      },
    },
  },

  ERASER: {
    name: "Eraser",
    interaction: InteractionType.STROKE,
    options: {
      size: {
        type: "number",
        default: 3,
        min: 3,
        max: 12,
        step: 3,
      },
    },
  },

  LINE: {
    name: "Line",
    interaction: InteractionType.STROKE,
    options: {
      size: {
        type: "number",
        default: 1,
        min: 1,
        max: 5,
        step: 1,
      },
    },
  },

  RECT: {
    name: "Rectangle",
    interaction: InteractionType.STROKE,
    options: {
      mode: {
        type: "enum",
        default: 1,
        values: [1, 2, 3], // border, filled-border, filled
      },
    },
  },

  RECTELLIPSE: {
    name: "Rounded Rectangle",
    interaction: InteractionType.STROKE,
    options: {
      mode: {
        type: "enum",
        default: 1,
        values: [1, 2, 3],
      },
    },
  },

  ELLIPSE: {
    name: "Ellipse",
    interaction: InteractionType.STROKE,
    options: {
      mode: {
        type: "enum",
        default: 1,
        values: [1, 2, 3],
      },
    },
  },

  MAGNIFY: {
    name: "Magnification",
    interaction: InteractionType.STROKE,
    options: {
      zoom: {
        type: "number",
        default: 1,
        values: [1, 2, 6, 8],
      },
    },
  },

  /* ---------- TOOLS WITH NO JSX OPTIONS ---------- */

  FLOOD: {
    name: "Flood Fill",
    interaction: InteractionType.STROKE,
    options: {},
  },

  TEXT: {
    name: "Text",
    interaction: InteractionType.MODAL,
    options: {},
  },

  CURVE: {
    name: "Curve",
    interaction: InteractionType.MODAL,
    options: {},
  },
};

export function createTool(toolKey, canvas) {
  const meta = TOOLS[toolKey];
  if (!meta) {
    throw new Error(`Unknown tool key: ${toolKey}`);
  }

  switch (toolKey) {
    case "PENCIL":
      return {
        tool: new PencilTool(meta),
        renderer: new PencilRenderer(canvas),
      };

    case "BRUSH":
      return {
        tool: new BrushTool(meta),
        renderer: new BrushRenderer(canvas),
      };

    case "ERASER":
      return {
        tool: new EraserTool(meta),
        renderer: new EraserRenderer(canvas),
      };

    case "MAGNIFY":
      return {
        tool: new MagnificationTool(meta),
        renderer: new MagnificationRenderer(canvas),
      };
    case "RECT":
      return {
        tool: new RectTool(meta),
        renderer: new RectRenderer(canvas),
      };
    case "LINE":
      return {
        tool: new LineTool(meta),
        renderer: new LineRenderer(canvas),
      };

    case "RECTELLIPSE":
      return {
        tool: new RectEllipseTool(meta),
        renderer: new RectEllipseRenderer(canvas),
      };
    case "TEXT":
      return {
        tool: new TextTool(meta),
        renderer: new TextRenderer(canvas),
      };
    case "ELLIPSE":
      return {
        tool: new EllipseTool(meta),
        renderer: new EllipseRenderer(canvas),
      };

    case "FLOOD":
      return {
        tool: new FloodFillTool(meta),
        renderer: new FloodFillRenderer(canvas),
      };

    default:
      throw new Error(`Tool not implemented: ${toolKey}`);
  }
}
