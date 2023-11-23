import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Avatar, Button, Grid, IconButton, Select, InputLabel, MenuItem, Stack, TextField, Chip } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { CloseOutlined, DeleteFilled } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteModal from '../../pages/common/DeleteModal';
import PropTypes from 'prop-types';
import AnimateButton from 'components/@extended/AnimateButton';

const EmployeeDetailModal = ({ selectedData, handleReload, handleOpen }) => {
  // states
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const isInsert = selectedData.id === undefined;
  const avatarImage = require.context('assets/images/users', true);
  const [userRoleList, setUserRoleList] = useState([]);
  const [userStateList, setUserStateList] = useState([]);
  const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const callNumberRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const employeeSchema = Yup.object().shape({
    id: Yup.string().max(30).required('ID는 필수값입니다.'),
    password: !isInsert
      ? Yup.string()
      : Yup.string()
        .max(30)
        .required('비밀번호는 필수값입니다.')
        .matches(
          '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$',
          '비밀번호는 최소 8자의 문자, 숫자, 특수문자가 포함되어야 합니다.'
        ),
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
    phoneNumber:
      Yup.string()
        .max(13)
        .matches(phoneNumberRegex, '올바른 핸드폰 번호 형식이 아닙니다. (XXX-XXXX-XXXX)')
        .required('휴대폰 번호는 필수입니다.'),
    callNumber: !isInsert
      ? Yup.string()
        .max(13)
        .matches(callNumberRegex, '올바른 전화번호 형식이 아닙니다. (XX-XXXX-XXXX 또는 XXX-XXX-XXXX)')
      : Yup.string(),
    fileId: Yup.string().max(200),
    address: Yup.string().max(200)
  });
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
      phoneNumber: isInsert ? '' : selectedData.phoneNumber,
      callNumber: isInsert ? '' : selectedData?.callNumber,
      fileId: isInsert ? '' : selectedData?.fileId,
      address: isInsert ? '' : selectedData?.address
    }
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: employeeSchema,
    onSubmit: (values) => {
      const data = {
        id: values.id,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        email: values.email,
        state: values.state,
        name: values.name,
        gender: values.gender,
        role: values.role,
        birth: values.birth.format('YYYY-MM-DD'),
        phoneNumber: values.phoneNumber,
        callNumber: values?.callNumber,
        fileId: values?.fileId,
        address: values?.address
      };

      if (values.id === '') {
        delete values.id;
      }
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
        setUserRoleList(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    const retrieveStateCall = axios.get(`/api/employeeState`);
    Promise.all([retrieveStateCall])
      .then(([response]) => {
        setUserStateList(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);
  const { isSubmitting} = formik;
  if (loading) return <Loader />;
  return (
    <MainCard
      title="인사 기록 카드"
      secondary={
        <Stack direction={'row'} spacing={2}>
          {isInsert ? null : (
            <IconButton color="error" onClick={() => setDeleteModal(true)} size="small" sx={{ fontSize: '1.1rem' }}>
              <DeleteFilled />
            </IconButton>
          )}
          <IconButton color="secondary" onClick={() => handleOpen()} size="small" sx={{ fontSize: '1.1rem' }}>
            <CloseOutlined />
          </IconButton>
          <DeleteModal title={'인사기록카드'} open={deleteModal} handleClose={() => setDeleteModal(!deleteModal)} deleteData={deleteData} />
        </Stack>
      }
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar alt="Avatar 1" size="xl" src={avatarImage(`./default.png`)} />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>아이디</InputLabel>
                  <TextField
                    fullWidth
                    id="id"
                    name="id"
                    placeholder="ID"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    error={formik.touched.id && Boolean(formik.errors.id)}
                    helpertext={formik.touched.id && formik.errors.id}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} style={{ display: !isInsert ? 'none' : 'block' }}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helpertext={formik.touched.password && formik.errors.password}
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
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helpertext={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                    name="email"
                    placeholder="이메일"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helpertext={formik.touched.email && formik.errors.email}
                    type={'email'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>상태</InputLabel>
                  <Select
                    fullWidth
                    id="state"
                    name="state"
                    placeholder="상태"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helpertext={formik.touched.state && formik.errors.state}
                    defaultValue={'가입 대기'}
                  >
                    {userStateList.map((option, idx) => (

                      <MenuItem key={option} value={option} id={`${option}-${idx}`}>
                        <Chip color="primary" label={option} size="small" variant="light" />
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>이름</InputLabel>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="이름"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helpertext={formik.touched.name && formik.errors.name}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>성별</InputLabel>
                  <Select
                    fullWidth
                    id="gender"
                    name="gender"
                    placeholder="성별"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helpertext={formik.touched.gender && formik.errors.gender}
                    defaultValue={'남성'}
                  >
                    <MenuItem value="남성">
                      <Chip color="primary" label="남성" size="small" variant="light" />
                    </MenuItem>
                    <MenuItem value="여성">
                      <Chip color="primary" label="여성" size="small" variant="light" />
                    </MenuItem>
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>직책</InputLabel>
                  <Select
                    fullWidth
                    id="role"
                    name="role"
                    placeholder="직책"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helpertext={formik.touched.role && formik.errors.role}
                    defaultValue={'일반 관리자'}
                  >
                    {userRoleList.map((option, idx) => (

                      <MenuItem key={option} value={option} id={`${option}-${idx}`}>
                        <Chip color="primary" label={option} size="small" variant="light" />
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>생년월일</InputLabel>
                  <DatePicker
                    value={formik.values.birth}
                    format="YYYY-MM-DD"
                    onChange={(date) => {
                      formik.setFieldValue('birth', date);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>핸드폰 번호</InputLabel>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="핸드폰 번호"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helpertext={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    type={'tel'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>집 전화 번호</InputLabel>
                  <TextField
                    fullWidth
                    id="callNumber"
                    name="callNumber"
                    placeholder="집 전화 번호"
                    value={formik.values.callNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.callNumber && Boolean(formik.errors.callNumber)}
                    helpertext={formik.touched.callNumber && formik.errors.callNumber}
                    type={'tel'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>주소</InputLabel>
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    placeholder="주소"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helpertext={formik.touched.address && formik.errors.address}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button fullWidth variant="contained" type="submit" disabled={isSubmitting}>>
                    저장
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>
      </FormikProvider>
    </MainCard>
  );
};

EmployeeDetailModal.propTypes = {
  selectedData: PropTypes.any,
  handleReload: PropTypes.func,
  handleOpen: PropTypes.func
};
export default EmployeeDetailModal;
