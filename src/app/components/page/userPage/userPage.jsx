import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { Quality } from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import Rating from "../../common/rating";
import CommentsList from "../../common/comments/commentsList";
import Avatar from "../../common/avatar";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  // async loading object
  useEffect(() => {
    api.users.getById(id).then((user) => setUser(user));
  }, []);

  if (!user) return "Loading ...";

  const { name, qualities, profession, completedMeetings, rate } = user;

  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <button
                  className="position-absolute top-0 end-0 btn btn-light btn-sm"
                  onClick={() => {
                    history.push(`/users/${id}/edit`);
                  }}
                >
                  <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <Avatar name={name} width="150" />
                  <div className="mt-3">
                    <h4>{name}</h4>
                    <p className="text-secondary mb-1">{profession.name}</p>
                  </div>
                  <Rating key={id} rating={rate} />
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Qualities</span>
                </h5>
                <p className="card-text">
                  {qualities.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                  ))}
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Completed meetings</span>
                </h5>

                <h1 className="display-1">{completedMeetings}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card mb-2">
              <div className="card-body">
                <div>
                  <h2>New comment</h2>
                  <div className="mb-4">
                    <select className="form-select" name="userId" value="">
                      <option disabled value="" selected>
                        Выберите пользователя
                      </option>

                      <option>Доктор</option>
                      <option>Тусер</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Сообщение
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <CommentsList id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
