import React, { useState } from "react";
import { useComment } from "../../../hooks/useComment";

const NewCommentForm = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const { createComment } = useComment();

  const textAreaComponent = document.querySelector("#commentTextArea");

  const handleSendMessage = (target) => {
    createComment({
      content: textAreaComponent?.value
    });

    // cleaning up the form
    textAreaComponent.value = "";
    setCommentMessage("");
  };

  const handleTextAreaChange = ({ target }) => {
    setCommentMessage(target.value);
  };

  const isFormFilled = Boolean(commentMessage.trim());

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4 align-self-right">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="commentTextArea"
              rows="3"
              name="comment"
              onChange={handleTextAreaChange}
            ></textarea>
          </div>
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
