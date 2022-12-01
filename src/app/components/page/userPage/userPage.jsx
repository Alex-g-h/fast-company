import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { Quality } from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import Rating from "../../common/rating";
import CommentsList from "../../common/comments/commentsList";
import Avatar from "../../common/avatar";
import NewCommentForm from "../../common/comments/newCommentForm";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  const [updateListToggle, setUpdateListToggle] = useState(false);
  const history = useHistory();

  // async loading object
  useEffect(() => {
    api.users.getById(id).then((user) => setUser(user));
  }, []);

  if (!user) return "Loading ...";

  const { name, qualities, profession, completedMeetings, rate } = user;

  const handleAddComment = ({ userId, content }) => {
    api.comments.add({ pageId: id, userId, content });
    setUpdateListToggle((prevState) => !prevState);
  };

  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <button
                  className="position-absolute top-0 end-0 btn btn-light btn-sm"
                  style={{ zIndex: 1 }}
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
            <NewCommentForm handleAddComment={handleAddComment} />

            <CommentsList id={id} updateListToggle={updateListToggle} />
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
