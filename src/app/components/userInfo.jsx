import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Quality from "./quality";
import { useHistory } from "react-router-dom";
import Rating from "./rating";

const UserInfo = ({ id }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  // async loading object
  useEffect(() => { api.users.getById(id).then((user) => setUser(user)); }, []);

  if (!user) return "Loading ...";

  const { name, qualities, profession, completedMeetings, rate } = user;

  return (
    <>
      <h2>{name}</h2>
      <h3>Профессия: {profession.name}</h3>
      <div>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </div>
      <p>Встретился, раз: {completedMeetings}</p>
      <Rating key={id} rating={rate} />
      <button
        className="btn btn-secondary mt-2"
        onClick={() => {
          history.push("/users");
        }}
      >
        Все пользователи
      </button>
    </>
  );
};

UserInfo.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserInfo;
