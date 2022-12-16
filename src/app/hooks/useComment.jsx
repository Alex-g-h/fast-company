import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentContext = React.createContext();

export const useComment = () => {
  return useContext(CommentContext);
};

const CommentProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const { userId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    getComments();
  }, [userId]);

  // processing errors
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  /**
   * Create new comment object and send it to DB
   * @param {*} data Comment content
   */
  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUser._id,
      created_at: Date.now()
    };

    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        );
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <CommentContext.Provider
      value={{ isLoading, comments, createComment, getComments, removeComment }}
    >
      {!isLoading ? children : ""}
    </CommentContext.Provider>
  );
};

CommentProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CommentProvider;
