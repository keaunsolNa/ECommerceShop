import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Dialog
} from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import ScrollX from '../../components/ScrollX';
import { CloseOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { PopupTransition } from '../../components/@extended/Transitions';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import DeleteModal from '../../pages/common/DeleteModal';
import PropTypes from 'prop-types';
import DaumPostcode from 'react-daum-postcode';
const EmployeeDetailModal = ({ selectedData, handleReload, handleOpen }) => {
  // states
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userRoleList, setUserRoleList] = useState(['일반관리자']);
  const [userStateList, setUserStateList] = useState(['가입 대기']);
  const [findAddressOpen, setFindAddressOpen] = useState(false);
  const [dupCheck, setDupCheck] = useState(false);
  const isInsert = selectedData.id === undefined;
  const employeeSchema = Yup.object().shape({
    id: Yup.string().max(30).required('ID는 필수값입니다.'),
    password: !isInsert
      ? Yup.string()
      : Yup.string()
        .max(30)
        .required('비밀번호는 필수값입니다.')
        .matches('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$', '비밀번호는 최소 8자의 문자, 숫자, 특수문자가 포함되어야 합니다.'),
    confirmPassword: !isInsert
      ? Yup.string()
      : Yup.string()
        .max(30)
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호 일치 여부를 확인하세요'),
    email: Yup.string().max(255).required('이메일은 필수값입니다.').email('올바른 이메일 형식이 아닙니다.'),
    state: Yup.string().max(255).required('계정 상태를 입력하세요'),
    name: Yup.string().max(255).required('이름은 필수값입니다.'),
    gender: Yup.string().max(2).required('성별은 필수값입니다.'),
    role: Yup.string().max(10).required('사용자 직책은 필수입니다.'),
    birth: Yup.date().max(new Date(), '생년월일은 오늘 이전이어야 합니다.').required('생년월일을 입력하세요'),
    frontPhoneNumber: Yup.string()
      .max(3)
      .matches(/^(010|011|016)$/, '올바른 휴대폰 번호를 입력하세요.')
      .required('통신사 번호는 필수입니다.'),
    middlePhoneNumber: Yup.string()
      .max(4)
      .matches(/^\d{4}$/, '올바른 중간 번호를 입력하세요.')
      .required('휴대폰 번호를 입력하세요.'),
    frontCallNumber: Yup.string()
      .max(3)
      .matches(/^(02|031|033)$/, '올바른 휴대폰 번호를 입력하세요.'),
    middleCallNumber: Yup.string()
      .max(4)
      .matches(/^\d{4}$/, '올바른 중간 번호를 입력하세요.'),
    lastCallNumber: Yup.string()
      .max(4)
      .matches(/^\d{4}$/, '올바른 끝 번호를 입력하세요.'),
    zipCode: Yup.string(),
    address: Yup.string().max(200),
    detailAddress: Yup.string().max(200)
  });

  const handleFindAddressOpen = (data) => {
    if (data && !isInsert) {
      selectedData.address = data.roadAddress;
      selectedData.zipCode = data.zonecode;
    } else if (data && isInsert) {
      formik.setFieldValue('address', data.roadAddress);
      formik.setFieldValue('zipCode', data.zonecode);
    }
    setFindAddressOpen(!findAddressOpen);
  };

  const handleIdDupCheck = () => {
    if(!formik.values.id) return;
    const retrieveDupCall = axios.get(`/empBase/dupCheck/${formik.values.id}`);
    Promise.all([retrieveDupCall])
      .then(([response]) => {
        setDupCheck(!response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  };
  const getInitialValues = () => {
    return {
      id: isInsert ? '' : selectedData.id,
      password: '',
      confirmPassword: '',
      email: isInsert ? '' : selectedData.email,
      state: isInsert ? '가입 대기' : selectedData.state,
      name: isInsert ? '' : selectedData.name,
      gender: isInsert ? '' : selectedData.gender,
      role: isInsert ? '일반관리자' : selectedData?.role,
      birth: isInsert ? null : dayjs(new Date(selectedData.birth)),
      frontPhoneNumber: isInsert ? '010' : selectedData.frontPhoneNumber,
      middlePhoneNumber: isInsert ? '' : selectedData.middlePhoneNumber,
      lastPhoneNumber: isInsert ? '' : selectedData.lastPhoneNumber,
      frontCallNumber: isInsert ? '02' : selectedData?.frontCallNumber,
      middleCallNumber: isInsert ? '' : selectedData?.middleCallNumber,
      lastCallNumber: isInsert ? '' : selectedData?.lastCallNumber,
      zipCode: isInsert ? '' : selectedData?.zipCode,
      address: isInsert ? '' : selectedData?.address,
      detailAddress: isInsert ? '' : selectedData?.detailAddress
    };
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      const data = {
        id: values.id,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        email: values.email,
        state: values.state,
        name: values.name,
        gender: values.gender,
        role: values.role,
        birth: values.birth,
        frontPhoneNumber: values.frontPhoneNumber,
        middlePhoneNumber: values.middlePhoneNumber,
        lastPhoneNumber: values.lastPhoneNumber,
        frontCallNumber: values?.frontCallNumber,
        middleCallNumber: values?.middleCallNumber,
        lastCallNumber: values?.lastCallNumber,
        zipCode: values?.zipCode,
        address: values?.address,
        detailAddress: values?.detailAddress
      };

      if (values.id === '') {
        delete values.id;
      }
      if(!dupCheck) return
      const response1 = isInsert ? axios.post('/empBase', data) : axios.patch(`/empBase`, data);
      Promise.all([response1])
        .then(() => {
          enqueueSnackbar(`저장이 완료되었습니다.`, {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 1000
          });
          handleOpen();
          handleReload();
        })
        .catch((error) => {
          enqueueSnackbar(`저장이 실패하였습니다.\nError fetching data:, ${error}`, {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 1000,
            variant: 'error'
          });
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  });

  const deleteData = () => {
    setLoading(true);
    const response1 = axios.delete(`/empBase/${selectedData.id}`);
    Promise.all([response1])
      .then(() => {
        enqueueSnackbar(`삭제가 완료되었습니다.`, {
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          autoHideDuration: 1000
        });
        handleOpen();
        handleReload();
      })
      .catch((error) => {
        enqueueSnackbar(`삭제가 실패하였습니다.\nError fetching data:, ${error}`, {
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          autoHideDuration: 1000,
          variant: 'error'
        });
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    const retrieveRoleCall = axios.get(`/api/role`);
    Promise.all([retrieveRoleCall])
      .then(([response]) => {
        setUserRoleList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    const retrieveStateCall = axios.get(`/api/employeeState`);
    Promise.all([retrieveStateCall])
      .then(([response]) => {
        setUserStateList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  if (loading) return <Loader />;
  return (
    <ScrollX>
      <MainCard
        title={isInsert ? '인사 기록 카드 등록' : '인사 기록 카드 수정'}
        secondary={
          <IconButton color="secondary" onClick={() => handleOpen()} size="small" sx={{ fontSize: '1.1rem' }}>
            <CloseOutlined />
          </IconButton>
        }
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>아이디</InputLabel>
                    <TextField
                      fullWidth
                      id="id"
                      {...getFieldProps('id')}
                      placeholder="ID"
                      onChange={(event) => {
                        formik.handleChange(event);
                        setDupCheck(false);
                      }}
                      error={Boolean(touched.id && errors.id)}
                      helperText={touched.id && errors.id}
                      disabled={!isInsert}
                      InputProps={
                        isInsert && !dupCheck
                          ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button color={dupCheck ? "success" : "error"} aria-label="Search" onClick={() => handleIdDupCheck()} >
                                  Id 중복체크
                                </Button>
                              </InputAdornment>
                            )
                          }
                          : <InputLabel  sx={{ color: 'success' }}>가입 가능</InputLabel>
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                <Stack spacing={1.25}>
                  {!dupCheck && isInsert ? (
                    <InputLabel  sx={{ color: 'red' }}>아이디 중복을 확인 하세요</InputLabel>
                  ) : null}
                </Stack>
              </Grid>
                <Grid item xs={12} style={{ display: !isInsert ? 'none' : 'block' }}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <TextField
                      fullWidth
                      id="password"
                      {...getFieldProps('password')}
                      placeholder="비밀번호"
                      onChange={formik.handleChange}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      type={'password'}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} style={{ display: !isInsert ? 'none' : 'block' }}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="confirmPassword">Password</InputLabel>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      {...getFieldProps('confirmPassword')}
                      placeholder="비밀번호 확인"
                      onChange={formik.handleChange}
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      type={'password'}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>이메일</InputLabel>
                    <TextField
                      fullWidth
                      id="email"
                      {...getFieldProps('email')}
                      placeholder="이메일"
                      onChange={formik.handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      type={'email'}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>상태</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="state"
                        {...getFieldProps('state')}
                        onChange={formik.handleChange}
                        defaultValue={'가입 대기'}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Status</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        {userStateList.map((option, idx) => (
                          <MenuItem key={option} value={option} id={`${option}-${idx}`}>
                            <ListItemText primary={option} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.state && errors.state && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                        {errors.state}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>이름</InputLabel>
                    <TextField
                      fullWidth
                      id="name"
                      {...getFieldProps('name')}
                      placeholder="이름"
                      onChange={formik.handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      disabled={!isInsert}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>성별</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="gender"
                        {...getFieldProps('gender')}
                        placeholder="성별"
                        onChange={formik.handleChange}
                        defaultValue={'남성'}
                        disabled={!isInsert}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Status</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        <MenuItem value="남성">
                          <Chip color="primary" label="남성" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="여성">
                          <Chip color="primary" label="여성" size="small" variant="light" />
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {touched.gender && errors.gender && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                        {errors.gender}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>직책</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="role"
                        {...getFieldProps('role')}
                        onChange={formik.handleChange}
                        defaultValue={'일반관리자'}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Status</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        {userRoleList.map((option, idx) => (
                          <MenuItem key={option} value={option} id={`${option}-${idx}`}>
                            <ListItemText primary={option} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.role && errors.role && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                        {errors.role}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>생년월일</InputLabel>
                    <DatePicker
                      value={formik.values.birth}
                      format="YYYY-MM-DD"
                      disabled={!isInsert}
                      onChange={(date) => {
                        formik.setFieldValue('birth', date);
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <InputLabel>핸드폰 번호</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="frontPhoneNumber"
                        {...getFieldProps('frontPhoneNumber')}
                        placeholder="통신사 종류"
                        onChange={formik.handleChange}
                        defaultValue={'010'}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Status</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        <MenuItem value="010">
                          <Chip color="primary" label="010" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="011">
                          <Chip color="primary" label="011" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="016">
                          <Chip color="primary" label="016" size="small" variant="light" />
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {touched.frontPhoneNumber && errors.frontPhoneNumber && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                        {errors.frontPhoneNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="middlePhoneNumber"
                    {...getFieldProps('middlePhoneNumber')}
                    placeholder="핸드폰 번호를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.middlePhoneNumber && errors.middlePhoneNumber)}
                    helperText={touched.middlePhoneNumber && errors.middlePhoneNumber}
                    sx={{ mb: { xs: -0.5, sm: 0.5 }, marginTop: 3 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="lastPhoneNumber"
                    {...getFieldProps('lastPhoneNumber')}
                    placeholder="핸드폰 번호를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.lastPhoneNumber && errors.lastPhoneNumber)}
                    helperText={touched.lastPhoneNumber && errors.lastPhoneNumber}
                    sx={{ mb: { xs: -0.5, sm: 0.5 }, marginTop: 3 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <InputLabel>집 전화 번호</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="frontCallNumber"
                        {...getFieldProps('frontCallNumber')}
                        placeholder="지역번호"
                        onChange={formik.handleChange}
                        defaultValue={'02'}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">지역 번호</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        <MenuItem value="02">
                          <Chip color="primary" label="02" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="031">
                          <Chip color="primary" label="031" size="small" variant="light" />
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {touched.frontCallNumber && errors.frontCallNumber && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                        {errors.frontCallNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="middleCallNumber"
                    {...getFieldProps('middleCallNumber')}
                    placeholder="집 전화번호를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.middleCallNumber && errors.middleCallNumber)}
                    helperText={touched.middleCallNumber && errors.middleCallNumber}
                    sx={{ mb: { xs: -0.5, sm: 0.5 }, marginTop: 3 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="lastCallNumber"
                    {...getFieldProps('lastCallNumber')}
                    placeholder="집 전화번호를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.lastCallNumber && errors.lastCallNumber)}
                    helperText={touched.lastCallNumber && errors.lastCallNumber}
                    sx={{ mb: { xs: -0.5, sm: 0.5 }, marginTop: 3 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <InputLabel>주소</InputLabel>
                    <TextField
                      fullWidth
                      id="zipCode"
                      {...getFieldProps('zipCode')}
                      placeholder="우편번호를 입력하세요"
                      disable={true}
                      onChange={formik.handleChange}
                      error={Boolean(touched.zipCode && errors.zipCode)}
                      helperText={touched.zipCode && errors.zipCode}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="address"
                    {...getFieldProps('address')}
                    placeholder="주소를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                    sx={{ mb: { xs: -0.5, sm: 0.5 }, marginTop: 3 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="primary" aria-label="Search" onClick={handleFindAddressOpen}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Dialog
                    maxWidth="md"
                    TransitionComponent={PopupTransition}
                    onClose={() => handleFindAddressOpen()}
                    open={findAddressOpen}
                    sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                    aria-describedby="alert-dialog-slide-description"
                    slotProps={{ backdrop: { style: { backgroundColor: 'rgba(255, 255, 255, 0.5)' } } }}
                  >
                    <DaumPostcode
                      onComplete={(data) => handleFindAddressOpen(data)} // 값을 선택할 경우 실행되는 이벤트
                      autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                      defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                      width={1200}
                      height="600px"
                    />
                  </Dialog>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="detailAddress"
                    {...getFieldProps('detailAddress')}
                    placeholder="주소를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.detailAddress && errors.detailAddress)}
                    helperText={touched.detailAddress && errors.detailAddress}
                    sx={{ mb: { xs: -0.5, sm: 0.5 }, marginTop: 3 }}
                  />
                </Grid>
                <Grid item pt={2} xs={12}>
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Grid item>
                      <Stack direction="row" spacing={2} alignItems="center">
                        {isInsert ? null : (
                          <AnimateButton>
                            <Button fullWidth variant="contained" type="button" color={'error'} onClick={() => setDeleteModal(true)}>
                              삭제
                            </Button>
                          </AnimateButton>
                        )}
                        <DeleteModal
                          title={'인사기록카드'}
                          open={deleteModal}
                          handleClose={() => setDeleteModal(!deleteModal)}
                          deleteData={deleteData}
                        />
                        <Button fullWidth variant="contained" type="submit" disabled={isSubmitting}>
                          저장
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Form>
        </FormikProvider>
      </MainCard>
    </ScrollX>
  );
};

EmployeeDetailModal.propTypes = {
  selectedData: PropTypes.any,
  handleReload: PropTypes.func,
  handleOpen: PropTypes.func
};
export default EmployeeDetailModal;