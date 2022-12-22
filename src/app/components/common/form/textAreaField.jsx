import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4 align-self-right">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id={name}
        rows="3"
        name={name}
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextAreaField;
