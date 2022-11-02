import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchUsers from "../../ui/searchUsers";

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();
  const [searchUsers, setSearchUsers] = useState("");

  // initialize users async
  useEffect(() => {
    api.users.fetchAll().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId);
    setUsers(newUsers);
  };

  const handleToggleBookMark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark;
      return user;
    });
    setUsers(newUsers);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchUsers("");
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => setSortBy(item);

  const handleSearchUsers = ({ target }) => {
    setSelectedProf();
    setSearchUsers(target.value);
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

  const SearchUsersFilterFunc = (user) => {
    const regexp = new RegExp(searchUsers, "gi");
    return regexp.test(user.name);
  };

  const searchedUsers = searchUsers
    ? users.filter(SearchUsersFilterFunc)
    : users;

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : searchedUsers;

  const count = filteredUsers ? filteredUsers.length : 0;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
    setSearchUsers("");
  };

  if (!users) return "Loading ...";

  return (
    <>
      <div className="d-flex flex-row flex-shrink">
        {professions && users.length > 0 && (
          <>
            <div className="d-flex flex-column m-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          </>
        )}
        <div className="d-flex flex-column m-3">
          <SearchStatus length={count} />
          <SearchUsers
            value={searchUsers}
            searchedUsersLength={count}
            onChange={handleSearchUsers}
          />
          {usersCrop && usersCrop.length > 0 && (
            <div className="d-flex flex-column m-3">
              <UsersTable
                users={usersCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onBookMark={handleToggleBookMark}
              />
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
      </div>
    </>
  );
};

export default UsersListPage;
