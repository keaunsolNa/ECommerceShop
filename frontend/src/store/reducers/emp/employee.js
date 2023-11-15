import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'store/index';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

// project import

const initialState = {
  isLoader: false,
  message: null,
  error: false,
  data: [],
  update: []
};

// ==============================|| CALENDAR - SLICE ||============================== //

const employee = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // loader
    loading(state) {
      state.isLoader = true;
    },

    // message
    message(state, action) {
      state.isLoader = false;
      state.message = action.payload;
    },

    // error
    hasError(state, action) {
      state.isLoader = false;
      state.error = action.payload;
    },

    // retrieve
    retrieveEmployee(state, action) {
      state.isLoader = false;
      state.data = action.payload;
    }
  }
});

export default employee.reducer;
export function dispatchRetrieveEmployee(target, id) {
  return async () => {
    dispatch(employee.actions.loading());
    try {
      await axios
        .get(`http://localhost:8080/${target}/${id}`)
        .then((res) => {
          dispatch(employee.actions.retrieveEmployee(res.data));
        })
        .catch((e) => {
          console.error('error...', e);
        });
    } catch (error) {
      dispatch(employee.actions.hasError(error));
    }
  };
}
// E : 주소/전화 조회

export function update(path, data) {
  return async (dispatch) => {
    dispatch(employee.actions.loading());
    await axios
      .post(`/api/${path}?uuid=3008948717`, data)
      .then(() => {
        enqueueSnackbar('저장이 완료되었습니다.', {
          anchorOrigin: { vertical: 'top', horizontal: 'center', color: 'primary' },
          autoHideDuration: 1000
        });
        dispatch(employee.actions.retrieveHrInfo(data));
      })
      .catch(() => {
        enqueueSnackbar('데이터가 저장 실패하였습니다.', {
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          autoHideDuration: 1000,
          variant: 'error'
        });
      });
  };
}
