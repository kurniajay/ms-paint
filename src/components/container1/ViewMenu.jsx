import React from "react";

class ViewMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showZoomSubmenu: false,
      showBitmapView: false,
    };

    this.Viewfootnote = {
      Tool_Box: "Shows or hides the tool box",
      Color_Box: "Shows or hides the color box",
      Status_Bar: "Shows or hides the status bar",
      Zoom: "Changes the zoom level",
      View_Bitmap: "Displays the entire picture",
      FullScreen: "Makes the application full screen",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Viewfootnote[id]) {
      this.props.setFooter(this.Viewfootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter?.();
  };

  // ========== HANDLERS ==========

  handleToggleToolBox = () => {
    this.props.onToggleToolBox?.();
    this.props.closeMenu?.();
  };

  handleToggleColorBox = () => {
    this.props.onToggleColorBox?.();
    this.props.closeMenu?.();
  };

  handleToggleStatusBar = () => {
    this.props.onToggleStatusBar?.();
    this.props.closeMenu?.();
  };

  handleZoomHover = () => {
    this.setState({ showZoomSubmenu: true });
  };

  handleZoomLeave = () => {
    this.setState({ showZoomSubmenu: false });
  };

  handleZoom = (level) => {
    this.props.onZoom?.(level);
    this.setState({ showZoomSubmenu: false });
    this.props.closeMenu?.();
  };

  handleViewBitmap = () => {
    this.setState({ showBitmapView: true });
  };

  closeBitmapView = () => {
    this.setState({ showBitmapView: false });
    this.props.closeMenu?.();
  };

  handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    this.props.closeMenu?.();
  };

  render() {
    const { showZoomSubmenu, showBitmapView } = this.state;
    const { showToolBox, showColorBox, showStatusBar, zoomLevel } = this.props;

    return (
      <>
        <div className="dropdown" id="view_toggle" style={{ width: "180px", left: "60px" }}>
          <table className="toggle-content" style={{ width: "180px" }}>
            <tbody>
              {/* TOOL BOX */}
              <tr
                className="menu-row"
                id="Tool_Box"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleToggleToolBox}
              >
                <td className="tickspace">{showToolBox ? "✓" : ""}</td>
                <td className="menu-item-label">Tool Box</td>
                <td className="menu-item-shortcut">Ctrl+T</td>
              </tr>

              {/* COLOR BOX */}
              <tr
                className="menu-row"
                id="Color_Box"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleToggleColorBox}
              >
                <td className="tickspace">{showColorBox ? "✓" : ""}</td>
                <td className="menu-item-label">Color Box</td>
                <td className="menu-item-shortcut">Ctrl+L</td>
              </tr>

              {/* STATUS BAR */}
              <tr
                className="menu-row"
                id="Status_Bar"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleToggleStatusBar}
              >
                <td className="tickspace">{showStatusBar ? "✓" : ""}</td>
                <td className="menu-item-label">Status Bar</td>
                <td className="menu-item-shortcut"></td>
              </tr>

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
              </tr>

              {/* ZOOM */}
              <tr
                className="menu-row"
                id="Zoom"
                onMouseEnter={(e) => { this.handleEnter(e); this.handleZoomHover(); }}
                onMouseLeave={(e) => { this.handleLeave(); this.handleZoomLeave(); }}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Zoom</td>
                <td className="menu-item-shortcut">▶</td>
              </tr>

              {/* Zoom Submenu */}
              {showZoomSubmenu && (
                <tr>
                  <td colSpan="3">
                    <div className="zoom-submenu">
                      <div className="zoom-option" onClick={() => this.handleZoom(0.25)}>
                        {zoomLevel === 0.25 && "✓"} 25%
                      </div>
                      <div className="zoom-option" onClick={() => this.handleZoom(0.5)}>
                        {zoomLevel === 0.5 && "✓"} 50%
                      </div>
                      <div className="zoom-option" onClick={() => this.handleZoom(1)}>
                        {zoomLevel === 1 && "✓"} 100%
                      </div>
                      <div className="zoom-option" onClick={() => this.handleZoom(2)}>
                        {zoomLevel === 2 && "✓"} 200%
                      </div>
                      <div className="zoom-option" onClick={() => this.handleZoom(4)}>
                        {zoomLevel === 4 && "✓"} 400%
                      </div>
                    </div>
                  </td>
                </tr>
              )}

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
              </tr>

              {/* VIEW BITMAP */}
              <tr
                className="menu-row"
                id="View_Bitmap"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleViewBitmap}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">View Bitmap</td>
                <td className="menu-item-shortcut">Ctrl+F</td>
              </tr>

              {/* FULL SCREEN */}
              <tr
                className="menu-row"
                id="FullScreen"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleFullScreen}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Full Screen</td>
                <td className="menu-item-shortcut">F11</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* VIEW BITMAP MODAL */}
        {showBitmapView && (
          <div 
            className="bitmap-overlay" 
            onClick={this.closeBitmapView}
            title="Click anywhere to close"
          >
            <img 
              src={this.props.getImageData?.()} 
              alt="Canvas Preview"
              className="bitmap-preview"
            />
          </div>
        )}
      </>
    );
  }
}

export default ViewMenu;
