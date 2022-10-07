import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, name }) => {
  const classes = "btn btn-sm m-2 btn-" + color;
  return <li className={classes}>{name}</li>;
};

Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Quality;
