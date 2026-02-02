import React from "react";
import DropdownContainer from "./DropdownContainer";
import FileMenu from "./FileMenu";
import EditMenu from "./EditMenu";
import ViewMenu from "./ViewMenu";
import ColorMenu from "./ColorMenu";

class Menubar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: null,
    };

    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (this.menuRef.current && !this.menuRef.current.contains(e.target)) {
      this.setState({ activeMenu: null });
    }
  };

  setActiveMenu = (menu) => {
    this.setState((prev) => ({
      activeMenu: prev.activeMenu === menu ? null : menu,
    }));
  };

  closeMenu = () => {
    this.setState({ activeMenu: null });
  };

  renderMenu = () => {
    const { activeMenu } = this.state;

    switch (activeMenu) {
      case "file":
        return (
          <FileMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
            onNew={this.props.onNew}
            onSave={this.props.onSave}
            onSaveAs={this.props.onSaveAs}
            onOpen={this.props.onOpen}
            onExport={this.props.onExport}
            onDelete={this.props.onDelete}
            getDrawings={this.props.getDrawings}
            closeMenu={this.closeMenu}
          />
        );
      case "edit":
        return (
          <EditMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
            onUndo={this.props.onUndo}
            onRedo={this.props.onRedo}
            onClearImage={this.props.onClearImage}
            closeMenu={this.closeMenu}
          />
        );
      case "view":
        return (
          <ViewMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
            onToggleToolBox={this.props.onToggleToolBox}
            onToggleColorBox={this.props.onToggleColorBox}
            onToggleStatusBar={this.props.onToggleStatusBar}
            showToolBox={this.props.showToolBox}
            showColorBox={this.props.showColorBox}
            showStatusBar={this.props.showStatusBar}
            closeMenu={this.closeMenu}
          />
        );
      case "colors":
        return (
          <ColorMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
            onColorSelect={this.props.onColorSelect}
            closeMenu={this.closeMenu}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="container-1">
        <div ref={this.menuRef}>
          <div className="menubar">
            <button onClick={() => this.setActiveMenu("file")}>File</button>
            <button onClick={() => this.setActiveMenu("edit")}>Edit</button>
            <button onClick={() => this.setActiveMenu("view")}>View</button>
            <button onClick={() => this.setActiveMenu("colors")}>Colors</button>
          </div>

          <DropdownContainer>{this.renderMenu()}</DropdownContainer>
        </div>
      </div>
    );
  }
}

export default Menubar;
