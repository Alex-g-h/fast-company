import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../../services/comment.service";
import { customAlphabet } from "nanoid";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentRemoveFailed: (state, action) => {
      state.error = action.payload;
    },
    commentRemoveSuccess: (state, action) => {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    },
    commentCreateSuccess: (state, action) => {
      if (!state.entities) state.entities = [];
      state.entities.push(action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentRemoveSuccess,
  commentCreateSuccess
} = actions;

const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveFailed = createAction("comments/commentRemoveFailed");
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateFailed = createAction("comments/commentCreateFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) dispatch(commentRemoveSuccess(id));
  } catch (error) {
    dispatch(commentRemoveFailed(error.message));
  }
};

export const createComment = (data) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const nanoid = customAlphabet("1234567890abcdef", 24);
    const comment = {
      ...data,
      _id: nanoid()
    };

    const { content } = await commentService.createComment(comment);
    dispatch(commentCreateSuccess(content));
  } catch (error) {
    dispatch(commentCreateFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
