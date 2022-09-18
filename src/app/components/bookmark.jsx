import React from "react";

const BookMark = ({ status }) => {
  const classes = "bi text-danger bi-heart";
  const bookmarkClass = status ? classes + "-fill" : classes;

  return <i className={bookmarkClass}></i>;
};

export default BookMark;
