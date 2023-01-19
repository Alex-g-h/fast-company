import React from "react";
import PropTypes from "prop-types";
import CommentsList from "../../common/comments/commentsList";
import NewCommentForm from "../../common/comments/newCommentForm";
import UserCompletedMeetings from "./userCompletedMeetings";
import UserQualities from "./userQualities";
import UserInfo from "./userInfo";
import { useSelector } from "react-redux";
import { getUserById } from "../../store/users";

const UserPage = ({ id }) => {
  const user = useSelector(getUserById(id));

  if (!user) return "Loading ...";

  const { qualities, completedMeetings } = user;

  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserInfo user={user} />
            <UserQualities qualitiesIds={qualities} />
            <UserCompletedMeetings completedMeetings={completedMeetings} />
          </div>

          <div className="col-md-8">
            <NewCommentForm />
            <CommentsList />
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
