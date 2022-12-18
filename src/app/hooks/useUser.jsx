import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

const useUser = (second) => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // initialize users async
  useEffect(() => {
    getUsers();
  }, []);

  // processing errors
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateUser(user) {
    try {
      const { content } = await userService.update(user);
      const newUsers = users.map((user) => {
        if (user._id === content._id) {
          return content;
        }
        return user;
      });
      setUsers(newUsers);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  function getUserById(userId) {
    return users.find((user) => user._id === userId);
  }

  return (
    <UserContext.Provider value={{ isLoading, users, getUserById, updateUser }}>
      {!isLoading ? children : "Loading ..."}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserProvider;

export { useUser };
