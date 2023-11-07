import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'store';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

// project import

const initialState = {
  isLoader: false,
  message: null,
  error: false,
  retrieve: [],
  retrieveMaster: {},
  retrievePersonal: [],
  retrieveAddress: [],
  retrievePhone: [],
  retrieveAppointment: [],
  update: []
};

// ==============================|| CALENDAR - SLICE ||============================== //

const hrinfo = createSlice({
  name: 'hrinfo',
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
    retrieveHrInfo(state, action) {
      state.isLoader = false;
      state.retrieve = action.payload;
    },

    // retrieve
    retrieveMaster(state, action) {
      state.isLoader = false;
      state.retrieveMaster = action.payload;
    },

    // retrievePersonal
    retrievePersonal(state, action) {
      state.isLoader = false;
      state.retrievePersonal = action.payload;
    },

    // retrieveAddress
    retrieveAddress(state, action) {
      state.isLoader = false;
      state.retrieveAddress = action.payload;
    },

    // retrievePhone
    retrievePhone(state, action) {
      state.isLoader = false;
      state.retrievePhone = action.payload;
    },

    // retrieveAppointment
    retrieveAppointment(state, action) {
      state.isLoader = false;
      state.retrieveAppointment = action.payload;
    }
  }
});

export default hrinfo.reducer;
export function dispatchRetrieveHrInfo(target) {
  return async () => {
    dispatch(hrinfo.actions.loading());
    try {
      await axios
        .get(`/api/hrinfo/${target}?uuid=3008948717`)
        .then((res) => {
          dispatch(hrinfo.actions.retrieveHrInfo(res.data));
        })
        .catch((e) => {
          console.error('error...', e);
        });
    } catch (error) {
      dispatch(hrinfo.actions.hasError(error));
    }
  };
}

export function dispatchCreate(type, data) {
  return async () => {
    dispatch(hrinfo.actions.loading());
    try {
      const response = await axios.post(`/api/${type}/create`, data);
      dispatch(hrinfo.actions.message(response.data.message));
      dispatch(hrinfo.actions.error(response.data.error));
    } catch (error) {
      dispatch(hrinfo.actions.hasError(error));
    }
  };
}

export function dispatchRetrieve() {
  return async () => {
    dispatch(hrinfo.actions.loading());
    try {
      const response = await axios.get(`/api/hrinfo/basic?uuid=3008948717`);
      // dispatch(hrinfo.actions.message(response.data.message));
      // dispatch(hrinfo.actions.error(response.data.error));
      dispatch(hrinfo.actions.retrieveMaster(response.data));
    } catch (error) {
      dispatch(hrinfo.actions.hasError(error));
    }
  };
}

export function dispatchRetrievePersonal() {
  return async () => {
    dispatch(hrinfo.actions.loading());
    try {
      const response = await axios.get(`/api/hrinfo/personalinfo?uuid=3008948717`);
      // dispatch(hrinfo.actions.message(response.data.message));
      // dispatch(hrinfo.actions.error(response.data.error));
      dispatch(hrinfo.actions.retrievePersonal([response.data]));
    } catch (error) {
      dispatch(hrinfo.actions.hasError(error));
    }
  };
}
export function dispatchRetrieveAppointment() {
  return async () => {
    dispatch(hrinfo.actions.loading());
    try {
      let response;
      await axios
        .get('/api/hrinfo/appointment?uuid=3008948717')
        .then((res) => {
          console.log('then...', res.data);
          dispatch(hrinfo.actions.retrieveAppointment(res.data));
        })
        .catch((e) => {
          console.error('error...', e);
          dispatch(hrinfo.actions.hasError(true));
        })
        .finally(() => {
          console.log('finally...');
        });
      console.log('response', response);
    } catch (error) {
      dispatch(hrinfo.actions.hasError(error));
    }
  };
}

// S : 주소/전화 조회
export function dispatchRetrieveAddress() {
  return async () => {
    dispatch(hrinfo.actions.loading());
    try {
      const responseAddress = await axios.get('/api/hrinfo/personaladdress?uuid=3008948717');
      dispatch(hrinfo.actions.retrieveAddress([responseAddress.data]));
    } catch (error) {
      dispatch(hrinfo.actions.hasError(error));
    }
  };
}

export function dispatchRetrievePhone() {
  return async () => {
    dispatch(hrinfo.actions.loading());
    try {
      const responsePhone = await axios.get('/api/hrinfo/personalphone?uuid=3008948717');
      dispatch(hrinfo.actions.retrievePhone([responsePhone.data]));
    } catch (error) {
      dispatch(hrinfo.actions.hasError(error));
    }
  };
}
// E : 주소/전화 조회

export function update(path, data) {
  return async (dispatch) => {
    dispatch(hrinfo.actions.loading());
    await axios
      .post(`/api/${path}?uuid=3008948717`, data)
      .then(() => {
        enqueueSnackbar('저장이 완료되었습니다.', {
          anchorOrigin: { vertical: 'top', horizontal: 'center', color: 'primary' },
          autoHideDuration: 1000
        });
        dispatch(hrinfo.actions.retrieveHrInfo(data));
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
