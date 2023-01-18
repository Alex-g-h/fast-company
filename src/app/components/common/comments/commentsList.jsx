import React, { useState, useEffect } from "react";
import Comment from "./comment";
import { useComment } from "../../../hooks/useComment";
import { useSelector } from "react-redux";
import { getUsers } from "../../store/users";

const CommentsList = () => {
  const [commentsWithName, setCommentsWithName] = useState([]);

  const users = useSelector(getUsers());
  const getUserById = (userId) => users.find((user) => user._id === userId);

  const { comments, removeComment } = useComment(); // get all comments for this/opened user

  async function fetchComments() {
    // get commentators ID and unify their
    const commentatorsIdAll = comments.map((comment) => comment.userId);
    const commentatorsIdUnique = [...new Set(commentatorsIdAll)];

    // prepare requests for commentators user data
    const commentatorsRequests = await commentatorsIdUnique.map((userId) =>
      getUserById(userId)
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

    setCommentsWithName(commentsWithName);
  }

  useEffect(() => {
    fetchComments();
  }, [comments]);

  const handleCommentDelete = (id) => {
    removeComment(id);
  };

  const isLoadingOrEmpty = commentsWithName.length === 0;

  if (isLoadingOrEmpty) {
    return "";
  }

  // sort by creation date
  commentsWithName.sort((c1, c2) => c2.created_at - c1.created_at);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {commentsWithName.map((comment) => (
          <div key={comment._id} className="bg-light card-body mb-3">
            <div className="row">
              <Comment
                comment={comment}
                handleCommentDelete={handleCommentDelete}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
