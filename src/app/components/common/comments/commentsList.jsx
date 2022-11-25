import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Comment from "./comment";

const CommentsList = ({ id }) => {
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    // get all comments for this user
    const comments = await api.comments.fetchCommentsForUser(id);

    // get commentators ID and unify their
    const commentatorsIdAll = comments.map((comment) => comment.userId);
    const commentatorsIdUnique = [...new Set(commentatorsIdAll)];

    // prepare requests for commentators user data
    const commentatorsRequests = await commentatorsIdUnique.map((userId) =>
      api.users.getById(userId)
    );

    // get user's data for commentators
    const commentators = await Promise.all(commentatorsRequests);

    // add new field 'name' for object 'comment' with commentator's name
    const commentsWithName = comments.map((comment) => {
      const commentator = commentators.find(
        (user) => user._id === comment.userId
      );
      const commentWithName = {
        ...comment,
        name: commentator?.name || "Unname"
      };

      return commentWithName;
    });

    setComments(commentsWithName);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentDelete = (id) => {
    api.comments.remove(id);
    fetchComments();
  };

  const isLoadingOrEmpty = comments.length === 0;

  if (isLoadingOrEmpty) {
    return "";
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {comments.map((comment) => (
          <div key={comment._id} className="bg-light card-body mb-3">
            <div className="row">
              <div className="col">
                <Comment
                  comment={comment}
                  handleCommentDelete={handleCommentDelete}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  id: PropTypes.string
};

export default CommentsList;
