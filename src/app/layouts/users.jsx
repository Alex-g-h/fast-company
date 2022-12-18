import React, { useEffect } from "react";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage";
import { useHistory, useParams } from "react-router-dom";
import UserProvider from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";

const UsersLayout = () => {
  const params = useParams();
  const { userId, edit } = params;

  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (userId && edit && edit === "edit") {
      if (currentUser._id !== userId) {
        history.push(`/users/${currentUser._id}/edit`);
      }
    }
  }, []);

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
