import React from "react";

const Qualitie = ({ color, name, _id }) => {
  const classes = "btn btn-sm m-2 btn-" + color;
  return (
    <li
      key={_id}
      className={classes}
    >
      {name}
    </li>
  );
};

export default Qualitie;
