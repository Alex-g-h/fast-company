import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const formatClass = () => {
    const classes = "badge ";
    return users && users.length !== 0
      ? classes + "bg-primary"
      : classes + "bg-danger";
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

  const renderQualities = (qualities) => {
    return qualities && qualities.length !== 0
      ? qualities.map((quality) => {
          const classes = "btn btn-sm m-2 btn-" + quality.color;
          return (
            <li key={quality._id} className={classes}>
              {quality.name}
            </li>
          );
        })
      : "";
  };

  const renderUsers = () => {
    return users && users.length !== 0
      ? users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>
              <ul>{renderQualities(user.qualities)}</ul>
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} / 5</td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(user._id)}
              >
                delete
              </button>
            </td>
          </tr>
        ))
      : "";
  };

  const renderTable = () => {
    return users && users.length !== 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    ) : (
      ""
    );
  };

  return (
    <>
      <h3>
        <span className={formatClass()}>{renderPhrase(users.length)}</span>
      </h3>
      {renderTable()}
    </>
  );
};

export default Users;
