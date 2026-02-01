import React from "react";

class Pallete extends React.Component {
  COLORS = [
    { id: "black", rgb: "rgb(0,0,0)" },
    { id: "grey", rgb: "rgb(128,128,128)" },
    { id: "maroon", rgb: "rgb(128,0,0)" },
    { id: "dirty-yellow", rgb: "rgb(185,155,20)" },
    { id: "green", rgb: "rgb(0,128,0)" },
    { id: "teal", rgb: "rgb(0,128,128)" },
    { id: "navy", rgb: "rgb(0,0,128)" },
    { id: "purple", rgb: "rgb(128,0,128)" },
    { id: "brownish", rgb: "rgb(199,151,61)" },
    { id: "darkteal", rgb: "rgb(0,63,63)" },
    { id: "lightseagreen", rgb: "rgb(32,178,170)" },
    { id: "royalblue", rgb: "rgb(0,65,129)" },
    { id: "deepblue", rgb: "rgb(64,0,255)" },
    { id: "brown", rgb: "rgb(128,65,1)" },
    { id: "white", rgb: "rgb(255,255,255)" },
    { id: "lightgray", rgb: "rgb(211,211,211)" },
    { id: "red", rgb: "rgb(255,0,0)" },
    { id: "yellow", rgb: "rgb(255,255,0)" },
    { id: "lightgreen", rgb: "rgb(144,238,144)" },
    { id: "lightblue", rgb: "rgb(173,216,230)" },
    { id: "blue", rgb: "rgb(0,0,255)" },
    { id: "pink", rgb: "rgb(255,192,203)" },
    { id: "beige", rgb: "rgb(245,245,220)" },
    { id: "seagreen", rgb: "rgb(1,255,129)" },
    { id: "cyan", rgb: "rgb(0,255,255)" },
    { id: "lavender", rgb: "rgb(128,128,255)" },
    { id: "darkpink", rgb: "rgb(255,0,128)" },
    { id: "mudorange", rgb: "rgb(255,129,65)" },
  ];

  state = {
    primary: "rgb(0,0,0)",
    secondary: "rgb(255,255,255)",
  };

  setPrimary = (color) => {
    this.setState({ primary: color });
    this.props.setColor(color); // 🔥 App owns canvas color
  };

  swapColors = () => {
    this.setState(
      ({ primary, secondary }) => ({
        primary: secondary,
        secondary: primary,
      }),
      () => this.props.setColor(this.state.primary),
    );
  };

  render() {
    const { primary, secondary } = this.state;

    return (
      <div className="container-3">
        <div className="pallete-preview">
          <div
            className="selectedcolor"
            style={{ backgroundColor: primary }}
            onClick={this.swapColors}
          />
          <div
            className="switchcolor"
            style={{ backgroundColor: secondary }}
            onClick={this.swapColors}
          />
        </div>

        <div className="pallete-layout">
          {this.COLORS.map((c) => (
            <button
              key={c.id}
              className="pallete-color"
              style={{ backgroundColor: c.rgb }}
              onClick={() => this.setPrimary(c.rgb)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Pallete;
