import { createSlice } from "@reduxjs/toolkit";
import professionService from "../../services/profession.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } =
  actions;

function isOutdated(date) {
  return Date.now() - date > 10 * 60 * 1000;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;

  if (!isOutdated(lastFetch)) return; // if data is still actual - nothing to do

  dispatch(professionsRequested());
  try {
    const { content } = await professionService.fetchAll();
    dispatch(professionsReceived(content));
  } catch (error) {
    dispatch(professionsRequestFailed(error.message));
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;
export const getProfessionsByIds = (professionsIds) => (state) => {
  const professionsArray = [];
  if (state.professions.entities) {
    for (const qualId of professionsIds) {
      const profession = state.professions.entities.find(
        (prof) => prof._id === qualId
      );
      if (profession) professionsArray.push(profession);
    }
  }
  return professionsArray;
};

export const getProfessionById = (professionId) => (state) => {
  let profession = null;
  if (state.professions.entities) {
    profession = state.professions.entities.find(
      (prof) => prof._id === professionId
    );
  }
  return profession;
};

export default professionsReducer;
