import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
  return (
    <div className="mb-4">
      <label className="form-label" htmlFor="radioSex">
        {label}
      </label>
      <div id="radioSex">
        {options.map((option) => (
          <div
            className="form-check form-check-inline"
            key={option.name + "_" + option.value}
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={option.name + "_" + option.value}
              value={option.value}
              checked={option.value === value}
              onChange={onChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + "_" + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string
};

export default RadioField;
