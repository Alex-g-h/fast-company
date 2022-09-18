import React from "react";

const SearchStatus = ({ length }) => {
  const formatClass = () => {
    const classes = "badge ";
    return length !== 0 ? classes + "bg-primary" : classes + "bg-danger";
  };

  const renderPhrase = (number) => {
    if (number === 0) return "Никто с тобой не тусанет";

    let subject = "";
    let verb = "";

    if (number > 20) {
      switch (number) {
        case number % 10 === 1:
          subject = "человек";
          verb = "тусанет";
          break;
        case number % 10 === 2 || number % 10 === 3 || number % 10 === 4:
          subject = "человека";
          verb = "тусанут";
          break;
        default:
          break;
      }
    } else if ((5 <= number && number <= 20) || number === 1) {
      subject = "человек";
      verb = "тусанет";
    } else {
      // 2, 3, 4
      subject = "человека";
      verb = "тусанут";
    }

    let msg = `${String(number)} ${subject} ${verb} с тобой сегодня`;
    return msg;
  };

  return (
    <h3>
      <span className={formatClass()}>{renderPhrase(length)}</span>
    </h3>
  );
};

export default SearchStatus;
