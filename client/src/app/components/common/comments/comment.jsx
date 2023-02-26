import React from "react";
import Avatar from "../avatar";
import { getElapsedTime } from "../../../utils/getElapsedTime";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const Comment = ({ comment, handleCommentDelete }) => {
  const currentUserId = useSelector(getCurrentUserId());

  const isAuthor = comment.userId === currentUserId;

  return (
    <div className="d-flex flex-start">
      <Avatar
        name={comment.name}
        width="65"
        classAddon="shadow-1-strong me-3"
      />
      <div className="flex-grow-1 flex-shrink-1">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-1">
              {comment.name}
              <span className="small">
                {" "}
                {getElapsedTime(comment.created_at)}
              </span>
            </p>
            {isAuthor && (
              <button
                className="btn btn-sm text-primary d-flex align-items-center"
                onClick={() => handleCommentDelete(comment._id)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
          <p className="small mb-0">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  handleCommentDelete: PropTypes.func
};

export default Comment;
