import React from "react";

class ImageMenu extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showFlipRotateModal: false,
      showAttributesModal: false,
      newWidth: 800,
      newHeight: 500,
    };

    this.Imagefootnote = {
      Flip_Rotate: "Flips or Rotates the image",
      Invert_Color: "Inverts the colors of the image",
      Attributes: "Changes the canvas size",
      Clear_Image: "Clears the entire canvas",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Imagefootnote[id]) {
      this.props.setFooter(this.Imagefootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter?.();
  };

  // ========== HANDLERS ==========

  handleFlipRotateClick = () => {
    this.setState({ showFlipRotateModal: true });
  };

  handleFlipHorizontal = () => {
    this.props.onFlipHorizontal?.();
    this.setState({ showFlipRotateModal: false });
    this.props.closeMenu?.();
  };

  handleFlipVertical = () => {
    this.props.onFlipVertical?.();
    this.setState({ showFlipRotateModal: false });
    this.props.closeMenu?.();
  };

  handleRotate = (degrees) => {
    this.props.onRotate?.(degrees);
    this.setState({ showFlipRotateModal: false });
    this.props.closeMenu?.();
  };

  handleInvertColors = () => {
    this.props.onInvertColors?.();
    this.props.closeMenu?.();
  };

  handleClearImage = () => {
    this.props.onClearImage?.();
    this.props.closeMenu?.();
  };

  handleAttributesClick = () => {
    // Get current dimensions from props or use defaults
    this.setState({ 
      showAttributesModal: true,
      newWidth: this.props.canvasWidth || 800,
      newHeight: this.props.canvasHeight || 500,
    });
  };

  handleAttributesSubmit = () => {
    const { newWidth, newHeight } = this.state;
    this.props.onResize?.(parseInt(newWidth), parseInt(newHeight));
    this.setState({ showAttributesModal: false });
    this.props.closeMenu?.();
  };

  closeModals = () => {
    this.setState({ 
      showFlipRotateModal: false,
      showAttributesModal: false,
    });
  };

  render() {
    const { showFlipRotateModal, showAttributesModal, newWidth, newHeight } = this.state;

    return (
      <>
        <div className="dropdown" id="image_toggle" style={{ width: "180px" }}>
          <table className="toggle-content" style={{ width: "180px" }}>
            <tbody>
              {/* FLIP/ROTATE */}
              <tr
                className="menu-row"
                id="Flip_Rotate"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleFlipRotateClick}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Flip/Rotate</td>
                <td className="menu-item-shortcut"></td>
              </tr>

              {/* INVERT COLORS */}
              <tr
                className="menu-row"
                id="Invert_Color"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleInvertColors}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Invert Colors</td>
                <td className="menu-item-shortcut"></td>
              </tr>

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
              </tr>

              {/* ATTRIBUTES */}
              <tr
                className="menu-row"
                id="Attributes"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleAttributesClick}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Attributes...</td>
                <td className="menu-item-shortcut"></td>
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
            </tbody>
          </table>
        </div>

        {/* FLIP/ROTATE MODAL */}
        {showFlipRotateModal && (
          <div className="modal-overlay" onClick={this.closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Flip and Rotate</h3>
              
              <div className="flip-rotate-options">
                <div className="option-group">
                  <h4>Flip</h4>
                  <button onClick={this.handleFlipHorizontal}>↔ Flip Horizontal</button>
                  <button onClick={this.handleFlipVertical}>↕ Flip Vertical</button>
                </div>
                
                <div className="option-group">
                  <h4>Rotate</h4>
                  <button onClick={() => this.handleRotate(90)}>↻ Rotate 90°</button>
                  <button onClick={() => this.handleRotate(180)}>↻ Rotate 180°</button>
                  <button onClick={() => this.handleRotate(270)}>↺ Rotate 270°</button>
                </div>
              </div>
              
              <button onClick={this.closeModals}>Cancel</button>
            </div>
          </div>
        )}

        {/* ATTRIBUTES MODAL */}
        {showAttributesModal && (
          <div className="modal-overlay" onClick={this.closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Attributes</h3>
              
              <div className="attributes-form">
                <div className="form-row">
                  <label>Width:</label>
                  <input 
                    type="number" 
                    value={newWidth}
                    onChange={(e) => this.setState({ newWidth: e.target.value })}
                    min="1"
                    max="4000"
                  />
                  <span>pixels</span>
                </div>
                
                <div className="form-row">
                  <label>Height:</label>
                  <input 
                    type="number" 
                    value={newHeight}
                    onChange={(e) => this.setState({ newHeight: e.target.value })}
                    min="1"
                    max="4000"
                  />
                  <span>pixels</span>
                </div>
              </div>
              
              <div className="modal-buttons">
                <button onClick={this.handleAttributesSubmit}>OK</button>
                <button onClick={this.closeModals}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ImageMenu;
