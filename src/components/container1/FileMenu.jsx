import React from "react";

class FileMenu extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showOpenModal: false,
      showDeleteModal: false,
      showExportModal: false,
      drawings: [],
    };

    this.Filefootnote = {
      New_file: "Creates a new document.",
      Open_file: "Opens a saved drawing from gallery",
      Save_file: "Saves the active document",
      Saveas_file: "Saves the active document with a new name",
      Export_file: "Download drawing as image file",
      Delete_file: "Delete a saved drawing",
      Exit: "Quits Paint.",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Filefootnote[id]) {
      this.props.setFooter(this.Filefootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter?.();
  };

  // ========== HANDLERS ==========

  handleNew = () => {
    this.props.onNew?.();
    this.props.closeMenu?.();
  };

  handleSave = () => {
    this.props.onSave?.();
    this.props.closeMenu?.();
  };

  handleSaveAs = () => {
    this.props.onSaveAs?.();
    this.props.closeMenu?.();
  };

  handleOpenClick = async () => {
    const drawings = await this.props.getDrawings?.();
    this.setState({ showOpenModal: true, drawings: drawings || [] });
  };

  handleOpenDrawing = (id) => {
    this.props.onOpen?.(id);
    this.setState({ showOpenModal: false });
    this.props.closeMenu?.();
  };

  handleDeleteClick = async () => {
    const drawings = await this.props.getDrawings?.();
    this.setState({ showDeleteModal: true, drawings: drawings || [] });
  };

  handleDeleteDrawing = (id) => {
    this.props.onDelete?.(id);
    this.setState({ showDeleteModal: false });
    this.props.closeMenu?.();
  };

  handleExportClick = () => {
    this.setState({ showExportModal: true });
  };

  handleExport = (format) => {
    this.props.onExport?.(format);
    this.setState({ showExportModal: false });
    this.props.closeMenu?.();
  };

  closeModals = () => {
    this.setState({ 
      showOpenModal: false, 
      showDeleteModal: false,
      showExportModal: false 
    });
  };

  render() {
    const { showOpenModal, showDeleteModal, showExportModal, drawings } = this.state;

    return (
      <>
        <div
          className="dropdown"
          id="file_toggle"
          style={{ width: "200px", left: "0" }}
        >
          <table className="toggle-content" style={{ width: "200px" }}>
            <tbody>
              {/* NEW */}
              <tr
                className="menu-row"
                id="New_file"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleNew}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">New</td>
                <td className="menu-item-shortcut">Ctrl+N</td>
              </tr>

              {/* OPEN */}
              <tr
                className="menu-row"
                id="Open_file"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleOpenClick}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Open</td>
                <td className="menu-item-shortcut">Ctrl+O</td>
              </tr>

              {/* SAVE */}
              <tr
                className="menu-row"
                id="Save_file"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleSave}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Save</td>
                <td className="menu-item-shortcut">Ctrl+S</td>
              </tr>

              {/* SAVE AS */}
              <tr
                className="menu-row"
                id="Saveas_file"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleSaveAs}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Save As</td>
                <td className="menu-item-shortcut"></td>
              </tr>

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
              </tr>

              {/* EXPORT */}
              <tr
                className="menu-row"
                id="Export_file"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleExportClick}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Export</td>
                <td className="menu-item-shortcut"></td>
              </tr>

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
              </tr>

              {/* DELETE */}
              <tr
                className="menu-row"
                id="Delete_file"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={this.handleDeleteClick}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Delete</td>
                <td className="menu-item-shortcut"></td>
              </tr>

              <tr className="div-line">
                <td colSpan="3"><hr className="menuhr" /></td>
              </tr>

              {/* EXIT */}
              <tr
                className="menu-row"
                id="Exit"
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onClick={() => window.close()}
              >
                <td className="tickspace"></td>
                <td className="menu-item-label">Exit</td>
                <td className="menu-item-shortcut"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* OPEN MODAL */}
        {showOpenModal && (
          <div className="modal-overlay" onClick={this.closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Open Drawing</h3>
              {drawings.length === 0 ? (
                <p>No saved drawings found.</p>
              ) : (
                <div className="drawing-list">
                  {drawings.map((d) => (
                    <div
                      key={d._id}
                      className="drawing-item"
                      onClick={() => this.handleOpenDrawing(d._id)}
                    >
                      <span className="drawing-title">{d.title}</span>
                      <span className="drawing-date">
                        {new Date(d.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={this.closeModals}>Cancel</button>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="modal-overlay" onClick={this.closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Delete Drawing</h3>
              {drawings.length === 0 ? (
                <p>No saved drawings found.</p>
              ) : (
                <div className="drawing-list">
                  {drawings.map((d) => (
                    <div
                      key={d._id}
                      className="drawing-item delete-item"
                      onClick={() => this.handleDeleteDrawing(d._id)}
                    >
                      <span className="drawing-title">{d.title}</span>
                      <span className="delete-icon">🗑️</span>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={this.closeModals}>Cancel</button>
            </div>
          </div>
        )}

        {/* EXPORT MODAL */}
        {showExportModal && (
          <div className="modal-overlay" onClick={this.closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Export As</h3>
              <div className="export-options">
                <button onClick={() => this.handleExport("png")}>PNG</button>
                <button onClick={() => this.handleExport("jpg")}>JPG</button>
              </div>
              <button onClick={this.closeModals}>Cancel</button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default FileMenu;
