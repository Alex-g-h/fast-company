import React from "react";
import EditForm from "../../ui/editForm";
import PropTypes from "prop-types";

const UserEditPage = ({ id }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
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
