// third-party
import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import { response } from 'assets/data/organizationinfo';

const initialState = {
  isLoader: false,
  error: false,
  condition: {},
  data: []
};

// ==============================|| CALENDAR - SLICE ||============================== //

const organizationinfo = createSlice({
  name: 'organizationinfo',
  initialState,
  reducers: {
    // loader
    loading(state) {
      state.isLoader = true;
    },

    // error
    hasError(state, action) {
      state.isLoader = false;
      state.error = action.payload;
    },

    // retrieve
    condition(state, action) {
      state.isLoader = false;
      state.condition = action.payload;
    },

    // retrieve
    retrieve(state, action) {
      state.isLoader = false;
      state.data = action.payload;
    }
  }
});

export default organizationinfo.reducer;

export const { retrieve } = organizationinfo.actions;

export function dispatchCondition(date, organization) {
  return async () => {
    dispatch(organizationinfo.actions.loading());
    try {
      dispatch(organizationinfo.actions.condition({ date, organization }));
    } catch (error) {
      dispatch(organizationinfo.actions.hasError(error));
    }
  };
}

export function dispatchRetrieve() {
  return async () => {
    dispatch(organizationinfo.actions.loading());
    try {
      // const response = await axios.get("/assets/data/organizationinfo.js");
      dispatch(organizationinfo.actions.retrieve(response.data));
    } catch (error) {
      dispatch(organizationinfo.actions.hasError(error));
    }
  };
}
