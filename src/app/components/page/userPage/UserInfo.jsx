import React from "react";
import PropTypes from "prop-types";
import Rating from "../../common/rating";
import Avatar from "../../common/avatar";
import { useHistory } from "react-router-dom";

const UserInfo = ({ id, name, professionName, rate }) => {
  const history = useHistory();

  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          style={{ zIndex: 1 }}
          onClick={() => {
            history.push(`/users/${id}/edit`);
          }}
        >
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <Avatar name={name} width="150" />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{professionName}</p>
          </div>
          <Rating key={id} rating={rate} />
        </div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  professionName: PropTypes.string,
  rate: PropTypes.number
};

export default UserInfo;
