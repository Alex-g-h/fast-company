import React from "react";
import PropTypes from "prop-types";
import { Quality } from "../../ui/qualities";
import { useSelector } from "react-redux";
import { getQualitiesByIds } from "../../store/qualities";

const UserQualities = ({ qualitiesIds }) => {
  const qualitiesList = useSelector(getQualitiesByIds(qualitiesIds));

  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          {qualitiesList?.map((quality) => (
            <Quality key={quality._id} {...quality} />
          ))}
        </p>
      </div>
    </div>
  );
};

UserQualities.propTypes = {
  qualitiesIds: PropTypes.arrayOf(PropTypes.string)
};

export default UserQualities;
