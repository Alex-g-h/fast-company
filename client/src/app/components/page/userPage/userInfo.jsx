import React from "react";
import PropTypes from "prop-types";
import Rating from "../../common/rating";
import Avatar from "../../common/avatar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../store/professions";
import { getCurrentUserId } from "../../store/users";

const UserInfo = ({ user }) => {
  const history = useHistory();
  const { _id: id, name, profession, image, rate } = user;
  const { name: professionName } = useSelector(getProfessionById(profession));
  const currentUserId = useSelector(getCurrentUserId());

  const isUserACurrentUser = user._id === currentUserId;

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isUserACurrentUser && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            style={{ zIndex: 1 }}
            onClick={() => {
              history.push(`/users/${id}/edit`);
            }}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <Avatar srcName={image} width="150" />
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
  user: PropTypes.object
};

export default UserInfo;
