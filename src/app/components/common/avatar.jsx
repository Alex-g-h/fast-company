import React from "react";
import api from "../../api";
import PropTypes from "prop-types";

const Avatar = ({ name, width, height, alternative, classAddon }) => {
  const imgWidth = width ?? 100;
  const imgHeight = height ?? imgWidth;
  const altName = alternative ?? "avatar";
  const classNamePostfix = classAddon ?? "";

  return (
    <img
      src={api.avatarDiceBear(name)}
      width={imgWidth}
      height={imgHeight}
      alt={altName}
      className={`rounded-circle ${classNamePostfix}`}
    />
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alternative: PropTypes.string,
  classAddon: PropTypes.string
};

export default Avatar;
