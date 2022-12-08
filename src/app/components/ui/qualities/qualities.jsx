import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const Qualities = ({ qualitiesId }) => {
  const { isLoading, getQuality } = useQuality();

  if (isLoading) {
    return "loading ...";
  } else {
    return (
      <>
        {" "}
        {qualitiesId.map((qualityId) => {
          const quality = getQuality(qualityId);
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
