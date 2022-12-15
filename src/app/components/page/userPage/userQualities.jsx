import React from "react";
import PropTypes from "prop-types";
import { Quality } from "../../ui/qualities";
import { useQuality } from "../../../hooks/useQuality";

const UserQualities = ({ qualities }) => {
  const { getQuality } = useQuality();

  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          {qualities?.map((qualityId) => (
            <Quality key={qualityId} {...getQuality(qualityId)} />
          ))}
        </p>
      </div>
    </div>
  );
};

UserQualities.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
};

export default UserQualities;
