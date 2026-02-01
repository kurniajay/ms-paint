import React from 'react';
import {
  BrushOptions,
  EllipseOptions,
  EraserOptions,
  LineOptions,
  MagnificationOptions,
  RectShapeOptions,
} from './ToolOptions.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floating: false,
      dragging: false,
      startMouse: { x: 0, y: 0 },
      startPos: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      currTool: 'PENCIL',
      holdTimeout: null,
    };

    this.TOOL_OPTIONS = {
      BRUSH: BrushOptions,
      ELLIPSE: EllipseOptions,
      RECT: RectShapeOptions,
      ERASER: EraserOptions,
      LINE: LineOptions,
      MAGNIFY: MagnificationOptions,
    };

    this.TOOL_SELECTED_KEY = {
      PENCIL: 'size',
      BRUSH: 'size',
      ERASER: 'size',
      LINE: 'size',
      RECT: 'type',
      ELLIPSE: 'type',
      MAGNIFY: 'zoom',
    };

    this.TOOLS = [
      { id: 'eraser', tool: 'ERASER' },
      { id: 'floodfill', tool: 'FLOOD' },
      { id: 'magnification', tool: 'MAGNIFY' },
      { id: 'pencil', tool: 'PENCIL' },
      { id: 'brush', tool: 'BRUSH' },
      { id: 'line', tool: 'LINE' },
      { id: 'rectshape', tool: 'RECT' },
      { id: 'ellipse', tool: 'ELLIPSE' },
    ];

    this.Toolsfootnote = {
      eraser: 'Erases part of the drawing using the selected eraser size.',
      floodfill: 'Fills a closed area with the current drawing color.',
      magnification: 'Zooms in or out to change the canvas magnification.',
      pencil: 'Draws freehand lines one pixel wide.',
      brush: 'Draws freehand lines with the selected brush size.',
      line: 'Draws straight lines with the selected line width.',
      rectshape: 'Draws rectangles with border or filled style.',
      ellipse: 'Draws circles and ellipses with border or filled style.',
    };

    this.sidebarRef = React.createRef();
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Toolsfootnote[id]) {
      this.props.setFooter(this.Toolsfootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.setFooter('Select a tool from the toolbox');
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.stopDrag);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
    clearTimeout(this.state.holdTimeout);
  }

  startHoldToDetach = (e) => {
    clearTimeout(this.state.holdTimeout);
    if (e.target.closest('.toolbar')) return;

    const holdTimeout = setTimeout(() => {
      this.setState({ floating: true, dragging: true });
    }, 700);

    this.setState({
      holdTimeout,
      startMouse: { x: e.clientX, y: e.clientY },
      startPos: { ...this.state.position },
    });
  };

  onDrag = (e) => {
    if (!this.state.dragging) return;

    const dx = e.clientX - this.state.startMouse.x;
    const dy = e.clientY - this.state.startMouse.y;

    this.setState({
      position: {
        x: this.state.startPos.x + dx,
        y: this.state.startPos.y + dy,
      },
    });
  };

  stopDrag = () => {
    clearTimeout(this.state.holdTimeout);
    this.setState({ dragging: false, holdTimeout: null });
  };

  render() {
    const currTool = this.props.tool || 'PENCIL';
    const OptionPanel = this.TOOL_OPTIONS[currTool];
    const cfg = this.props.currConfig || {};
    const key = this.TOOL_SELECTED_KEY[currTool];
    const selected = key ? cfg[key] : undefined;

    // {
    //   this.TOOLS.map(({ id, tool }) => {
    //     console.log("BTN", { id, tool, currTool: this.state.currTool });
    //
    //     return (
    //       <button
    //         key={id}
    //         id={id}
    //         className={`tools ${this.props.tool === tool ? "pressed" : ""}`}
    //         onMouseEnter={this.handleEnter}
    //         onMouseLeave={this.handleLeave}
    //         onClick={() => this.props.setTool(tool)}
    //       />
    //     );
    //   });
    // }
    return (
      <div
        ref={this.sidebarRef}
        className={this.state.floating ? 'sidebar floating' : 'sidebar'}
        style={{
          position: this.state.floating ? 'absolute' : 'relative',
          left: this.state.floating ? this.state.position.x : 0,
          top: this.state.floating ? this.state.position.y : 0,
          cursor: this.state.floating
            ? this.state.dragging
              ? 'grabbing'
              : 'grab'
            : 'default',
        }}
        onMouseDown={this.startHoldToDetach}
      >
        <div className="toolbar">
          {this.TOOLS.map(({ id, tool }) => (
            <button
              key={id}
              id={id}
              className={`tools ${currTool === tool ? 'pressed' : ''}`}
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
              onClick={() => {
                this.props.setTool(tool);
              }}
            />
          ))}
        </div>

        <div className="optionWindow">
          {OptionPanel && (
            <OptionPanel
              selected={selected}
              onSelect={this.props.onToolConfigChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
