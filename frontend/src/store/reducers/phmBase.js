// project import
import { dispatch } from 'store';
import { responsePersonal } from 'assets/data/hrinfopersonal';

// third-party
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

const phmBase = createSlice({
  name: 'search',
  initialState,
  reducers: {
    //Error Control
    hasError(state, action) {
      state.error = action.payload.error;
    },
    getEmpBaseList(state, action) {
      state.lists = action.payload.open;
    },
    getEmpBaseDetail(state, action) {
      state.list = action.payload;
    },
    toggleEmpBaseDetail(state, action) {
      state.open = action.payload.open;
    }
  }
});

export default phmBase.reducer;

export const { getEmpBaseList, getEmpBaseDetail, toggleEmpBaseDetail } = phmBase.actions;

const ParsingDataList = (data) => {
  let returnData = [];
  data.data.map((x) => {
    let y;
    y = { ...x };
    returnData.push(y);
  });

  return returnData;
};

const ParsingData = (data) => {
  let returnData = [];
  let y;
  y = { ...data };
  returnData.push(y);
  return returnData[0];
};

export function getEmpBaseListSearch(setEmpList) {
  return async () => {
    try {
      // const response = await axios.get('/properties/frmCodeSys');
      const dataList = responsePersonal;

      setEmpList(ParsingDataList(dataList));
      dispatch(phmBase.actions.getEmpBaseList(dataList.data));
    } catch (error) {
      dispatch(phmBase.actions.hasError(error));
    }
  };
}

export function getEmpDetailSearch(data, setEmpData) {
  return async () => {
    try {
      const response = await axios.get('/api/hrinfo/basicinfo?uuid=3008948717');
      // const response = responseDetail.data.filter((item) => item.employeeId === data)[0];
      setEmpData(ParsingData(response.data));
      dispatch(phmBase.actions.getEmpBaseDetail(response.data));
    } catch (error) {
      dispatch(phmBase.actions.hasError(error));
    }
  };
}
