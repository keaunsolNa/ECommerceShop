import { createSlice } from '@reduxjs/toolkit';

// project import
import { organizationHrinfo } from 'assets/data/organizationHrinfo';
import { dispatch } from 'store';

const initialState = {
  isLoader: false,
  error: false
};

// ==============================|| CALENDAR - SLICE ||============================== //

const organizationMember = createSlice({
  name: 'organizationMember',
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

    // retrieveByDepartment
    retrieve(state, action) {
      state.isLoader = false;
      state.retrieve = action.payload;
    }
  }
});

export default organizationMember.reducer;

export const { retrieve } = organizationMember.actions;

export function dispatchRetrieveByDepartment(department) {
  return async () => {
    dispatch(organizationMember.actions.loading());
    try {
      //   const response = await axios.get('/api/hrinfo');
      if (department === '화이트 정보') {
        dispatch(organizationMember.actions.retrieve(organizationHrinfo.data));
      } else if (department !== undefined && department.length !== 0) {
        dispatch(organizationMember.actions.retrieve(organizationHrinfo.data.filter((item) => item.department === department)));
      } else {
        dispatch(organizationMember.actions.retrieve(organizationHrinfo.data));
      }
    } catch (error) {
      dispatch(organizationMember.actions.hasError(error));
    }
  };
}
