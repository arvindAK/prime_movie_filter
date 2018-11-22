import React from 'react';

const Count = (props) => (
  <div className="count">
    Displaying <span>{props.moviesLength}</span> movies
  </div>
);

export default Count;
