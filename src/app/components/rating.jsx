import React from "react";
import RateOne from "./rateOne";
import PropTypes from "prop-types";

const Rating = ({ rating }) => {
  return (
    <div className="d-flex p-1 flex-row">
      <RateOne rate={rating} />
      <RateOne rate={rating - 1} />
      <RateOne rate={rating - 2} />
      <RateOne rate={rating - 3} />
      <RateOne rate={rating - 4} />
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired
};

export default Rating;
