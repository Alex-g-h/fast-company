import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from "../../store/qualities";

const Qualities = ({ qualitiesId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualitiesId));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

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
