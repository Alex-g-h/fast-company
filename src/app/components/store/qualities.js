import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
  actions;

function isOutdated(date) {
  return Date.now() - date > 10 * 60 * 1000;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;

  if (!isOutdated(lastFetch)) return; // if data is still actual - nothing to do

  dispatch(qualitiesRequested());
  try {
    const { content } = await qualityService.fetchAll();
    dispatch(qualitiesReceived(content));
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message));
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
  const qualitiesArray = [];
  if (state.qualities.entities) {
    for (const qualId of qualitiesIds) {
      const quality = state.qualities.entities.find(
        (qual) => qual._id === qualId
      );
      if (quality) qualitiesArray.push(quality);
    }
  }
  return qualitiesArray;
};

export default qualitiesReducer;
