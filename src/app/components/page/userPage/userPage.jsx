import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import CommentsList from "../../common/comments/commentsList";
import NewCommentForm from "../../common/comments/newCommentForm";
import UserCompletedMeetings from "./userCompletedMeetings";
import UserQualities from "./userQualities";
import UserInfo from "./UserInfo";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  const [updateListToggle, setUpdateListToggle] = useState(false);

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
            <UserInfo
              id={id}
              name={name}
              professionName={profession.name}
              rate={rate}
            />

            <UserQualities qualities={qualities} />
            <UserCompletedMeetings completedMeetings={completedMeetings} />
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
