// @format
import React from "react";
import PropTypes from "prop-types";

import Arc from "./Arc";

const viewBox = {
  height: 150,
  width: 250
};

const angleRange = 270;
const angleOffset = 180;

class Knob extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drag: false,
      angle: props.defaultPercentage * angleRange,
      text: {
        x: 0,
        y: 0
      },
      svgRatio: 1,
      nameWidth: 20,
      lastVal: null
    };

    this.handleDown = this.handleDown.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.calcAngle = this.calcAngle.bind(this);
    this.calcSvgRatio = this.calcSvgRatio.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  handleDown({ pageY }) {
    this.setState({
      drag: true
    });
  }

  handleUp() {
    this.setState({ drag: false, prevPageY: null });
  }

  handleMove({ pageY }) {
    if (!this.state.drag) return;

    const { transform, onChange, mouseSpeed } = this.props;
    let { angle, prevPageY } = this.state;
    if (!prevPageY) {
      this.setState({ prevPageY: pageY });
      return;
    }
    const delta = (prevPageY - pageY) * mouseSpeed;

    angle = this.calcAngle(angle, delta, angleRange);
    onChange(transform(angle / angleRange));
    this.setState({ angle, prevPageY: pageY });
  }

  calcAngle(angle, delta, angleRange) {
    angle += delta;
    if (angle > angleRange) {
      angle -= angle - angleRange;
    } else if (angle < 0) {
      angle += Math.abs(angle);
    }
    return angle;
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
    window.addEventListener("mousemove", this.handleMove);
    window.addEventListener("mouseup", this.handleUp);
    // NOTE: We call this initially, to set the width and height values.
    this.onWindowResize();
  }

  calcSvgRatio() {
    const { width } = this.refs.box.getBoundingClientRect();

    // NOTE: As the svg preserves it's aspect ratio, we have to calculate only
    // one value that accounts for both width and height ratios.
    return new Promise(resolve => {
      this.setState({ svgRatio: width / viewBox.width }, resolve);
    });
  }

  async onWindowResize() {
    await this.calcSvgRatio();
    this.fitText();
  }

  fitText() {
    const { svgRatio } = this.state;
    const rect = this.refs.name.getBoundingClientRect();
    this.setState({ nameWidth: rect.width / svgRatio });
  }

  render() {
    const { bg, fg, transform, step, unit, name, style } = this.props;
    const { svgRatio, angle, nameWidth } = this.state;
    const percentage = angle / angleRange;
    const { width, height } = viewBox;
    const outerCircle = {
      arcWidth: 10,
      radius: 40
    };
    const font = {
      marginBottom: 5,
      size: (style && style.fontSize) || 40,
      family: (style && style.fontFamily) || "Arial"
    };

    return (
      <svg
        ref="box"
        onMouseDown={this.handleDown}
        style={style}
        viewBox={`0 0 ${width} ${height}`}
      >
        <text
          ref="name"
          style={{
            fill: style && style.color,
            fontFamily: font.family,
            pointerEvents: "none",
            cursor: "pointer",
            userSelect: "none"
          }}
          x="0"
          y={font.size}
          fontSize={font.size}
        >
          {name}
        </text>
        <circle
          fill={bg}
          r={25}
          cx={outerCircle.arcWidth + outerCircle.radius}
          cy={50 + font.size + font.marginBottom}
        />
        <Arc
          percentage={percentage}
          angleOffset={angleOffset}
          angleRange={angleRange}
          arcWidth={outerCircle.arcWidth}
          radius={outerCircle.radius}
          center={50}
          background={bg}
          color={fg}
          style={{
            transform: `translateY(${font.size + font.marginBottom}px)`
          }}
        />
        <text
          ref="value"
          style={{
            fill: style && style.color,
            fontFamily: (style && style.fontFamily) || "Arial",
            pointerEvents: "none",
            cursor: "pointer",
            userSelect: "none"
          }}
          x={80}
          y={outerCircle.arcWidth + 2 * outerCircle.radius + font.size}
          fontSize={font.size}
        >
          {`${transform(percentage)} ${unit}`}
        </text>
      </svg>
    );
  }
}

Knob.propTypes = {
  defaultPercentage: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  transform: PropTypes.func,
  mouseSpeed: PropTypes.number,
  unit: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  bg: PropTypes.string,
  fg: PropTypes.string
};

Knob.defaultProps = {
  defaultPercentage: 0,
  transform: p => p,
  mouseSpeed: 1,
  unit: "",
  name: "",
  bg: "black",
  fg: "white"
};

export default Knob;
