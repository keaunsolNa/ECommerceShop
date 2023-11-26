import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText, FormLabel,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { CameraOutlined, CloseOutlined, DeleteFilled } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteModal from '../../pages/common/DeleteModal';
import PropTypes from 'prop-types';
import Avatar from 'components/@extended/Avatar';
import { ThemeMode } from '../../config';
import { useTheme } from '@mui/material/styles';

const EmployeeDetailModal = ({ selectedData, handleReload, handleOpen }) => {
  // states
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [userRoleList, setUserRoleList] = useState(['일반관리자']);
  const [userStateList, setUserStateList] = useState(['가입 대기']);
  const isInsert = selectedData.id === undefined;
  const avatarImage = require.context('assets/images/users', true);
  const theme = useTheme();
  const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const callNumberRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
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
    phoneNumber: Yup.string()
      .max(13)
      .matches(phoneNumberRegex, '올바른 핸드폰 번호 형식이 아닙니다. (XXX-XXXX-XXXX)')
      .required('휴대폰 번호는 필수입니다.'),
    callNumber: !isInsert
      ? Yup.string().max(13).matches(callNumberRegex, '올바른 전화번호 형식이 아닙니다. (XX-XXXX-XXXX 또는 XXX-XXX-XXXX)')
      : Yup.string(),
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
    };
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: employeeSchema,
    onSubmit: async (values) => {

      const base64File = await convertBase64(selectedImage);
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
        fileId: base64File,
        address: values?.address
      };

      console.log(data)
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
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
  const [avatar, setAvatar] = useState(avatarImage(`./default.png`));
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

    console.log(selectedImage)
    console.log(avatar)
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, [selectedImage]);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;
  if (loading) return <Loader />;
  return (
    <MainCard
      title='인사 기록 카드'
      secondary={
        <Stack direction={'row'} spacing={2}>
          {isInsert ? null : (
            <IconButton color='error' onClick={() => setDeleteModal(true)} size='small' sx={{ fontSize: '1.1rem' }}>
              <DeleteFilled />
            </IconButton>
          )}
          <IconButton color='secondary' onClick={() => handleOpen()} size='small' sx={{ fontSize: '1.1rem' }}>
            <CloseOutlined />
          </IconButton>
          <DeleteModal title={'인사기록카드'} open={deleteModal} handleClose={() => setDeleteModal(!deleteModal)}
                       deleteData={deleteData} />
        </Stack>
      }
    >
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <Stack spacing={2.5} alignItems='center'>
                    <FormLabel
                      htmlFor='change-avtar'
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <img src ={selectedData.fileId}/>
                      {/*<Avatar alt='Avatar 1' src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />*/}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems='center'>
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type='file'
                      id='change-avtar'
                      placeholder='Outlined'
                      variant='outlined'
                      sx={{ display: 'none' }}
                      onChange={(e) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>아이디</InputLabel>
                  <TextField
                    fullWidth
                    id='id'
                    {...getFieldProps('id')}
                    placeholder='ID'
                    onChange={formik.handleChange}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                    disabled={!isInsert}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} style={{ display: !isInsert ? 'none' : 'block' }}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <TextField
                    fullWidth
                    id='password'
                    {...getFieldProps('password')}
                    placeholder='비밀번호'
                    onChange={formik.handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    type={'password'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} style={{ display: !isInsert ? 'none' : 'block' }}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor='confirmPassword'>Password</InputLabel>
                  <TextField
                    fullWidth
                    id='confirmPassword'
                    {...getFieldProps('confirmPassword')}
                    placeholder='비밀번호 확인'
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
                    id='email'
                    {...getFieldProps('email')}
                    placeholder='이메일'
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
                      id='state'
                      {...getFieldProps('state')}
                      onChange={formik.handleChange}
                      defaultValue={'가입 대기'}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography variant='subtitle1'>Select Status</Typography>;
                        }

                        return <Typography variant='subtitle2'>{selected}</Typography>;
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
                    <FormHelperText error id='standard-weight-helper-text-email-login' sx={{ pl: 1.75 }}>
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
                    id='name'
                    {...getFieldProps('name')}
                    placeholder='이름'
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
                      id='gender'
                      {...getFieldProps('gender')}
                      placeholder='성별'
                      onChange={formik.handleChange}
                      defaultValue={'남성'}
                      disabled={!isInsert}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography variant='subtitle1'>Select Status</Typography>;
                        }

                        return <Typography variant='subtitle2'>{selected}</Typography>;
                      }}
                    >
                      <MenuItem value='남성'>
                        <Chip color='primary' label='남성' size='small' variant='light' />
                      </MenuItem>
                      <MenuItem value='여성'>
                        <Chip color='primary' label='여성' size='small' variant='light' />
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {touched.gender && errors.gender && (
                    <FormHelperText error id='standard-weight-helper-text-email-login' sx={{ pl: 1.75 }}>
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
                      id='role'
                      {...getFieldProps('role')}
                      onChange={formik.handleChange}
                      defaultValue={'일반관리자'}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography variant='subtitle1'>Select Status</Typography>;
                        }

                        return <Typography variant='subtitle2'>{selected}</Typography>;
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
                    <FormHelperText error id='standard-weight-helper-text-email-login' sx={{ pl: 1.75 }}>
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
                    format='YYYY-MM-DD'
                    disabled={!isInsert}
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
                    id='phoneNumber'
                    {...getFieldProps('phoneNumber')}
                    placeholder='핸드폰 번호를 입력하세요'
                    onChange={formik.handleChange}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>집 전화 번호</InputLabel>
                  <TextField
                    fullWidth
                    id='callNumber'
                    {...getFieldProps('callNumber')}
                    placeholder='자택번호를 입력하세요'
                    onChange={formik.handleChange}
                    error={Boolean(touched.callNumber && errors.callNumber)}
                    helperText={touched.callNumber && errors.callNumber}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>주소</InputLabel>
                  <TextField
                    fullWidth
                    id='address'
                    {...getFieldProps('address')}
                    placeholder='주소를 입력하세요'
                    onChange={formik.handleChange}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant='contained' color='error' type='button' onClick={handleOpen}>
                  닫기
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant='contained' type='submit' disabled={isSubmitting}>
                  저장
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Form>
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
