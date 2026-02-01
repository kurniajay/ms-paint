
import React from "react";
export function AirBrushOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3];

  return (
    <div className="AirBrushOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`AirB${s}px`}
          className={`airOptions ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
export function BrushOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5, 6];

  return (
    <div className="BrushOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`BrushOption${s}`}
          className={`brushOption ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
export function CurveLineOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5];

  return (
    <div className="CurvedLineOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`Line${s}px`}
          className={`Loptions ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
export function EllipseOptions({ onSelect, selected }) {
  const modes = [
    { id: "ellipseborder", mode: 1 },
    { id: "filledellipse", mode: 3 },
  ];

  return (
    <div className="ellipsetool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`ellipseOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ type: m.mode })}
        />
      ))}
    </div>
  );
}
export function EraserOptions({ onSelect, selected }) {
  const sizes = [
    { id: "Eraser1px", size: 3 },
    { id: "Eraser2px", size: 6 },
    { id: "Eraser3px", size: 9 },
    { id: "Eraser4px", size: 12 },
  ];

  return (
    <div className="EraserOptions">
      {sizes.map((s) => (
        <button
          key={s.size}
          id={s.id}
          value={s.size}
          className={`eOption ${selected === s.size ? "pressed" : ""}`}
          onClick={() => onSelect({ size: s.size })}
        />
      ))}
    </div>
  );
}

export function LineOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5];

  return (
    <div className="LineOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`Line${s}px`}
          value={s}
          className={`Loptions ${selected === s ? "pressed" : ""}`}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}

export function MagnificationOptions({ onSelect, selected }) {
  const zoomLevels = [1, 2, 6, 8];

  return (
    <div className="MagnificationOptions">
      {zoomLevels.map((z) => (
        <button
          key={z}
          id={`Mag${z}x`}
          value={z}
          className={`magOption ${selected === z ? "pressed" : ""}`}
          onClick={() => onSelect({ zoom: z })}
        />
      ))}
    </div>
  );
}

export function PolygonOptions({ onSelect, selected }) {
  const modes = [
    { id: "polygonborder", mode: 1 },
    { id: "filledpolygonborder", mode: 2 },
    { id: "filledpolygon", mode: 3 },
  ];

  return (
    <div className="polygontool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`polygonOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ fillMode: m.mode })}
        />
      ))}
    </div>
  );
}

export function RectElipseOptions({ onSelect, selected }) {
  const modes = [
    { id: "roundedrect-border", mode: 1 },
    { id: "filled-roundedrect", mode: 3 },
  ];

  return (
    <div className="roundedrect-tool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`rectOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ type: m.mode })}
        />
      ))}
    </div>
  );
}
export function RectShapeOptions({ selected, onSelect }) {
  const modes = [
    { id: "rectborder", mode: 1 },
    { id: "filledrect", mode: 3 },
  ];

  return (
    <div className="rectTool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`rectOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ type: m.mode })}
        />
      ))}
    </div>
  );
}

export function TextOptions({ onSelect, selected }) {
  const sizes = [
    { label: "Small", size: 12 },
    { label: "Medium", size: 16 },
    { label: "Large", size: 24 },
  ];

  return (
    <div className="TextOptions">
      {sizes.map((s) => (
        <button
          key={s.size}
          className={`textSizeOption ${selected === s.size ? "pressed" : ""}`}
          onClick={() => onSelect({ size: s.size })}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
