import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";
import localStorageService from "../../services/localStorage.service";
import getRandomInt from "../../utils/getRandomInt";
import api from "../../api";
import history from "../../utils/history";
import generateAuthError from "../../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: [],
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
      state.entities = null;
      state.dataLoaded = false;
    },
    userUpdated: (state, action) => {
      // update users array with modified current user
      const newUsers = state.entities.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        }
        return user;
      });
      state.entities = newUsers;
    },
    authRequested: (state) => {
      state.error = null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdated
} = actions;

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userUpdate");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const signUp =
  ({ email, password, name, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          name,
          rate: getRandomInt(0, 5) / 2.0, // from 0 up to 5 with step 0.5
          completedMeetings: getRandomInt(0, 200),
          image: api.avatarDiceBear(name),
          ...rest
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const signIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      dispatch(authRequestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested);
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push("/users");
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}

export const updateUser = (payload) => async (dispatch, getState) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdated(content));
    history.push(`/users/${payload._id}`);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (userId) => (state) => {
  return state.users?.entities?.find((user) => user._id === userId);
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
  return state.users?.entities?.find((u) => u._id === state.users.auth?.userId);
};

export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
