import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import api from "../api";

export const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const fireBaseEndPoint = "https://identitytoolkit.googleapis.com/v1/";
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  // processing errors
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push("/");
  }

  async function signUp({ email, password, name, ...rest }) {
    const url = `${fireBaseEndPoint}accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        name,
        rate: randomInt(0, 5) / 2.0, // from 0 up to 5 with step 0.5
        completedMeetings: randomInt(0, 200),
        image: api.avatarDiceBear(name),
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = { email: "User with this e-mail already exists" };
          throw errorObject;
        }
        if (message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          const errorObject = { email: "Too many attempts. Try again later." };
          throw errorObject;
        }
        if (message === "OPERATION_NOT_ALLOWED") {
          const errorObject = {
            email: "Sign in is not allowed by administrator"
          };
          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password }) {
    const url = `${fireBaseEndPoint}accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
          const errorObject = { email: "Invalid e-mail or password" };
          throw errorObject;
        }
        if (message === "USER_DISABLED") {
          const errorObject = { email: "User disabled by administrator" };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function setLocalUserData(data) {
    setCurrentUser(data);
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        currentUser,
        isLoading,
        logOut,
        setLocalUserData
      }}
    >
      {!isLoading ? children : "Loading ..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
