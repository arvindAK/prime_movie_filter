import React from 'react';

const Range = (props) => (
  <div className="range">
    <p> {props.label}: <span>{props.value}</span></p>
    <input
      type="range" min="0" value={props.value} step={props.step} max={props.max}
      onChange={props.handleChange}
      name={props.name}
    />
  </div>
);

export default Range;
