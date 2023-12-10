import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
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
import ScrollX from '../../components/ScrollX';
import MainCard from 'components/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CreateMemberAccount = () => {
  // states
  const [loading, setLoading] = useState(true);
  const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const employeeSchema = Yup.object().shape({
    id: Yup.string().max(30).required('ID는 필수값입니다.'),
    password: Yup.string()
        .max(30)
        .required('비밀번호는 필수값입니다.')
        .matches('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$', '비밀번호는 최소 8자의 문자, 숫자, 특수문자가 포함되어야 합니다.'),
    confirmPassword: Yup.string()
        .max(30)
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호 일치 여부를 확인하세요'),
    email: Yup.string().max(255).required('이메일은 필수값입니다.').email('올바른 이메일 형식이 아닙니다.'),
    name: Yup.string().max(255).required('이름은 필수값입니다.'),
    gender: Yup.string().max(2).required('성별은 필수값입니다.'),
    birth: Yup.date().max(new Date(), '생년월일은 오늘 이전이어야 합니다.').required('생년월일을 입력하세요'),
    phoneNumber: Yup.string()
      .max(13)
      .matches(phoneNumberRegex, '올바른 핸드폰 번호 형식이 아닙니다. (XXX-XXXX-XXXX)')
      .required('휴대폰 번호는 필수입니다.'),
    callNumber: Yup.string(),
    address: Yup.string().max(200)
  });

  const getInitialValues = () => {
    return {
      id: '',
      password: '',
      confirmPassword: '',
      email:'',
      name:'',
      gender: '',
      birth:null,
      phoneNumber: '',
      callNumber: '',
      address: ''
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
        name: values.name,
        gender: values.gender,
        birth: values.birth.format('YYYY-MM-DD'),
        phoneNumber: values.phoneNumber,
        callNumber: values?.callNumber,
        address: values?.address
      };

      if (values.id === '') {
        delete values.id;
      }
      const response1 = axios.post('/memberBase', data);
      Promise.all([response1])
        .then(() => {
          enqueueSnackbar(`저장이 완료되었습니다.`, {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 1000
          });
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

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  if (loading) return <Loader />;
  return (
    <ScrollX>
      <MainCard
        title='회원 가입 페이지'
      >
        <FormikProvider value={formik}>
          <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2.5}>
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
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                    <InputLabel>이름</InputLabel>
                    <TextField
                      fullWidth
                      id='name'
                      {...getFieldProps('name')}
                      placeholder='이름'
                      onChange={formik.handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
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
                    <InputLabel>생년월일</InputLabel>
                    <DatePicker
                      value={formik.values.birth}
                      format='YYYY-MM-DD'
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
                  {/*<Button fullWidth variant='contained' color='error' type='button' onClick={handleOpen}>*/}
                  {/*  닫기*/}
                  {/*</Button>*/}
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant='contained' type='submit' disabled={isSubmitting}>
                    신규 가입
                  </Button>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Form>
        </FormikProvider>
      </MainCard>
    </ScrollX>
  );
};
export default CreateMemberAccount;
