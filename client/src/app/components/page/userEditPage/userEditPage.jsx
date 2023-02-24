import React from "react";
import EditForm from "../../ui/editForm";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserEditPage = ({ id }) => {
  const history = useHistory();

  const handleBack = () => {
    history.push(`/users/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <button
          className="btn btn-primary col-md-2 align-self-start"
          onClick={handleBack}
        >
          <i className="bi bi-caret-left"></i> Back
        </button>
        <div className="col-md-6 offset-md-1 shadow p-4">
          <EditForm id={id} />
        </div>
      </div>
    </div>
  );
};

UserEditPage.propTypes = {
  id: PropTypes.string
};

export default UserEditPage;
