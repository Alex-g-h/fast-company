import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from "../../store/qualities";

const Qualities = ({ qualitiesId }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualitiesId));

  if (isLoading) return "Loading ...";

  return (
    <>
      {" "}
      {qualitiesList.map((quality) => {
        return <Quality key={quality._id} {...quality} />;
      })}
    </>
  );
};

Qualities.propTypes = {
  qualitiesId: PropTypes.array.isRequired
};

export default Qualities;
