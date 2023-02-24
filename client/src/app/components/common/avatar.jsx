import React from "react";
import api from "../../api";
import PropTypes from "prop-types";

const Avatar = ({ name, srcName, width, height, alternative, classAddon }) => {
  const imgWidth = width ?? 100;
  const imgHeight = height ?? imgWidth;
  const altName = alternative ?? "avatar";
  const classNamePostfix = classAddon ?? "";

  return (
    <img
      src={srcName ?? api.avatarDiceBear(name)}
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
  classAddon: PropTypes.string,
  srcName: PropTypes.string
};

export default Avatar;
