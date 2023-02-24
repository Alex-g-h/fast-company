import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Rating from "../common/rating/rating";
import Profession from "./profession";

const UsersTable = ({ users, onSort, selectedSort, onBookMark, ...rest }) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualitiesId={user.qualities} />
    },
    professions: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: {
      path: "rate",
      name: "Оценка",
      component: (user) => <Rating key={user._id} rating={user.rate} />
    },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <>
          <div className="m-2" onClick={() => onBookMark(user._id)}>
            <BookMark status={user.bookmark} />
          </div>
        </>
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onBookMark: PropTypes.func.isRequired
};

export default UsersTable;
