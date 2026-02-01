import React from "react";

class LayerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.Layerfootnote = {
      Properties: "Shows properties",
      Visible: "Makes the layer visible",
      Lock_Layers: "Locks the layer",
      Open_Group: "Opens a group of layers",
      New_Layer: "Makes a new Layer",
      Delete_Layer: "Deletes a Layer",
      Convert_To: "Converts to a different image format",
      Duplicate: "Duplicates a layer",
      Merge_Down: "Merges the top layer with layer below",
      Flatten: "Flattens the image",
      Flatten_Layer: "Flattens the layers",
    };
  }
  handleEnter = (e) => {
    const id = e.currentTarget.id;

    if (this.Layerfootnote[id]) {
      this.props.setFooter(this.Layerfootnote[id]);
    } else {
      console.warn("No footnote found for:", id);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };
  render() {
    return (
      <div className="dropdown" id="layer_toggle">
        <table
          className="layers-toggle-content"
          style={{
            width: "192px",
            height: "200px",
            fontSize: "11px",
          }}
        >
          <tbody>
            <tr
              className="menu-row"
              id="Properties"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Properties..</td>
              <td className="menu-item-shortcut">F2</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Visible"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Visible</td>
              <td className="menu-item-shortcut">Shift+X</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Lock_Layers"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Lock Layers</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Open_Group"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Open Group</td>
              <td className="menu-item-shortcut">Shift+E</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr
              className="menu-row"
              id="New_Layer"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">New</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Delete_Layer"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Delete Layer</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Convert_To"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Convert To..</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr
              className="menu-row"
              id="Duplicate"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Duplicate</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Merge_Down"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Merge Down</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Flatten"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Flatten</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Flatten_Layer"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Flatten Layer</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default LayerMenu;
