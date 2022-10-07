import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {" "}
      {qualities.map((qualitie) => (
        <Quality key={qualitie._id} {...qualitie} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
