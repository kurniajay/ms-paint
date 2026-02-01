import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.footnoteRef = React.createRef();
    this.coordRef = React.createRef();
    this.dimRef = React.createRef();
  }

  updateMessage = (msg) => {
    if (!this.footnoteRef.current) return;
    this.footnoteRef.current.textContent = msg ?? "";
  };

  updateCoord = (pos) => {
    // console.log("[Footer] updateCoord called with:", pos);
    if (!this.coordRef.current) return;
    if (!pos || pos.x == null || pos.y == null) {
      this.coordRef.current.textContent = "";
      return;
    }

    const x = pos.x | 0;
    const y = pos.y | 0;

    this.coordRef.current.textContent = `${x}, ${y}`;
  };

  updateDim = (dim) => {
    // console.log("[Footer] updateDim called with:", dim);
    if (!this.dimRef.current) return;

    const w = dim?.width ?? dim?.WIDTH;
    const h = dim?.height ?? dim?.HEIGHT;
    if (w == null || h == null) return;

    const iw = w | 0;
    const ih = h | 0;

    this.dimRef.current.textContent = `${iw}, ${ih}`;
  };

  clearCoord = () => {
    if (!this.coordRef.current) return;
    this.coordRef.current.textContent = "";
  };

  componentDidMount() {
    // console.log("[Footer] mounted", this);
  }

  render() {
    return (
      <div className="container-4">
        <div className="footer-note" id="foot-note" ref={this.footnoteRef} />
        <div
          className="coordinates"
          id="coordinate_value"
          ref={this.coordRef}
        />
        <div className="extra" id="dimensions" ref={this.dimRef} />
      </div>
    );
  }
}

export default Footer;
