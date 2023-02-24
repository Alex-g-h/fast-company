import React, { useState, useEffect } from "react";
import Comment from "./comment";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const CommentsList = () => {
  const [commentsWithName, setCommentsWithName] = useState([]);

  const users = useSelector(getUsers());
  const getUserById = (userId) => users.find((user) => user._id === userId);

  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  const { userId } = useParams();

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
    dispatch(loadCommentsList(userId));
  }, [userId]);

  useEffect(() => {
    if (!comments) return;
    fetchComments();
  }, [comments]);

  const handleCommentDelete = (id) => {
    dispatch(removeComment(id));
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
        {!isLoading
          ? commentsWithName.map((comment) => (
              <div key={comment._id} className="bg-light card-body mb-3">
                <div className="row">
                  <Comment
                    comment={comment}
                    handleCommentDelete={handleCommentDelete}
                  />
                </div>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default CommentsList;
