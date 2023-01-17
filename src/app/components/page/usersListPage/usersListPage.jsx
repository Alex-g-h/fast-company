import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchUsers from "../../ui/searchUsers";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../store/professions";

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchUsers, setSearchUsers] = useState("");

  const { users } = useUser();
  const professions = useSelector(getProfessions());
  const isLoadingProfession = useSelector(getProfessionsLoadingStatus());
  const { currentUser } = useAuth();

  const handleDelete = (userId) => {
    // const newUsers = users.filter((user) => user._id !== userId);
    // setUsers(newUsers);
    console.log("handleDelete #", userId);
  };

  const handleToggleBookMark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark;
      return user;
    });
    // setUsers(newUsers);
    console.log("handleToggleBookMark: ", newUsers);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  function filterUsers(data) {
    const SearchUsersFilterFunc = (user) => {
      const regexp = new RegExp(searchUsers, "gi");
      return regexp.test(user.name);
    };

    const searchedUsers = searchUsers
      ? users.filter(SearchUsersFilterFunc)
      : users;

    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession === selectedProf._id)
      : searchedUsers;

    return filteredUsers.filter((user) => user._id !== currentUser._id);
  }

  const filteredUsers = filterUsers(users);

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
        {professions && !isLoadingProfession && users.length > 0 && (
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
