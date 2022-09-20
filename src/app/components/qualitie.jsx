import React from "react";

const Qualitie = ({ color, name }) => {
  const classes = "btn btn-sm m-2 btn-" + color;
  return <li className={classes}>{name}</li>;
};

export default Qualitie;
