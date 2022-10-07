import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status }) => {
  const classes = "bi text-danger bi-heart";
  const bookmarkClass = status ? classes + "-fill" : classes;

  return <i className={bookmarkClass} role="button"></i>;
};

BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;
