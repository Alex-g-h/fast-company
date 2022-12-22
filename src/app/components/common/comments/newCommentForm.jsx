import React, { useState } from "react";
import { useComment } from "../../../hooks/useComment";
import TextAreaField from "../form/textAreaField";

const NewCommentForm = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const { createComment } = useComment();

  const handleSendMessage = (target) => {
    createComment({
      content: commentMessage
    });

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
