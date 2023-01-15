import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";

const Qualities = ({ qualitiesId }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualities = useSelector(getQualities());

  const getQualityById = (id) => qualities.find((qual) => qual._id === id);

  if (isLoading) {
    return "loading ...";
  } else {
    return (
      <>
        {" "}
        {qualitiesId.map((qualityId) => {
          const quality = getQualityById(qualityId);
          return <Quality key={quality._id} {...quality} />;
        })}
      </>
    );
  }
};

Qualities.propTypes = {
  qualitiesId: PropTypes.array.isRequired
};

export default Qualities;
