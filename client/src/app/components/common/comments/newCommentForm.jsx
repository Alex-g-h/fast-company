import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/comments";
import { getCurrentUserId } from "../../store/users";
import TextAreaField from "../form/textAreaField";

const NewCommentForm = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const dispatch = useDispatch();

  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  const handleSendMessage = (target) => {
    dispatch(
      createComment({
        content: commentMessage,
        pageId: userId,
        userId: currentUserId
      })
    );

    setCommentMessage(""); // cleaning up the form
  };

  const handleTextAreaChange = ({ value }) => {
    setCommentMessage(value);
  };

  const isFormFilled = Boolean(commentMessage.trim());

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <TextAreaField
            label="Message"
            name="message"
            value={commentMessage}
            onChange={handleTextAreaChange}
          />
          <div className="mb-4 text-end">
            <button
              className="btn btn-primary"
              disabled={!isFormFilled}
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCommentForm;
