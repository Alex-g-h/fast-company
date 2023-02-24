import React, { useEffect } from "react";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage";
import { useHistory, useParams } from "react-router-dom";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../components/store/users";

const UsersLayout = () => {
  const params = useParams();
  const { userId, edit } = params;

  const currentUserId = useSelector(getCurrentUserId());
  const history = useHistory();

  useEffect(() => {
    if (userId && edit && edit === "edit") {
      if (currentUserId !== userId) {
        history.push(`/users/${currentUserId}/edit`);
      }
    }
  }, []);

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit && edit === "edit" ? (
            <UserEditPage id={userId} />
          ) : (
            <UserPage id={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );
};

export default UsersLayout;
