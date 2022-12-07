import React from "react";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage";
import { useParams } from "react-router-dom";
import UserProvider from "../hooks/useUsers";

const UsersLayout = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UserProvider>
        {userId ? (
          edit && edit === "edit" ? (
            <UserEditPage id={userId} />
          ) : (
            <UserPage id={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default UsersLayout;
