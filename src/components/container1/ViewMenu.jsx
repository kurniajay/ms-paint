import React from "react";

class ViewMenu extends React.Component {
  constructor(props) {
    super(props);

    this.Viewfootnote = {
      Tool_Box: "Shows or hides the tool box",
      Color_Box: "Shows or hides the color box",
      Status_Bar: "Shows or hides the status bar",
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

  handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    this.props.closeMenu?.();
  };

  render() {
    const { showToolBox, showColorBox, showStatusBar } = this.props;

    return (
        <div className="dropdown" id="view_toggle" style={{ width: "180px" }}>
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
                <td className="menu-item-shortcut"></td>
              </tr>

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
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
                <td className="menu-item-shortcut"></td>
              </tr>

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
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
    );
  }
}

export default ViewMenu;
