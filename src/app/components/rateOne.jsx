import React from "react";
import PropTypes from "prop-types";

const RateOne = ({ rate }) => {
  let rateClass = "bi text-warning bi-star"; // equal to (rate <= 0.0)

  if (rate >= 1.0) {
    rateClass += "-fill";
  } else if (rate >= 0.5) {
    rateClass += "-half";
  }

  return <i className={rateClass}></i>;
};

RateOne.propTypes = {
  rate: PropTypes.number.isRequired
};

export default RateOne;
