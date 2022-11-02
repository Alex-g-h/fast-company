import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const Qualities = ({ qualities }) => {
  return (
    <>
      {" "}
      {qualities.map((quality) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  );
};

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default Qualities;
