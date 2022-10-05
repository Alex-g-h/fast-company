import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const handleProffesionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  /**
   * If selected page is the last page and
   * items count has become not enough for this page then
   * current page force change to previous one.
   */
  useEffect(() => {
    const pageCount = Math.ceil(count / pageSize);
    if (pageCount < currentPage) setCurrentPage(currentPage - 1);
  });

  /**
   * Asynchroniously initialize professions array at the first page render
   */
  useEffect(() => {
    api.professions.fetchAll().then((profs) => setProfession(profs));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users;

  const usersCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  const count = filteredUsers?.length;

  return (
    <>
      <SearchStatus length={count} />
      <div className="d-flex flex-row m-3 flex-shrink p-3">
        {professions && users.length > 0 && (
          <>
            <div className="d-flex flex-column m-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProffesionSelect}
              />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          </>
        )}

        {usersCrop && usersCrop.length > 0 && (
          <div className="d-flex flex-column m-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Имя</th>
                  <th scope="col">Качества</th>
                  <th scope="col">Профессия</th>
                  <th scope="col">Встретился, раз</th>
                  <th scope="col">Оценка</th>
                  <th scope="col">Избранное</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usersCrop.map((user) => (
                  <User key={user._id} {...user} {...rest} />
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
