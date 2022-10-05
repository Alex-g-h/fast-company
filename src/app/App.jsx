import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
  const [users, setUsers] = useState();

  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId);
    setUsers(newUsers);
  };

  useEffect(() => {
    api.users.fetchAll().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleToggleBookMark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark;
      return user;
    });
    setUsers(newUsers);
  };

  return (
    <>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onBookMark={handleToggleBookMark}
        />
        //  )}
      )}
    </>
  );
}

export default App;
