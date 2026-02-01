import React from "react";

// Classic MS Paint 28 basic colors (matching the palette)
const BASIC_COLORS = [
  // Row 1
  "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080",
  "#808040", "#004040", "#0080FF", "#004080", "#8000FF", "#804000",
  // Row 2
  "#FFFFFF", "#C0C0C0", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF",
  "#FFFF80", "#00FF80", "#80FFFF", "#8080FF", "#FF0080", "#FF8040",
];

// 16 custom color slots (start empty/white)
const DEFAULT_CUSTOM_COLORS = Array(16).fill("#FFFFFF");

class ColorMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditDialog: false,
      customColors: [...DEFAULT_CUSTOM_COLORS],
      selectedColor: "#000000",
      selectedCustomSlot: 0,
      showCustomPicker: false,
      // RGB values for custom color
      red: 0,
      green: 0,
      blue: 0,
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
    this.setState({ showEditDialog: false, showCustomPicker: false });
  };

  selectBasicColor = (color) => {
    const rgb = this.hexToRgb(color);
    this.setState({ 
      selectedColor: color,
      red: rgb.r,
      green: rgb.g,
      blue: rgb.b,
    });
  };

  selectCustomSlot = (index) => {
    const color = this.state.customColors[index];
    const rgb = this.hexToRgb(color);
    this.setState({ 
      selectedCustomSlot: index,
      selectedColor: color,
      red: rgb.r,
      green: rgb.g,
      blue: rgb.b,
    });
  };

  toggleCustomPicker = () => {
    this.setState((prev) => ({ showCustomPicker: !prev.showCustomPicker }));
  };

  handleRgbChange = (channel, value) => {
    const val = Math.max(0, Math.min(255, parseInt(value) || 0));
    this.setState({ [channel]: val }, () => {
      const hex = this.rgbToHex(this.state.red, this.state.green, this.state.blue);
      this.setState({ selectedColor: hex });
    });
  };

  addToCustomColors = () => {
    const { customColors, selectedCustomSlot, selectedColor } = this.state;
    const newCustom = [...customColors];
    newCustom[selectedCustomSlot] = selectedColor;
    this.setState({ customColors: newCustom });
  };

  handleOk = () => {
    this.props.onColorSelect?.(this.state.selectedColor);
    this.setState({ showEditDialog: false, showCustomPicker: false });
    this.props.closeMenu?.();
  };

  handleCancel = () => {
    this.setState({ showEditDialog: false, showCustomPicker: false });
    this.props.closeMenu?.();
  };

  // ========== HELPERS ==========

  hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  };

  rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
  };

  render() {
    const { 
      showEditDialog, customColors, selectedColor, selectedCustomSlot,
      showCustomPicker, red, green, blue 
    } = this.state;

    return (
      <>
        <div className="dropdown" id="colors_toggle" style={{ width: "130px", left: "180px" }}>
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

        {/* EDIT COLORS DIALOG - Classic Windows 95 Style */}
        {showEditDialog && (
          <div className="modal-overlay" onClick={this.handleCancel}>
            <div 
              className="win95-dialog" 
              onClick={(e) => e.stopPropagation()}
              style={{ width: showCustomPicker ? "450px" : "240px" }}
            >
              {/* Title Bar */}
              <div className="win95-titlebar">
                <span>Edit Colors</span>
                <button className="win95-close" onClick={this.handleCancel}>×</button>
              </div>

              {/* Dialog Content */}
              <div className="win95-content">
                <div className="color-dialog-main">
                  {/* Basic Colors Section */}
                  <div className="color-section">
                    <div className="color-label">Basic colors:</div>
                    <div className="color-grid basic-grid">
                      {BASIC_COLORS.map((color, i) => (
                        <div
                          key={i}
                          className={`color-cell ${selectedColor === color ? "selected" : ""}`}
                          style={{ backgroundColor: color }}
                          onClick={() => this.selectBasicColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors Section */}
                  <div className="color-section">
                    <div className="color-label">Custom colors:</div>
                    <div className="color-grid custom-grid">
                      {customColors.map((color, i) => (
                        <div
                          key={i}
                          className={`color-cell ${selectedCustomSlot === i ? "selected" : ""}`}
                          style={{ backgroundColor: color }}
                          onClick={() => this.selectCustomSlot(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <button 
                    className="win95-button define-btn"
                    onClick={this.toggleCustomPicker}
                  >
                    {showCustomPicker ? "Hide Custom ◀" : "Define Custom Colors ▶"}
                  </button>
                </div>

                {/* Custom Color Picker (expanded) */}
                {showCustomPicker && (
                  <div className="custom-picker-section">
                    <div className="color-preview-box">
                      <div className="color-label">Color|Solid</div>
                      <div 
                        className="color-preview-large"
                        style={{ backgroundColor: selectedColor }}
                      />
                    </div>

                    <div className="rgb-inputs">
                      <div className="rgb-row">
                        <label>Red:</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="255"
                          value={red}
                          onChange={(e) => this.handleRgbChange("red", e.target.value)}
                        />
                      </div>
                      <div className="rgb-row">
                        <label>Green:</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="255"
                          value={green}
                          onChange={(e) => this.handleRgbChange("green", e.target.value)}
                        />
                      </div>
                      <div className="rgb-row">
                        <label>Blue:</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="255"
                          value={blue}
                          onChange={(e) => this.handleRgbChange("blue", e.target.value)}
                        />
                      </div>
                    </div>

                    <button 
                      className="win95-button"
                      onClick={this.addToCustomColors}
                    >
                      Add to Custom Colors
                    </button>
                  </div>
                )}
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
