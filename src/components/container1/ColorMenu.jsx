import React from "react";
import { SketchPicker } from "react-color";

class ColorMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditDialog: false,
      selectedColor: "#000000",
    };

    this.Colorfootnote = {
      Edit_Colors: "Creates a new color",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Colorfootnote[id]) {
      this.props.setFooter(this.Colorfootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter?.();
  };

  // ========== HANDLERS ==========

  handleEditColors = () => {
    this.setState({ showEditDialog: true });
  };

  closeDialog = () => {
    this.setState({ showEditDialog: false });
  };

  handleColorChange = (color) => {
    this.setState({ selectedColor: color.hex });
  };

  handleOk = () => {
    this.props.onColorSelect?.(this.state.selectedColor);
    this.setState({ showEditDialog: false });
    this.props.closeMenu?.();
  };

  handleCancel = () => {
    this.setState({ showEditDialog: false });
    this.props.closeMenu?.();
  };

  render() {
    const { showEditDialog, selectedColor } = this.state;

    return (
      <>
        <div className="dropdown" id="colors_toggle" style={{ width: "130px" }}>
          <table className="toggle-content" style={{ width: "130px" }}>
            <tbody>
              <tr
                className="menu-row"
                id="Edit_Colors"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleEditColors}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Edit Colors...</td>
                <td className="menu-item-shortcut"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* EDIT COLORS DIALOG */}
        {showEditDialog && (
          <div className="modal-overlay" onClick={this.handleCancel}>
            <div 
              className="win95-dialog" 
              onClick={(e) => e.stopPropagation()}
              style={{ width: "auto" }}
            >
              {/* Title Bar */}
              <div className="win95-titlebar">
                <span>Edit Colors</span>
                <button className="win95-close" onClick={this.handleCancel}>×</button>
              </div>

              {/* Dialog Content */}
              <div className="win95-content" style={{ padding: "15px" }}>
                <SketchPicker
                  color={selectedColor}
                  onChange={this.handleColorChange}
                  disableAlpha={true}
                />
              </div>

              {/* Dialog Buttons */}
              <div className="win95-buttons">
                <button className="win95-button" onClick={this.handleOk}>OK</button>
                <button className="win95-button" onClick={this.handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ColorMenu;