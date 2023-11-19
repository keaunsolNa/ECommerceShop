// project import
import axios from 'axios';
import { dispatch } from 'store';

// third-party
import { createSlice } from '@reduxjs/toolkit';

const countries = [
  { code: 'KS', label: 'South Korea', currency: 'Won', prefix: '₩' },
  { code: 'US', label: 'United States Dollar', currency: 'Dollar', prefix: '$' },
  { code: 'GB', label: 'United Kingdom Pound', currency: 'Pound', prefix: '£' },
  { code: 'IN', label: 'India Rupee', currency: 'Rupee', prefix: '₹' },
  { code: 'JP', label: 'Japan Yun', currency: 'Yun', prefix: '¥' }
];

const initialState = {
  isOpen: false,
  isCustomerOpen: false,
  open: false,
  country: countries[0],
  countries: countries,
  lists: [],
  list: null,
  error: null,
  alertPopup: false
};

const frmBizUnit = createSlice({
  name: 'search',
  initialState,
  reducers: {
    //Error Control
    hasError(state, action) {
      state.error = action.payload.error;
    },
    createFrmBizCode(state, action) {
      state.lists = action.payload.open;
    },
    //frmBizUnit frmCode
    getFrmCodeList(state, action) {
      state.lists = action.payload.open;
    },
    getFrmCode(state, action) {
      state.lists = action.payload.open;
    },
    toggleDetailPopup(state, action) {
      state.open = action.payload.open;
    },
    //update frmCode
    updateFrmCode(state, action) {
      state.state = action.payload.open;
    },
    deleteFrmCodeList(state, action) {
      state.lists = action.payload.open;
    }
  }
});

export default frmBizUnit.reducer;

export const { getFrmCodeList, updateFrmCode, toggleDetailPopup, getFrmCode, deleteFrmCodeList, createFrmBizCode } = frmBizUnit.actions;

const ParsingDataList = (data) => {
  let returnData = [];
  data.data.map((x) => {
    let y = {};
    y = { ...x };

    returnData.push(y);
  });

  return returnData;
};

const ParsingData = (data) => {
  let returnData = [];
  let y = {};
  y = { ...data };
  returnData.push(y);
  return returnData[0];
};

export function frmBizUnitCreate(data) {
  return async () => {
    try {
      const response = await axios.post('/properties/frmBizUnit', data);
      if (response.status === 200) {
        alert('생성 성공');
      } else {
        alert('생성 실패');
      }
    } catch (error) {
      dispatch(frmBizUnit.actions.hasError(error));
    }
  };
}

export function frmBizUnitCodeListSearch(setDataList) {
  return async () => {
    try {
      const response = await axios.get('/properties/frmBizUnit');

      console.log(response);
      setDataList(ParsingDataList(response));
      dispatch(frmBizUnit.actions.getFrmCodeList(response.data));
    } catch (error) {
      dispatch(frmBizUnit.actions.hasError(error));
    }
  };
}

export function frmBizUnitDetailSearch(data, setDetailData) {
  return async () => {
    try {
      const response = await axios.get(`/properties/frmBizUnit/${data.id}`);

      console.log(response);
      setDetailData(ParsingData(response.data));
      dispatch(frmBizUnit.actions.getFrmCode(response.data));
    } catch (error) {
      dispatch(frmBizUnit.actions.hasError(error));
    }
  };
}

export function frmBizUnitUpdate(data) {
  console.log(JSON.stringify(data));
  return async () => {
    try {
      const response = await axios.patch('/properties/frmBizUnit', JSON.stringify(data));

      if (response.status === 200) {
        alert('저장 성공');
      } else {
        alert('저장 실패');
      }
    } catch (error) {
      dispatch(frmBizUnit.actions.hasError(error));
    }
  };
}

export function frmBizUnitDelete(data, setDataList) {
  return async () => {
    try {
      const response = await axios.delete(`/properties/frmBizUnit/${data.id}`);
      const responseForReturnData = await axios.get('/properties/frmBizUnit');
      setDataList(ParsingDataList(responseForReturnData));
      dispatch(frmBizUnit.actions.getFrmCodeList(responseForReturnData.data));
      if (response.status === 200) {
        alert('삭제 성공');
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      dispatch(frmBizUnit.actions.hasError(error));
    }
  };
}
