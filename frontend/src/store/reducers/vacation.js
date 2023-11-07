import { createSlice } from '@reduxjs/toolkit';

// project import
import { response } from 'assets/data/vacationData';

// import axios from 'utils/axios';
import { dispatch } from 'store';

const initialState = {
  isLoader: false,
  error: false,
  create: [],
  retrieve: []
};

// ==============================|| CALENDAR - SLICE ||============================== //

const vacationCrud = createSlice({
  name: 'vacationCrud',
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
    retrieve(state, action) {
      state.isLoader = false;
      state.retrieve = action.payload;
    },
    // create
    create(state, action) {
      state.isLoader = false;
      state.create = action.payload;
    }
  }
});

export default vacationCrud.reducer;

// export const { update, remove } = crud.actions;
export function dispatchCreate() {
  return async () => {
    dispatch(vacationCrud.actions.loading());
    try {
      // const response = await axios.post('/api/hrinfo/add', newEvent);
      // dispatch(crud.actions.createHrInfo(response.data));
      dispatch(vacationCrud.actions.create(response.data));
    } catch (error) {
      dispatch(vacationCrud.actions.hasError(error));
    }
  };
}

export function dispatchRetrieve() {
  return async () => {
    dispatch(vacationCrud.actions.loading());
    try {
      //   const response = await axios.get('/api/hrinfo');
      // setEmployeeData(data[0]);
      dispatch(vacationCrud.actions.retrieve(response.data));
    } catch (error) {
      dispatch(vacationCrud.actions.hasError(error));
    }
  };
}
