import React from "react";

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    
    this.Editfootnote = {
      Undo: "Undoes the last action",
      Redo: "Redoes the last undone action",
      Clear_Image: "Clears the entire canvas",
      Cut: "Cuts the selection and puts on clipboard",
      Copy: "Copies the selection to clipboard",
      Paste: "Pastes content from clipboard",
      Select_All: "Selects the entire canvas",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Editfootnote[id]) {
      this.props.setFooter(this.Editfootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter?.();
  };

  // ========== HANDLERS ==========

  handleUndo = () => {
    this.props.onUndo?.();
    this.props.closeMenu?.();
  };

  handleRedo = () => {
    this.props.onRedo?.();
    this.props.closeMenu?.();
  };

  handleClearImage = () => {
    this.props.onClearImage?.();
    this.props.closeMenu?.();
  };

  render() {
    return (
      <div className="dropdown" id="edit_toggle" style={{ width: "180px", left: "26px" }}>
        <table className="toggle-content" style={{ width: "180px" }}>
          <tbody>
            {/* UNDO */}
            <tr
              className="menu-row"
              id="Undo"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
              onClick={this.handleUndo}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Undo</td>
              <td className="menu-item-shortcut">Ctrl+Z</td>
            </tr>

            {/* REDO */}
            <tr
              className="menu-row"
              id="Redo"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
              onClick={this.handleRedo}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Redo</td>
              <td className="menu-item-shortcut">Ctrl+Y</td>
            </tr>

            <tr className="div-line">
              <td colSpan="3"><hr className="menuhr" /></td>
            </tr>

            {/* CUT - disabled for now */}
            <tr
              className="menu-row disabled"
              id="Cut"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label" style={{ color: "#888" }}>Cut</td>
              <td className="menu-item-shortcut">Ctrl+X</td>
            </tr>

            {/* COPY - disabled for now */}
            <tr
              className="menu-row disabled"
              id="Copy"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label" style={{ color: "#888" }}>Copy</td>
              <td className="menu-item-shortcut">Ctrl+C</td>
            </tr>

            {/* PASTE - disabled for now */}
            <tr
              className="menu-row disabled"
              id="Paste"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label" style={{ color: "#888" }}>Paste</td>
              <td className="menu-item-shortcut">Ctrl+V</td>
            </tr>

            <tr className="div-line">
              <td colSpan="3"><hr className="menuhr" /></td>
            </tr>

            {/* CLEAR IMAGE */}
            <tr
              className="menu-row"
              id="Clear_Image"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
              onClick={this.handleClearImage}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Clear Image</td>
              <td className="menu-item-shortcut"></td>
            </tr>

            {/* SELECT ALL - disabled for now */}
            <tr
              className="menu-row disabled"
              id="Select_All"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label" style={{ color: "#888" }}>Select All</td>
              <td className="menu-item-shortcut">Ctrl+A</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditMenu;
