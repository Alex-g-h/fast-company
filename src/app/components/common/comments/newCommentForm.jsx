import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";

const NewCommentForm = ({ handleAddComment }) => {
  const EMPTY_SELECTED_USER = { _id: "", name: "" };
  const [usersShrunk, setUsersShrunk] = useState([]);
  const [selectedUser, setSelectedUser] = useState(EMPTY_SELECTED_USER);
  const [commentMessage, setCommentMessage] = useState("");

  const textAreaComponent = document.querySelector("#commentTextArea");

  useEffect(() => {
    // hold in user object only ID and name values
    api.users.fetchAll().then((users) => {
      const newUsers = users.map(({ _id, name }) => ({
        _id,
        name
      }));
      setUsersShrunk(newUsers);
    });
  }, []);

  const handleSelectUser = ({ target }) => {
    const selected = usersShrunk.find((user) => user._id === target.value);
    setSelectedUser(selected);
  };

  const handleSendMessage = (target) => {
    handleAddComment({
      userId: selectedUser._id,
      content: textAreaComponent?.value
    });

    // cleaning up the form
    textAreaComponent.value = "";
    setSelectedUser(EMPTY_SELECTED_USER);
    setCommentMessage("");
  };

  const handleTextAreaChange = ({ target }) => {
    setCommentMessage(target.value);
  };

  const isFormFilled =
    Boolean(selectedUser._id) && Boolean(commentMessage.trim());

  const sortByNamesAsc = (user1, user2) => {
    if (user1.name > user2.name) return 1;
    if (user1.name < user2.name) return -1;
    return 0;
  };

  const usersShrunkSorted = usersShrunk.sort(sortByNamesAsc);

  const isLoading = usersShrunk.length === 0;

  if (isLoading) return "";

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <select
              className="form-select"
              name="userId"
              value={selectedUser._id}
              onChange={handleSelectUser}
            >
              <option disabled value="">
                Выберите пользователя
              </option>
              {usersShrunkSorted.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 align-self-right">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="commentTextArea"
              rows="3"
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

NewCommentForm.propTypes = {
  handleAddComment: PropTypes.func,
  initializeForm: PropTypes.bool
};

export default NewCommentForm;
