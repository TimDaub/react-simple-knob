// @format
import React from "react";
import PropTypes from "prop-types";

import Arc from "./Arc";

class Knob extends React.Component {
  constructor(props) {
    super(props);

    this.handleDown = this.handleDown.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.calcAngle = this.calcAngle.bind(this);

    this.state = {
      drag: false,
      angle: props.defaultPercentage / props.angleRange
    };
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

    const { angleRange } = this.props;
    let { angle, prevPageY } = this.state;
    if (!prevPageY) {
      this.setState({ prevPageY: pageY });
      return;
    }
    const delta = prevPageY - pageY;

    angle = this.calcAngle(angle, delta, angleRange);
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

  render() {
    const { style, angleRange, angleOffset } = this.props;
    const { angle } = this.state;

    return (
      <svg
        onMouseDown={this.handleDown}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleUp}
        style={style}
        viewBox="0 0 100, 100"
      >
        <circle fill="red" r="40" cx="50" cy="50" />
        <Arc
          percentage={angle / angleRange}
          angleOffset={angleOffset}
          angleRange={angleRange}
          arcWidth={2}
          radius={48}
          center={50}
          background="transparent"
          color="red"
        />
      </svg>
    );
  }
}

Knob.propTypes = {
  defaultPercentage: PropTypes.number
};

Knob.defaultProps = {
  defaultPercentage: 0,
  angleOffset: 0,
  angleRange: 360
};

export default Knob;
