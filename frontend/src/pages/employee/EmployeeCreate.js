import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const EmployeeCreate = () => {
  // states
  const status = ['가입 대기', '활동 계정', '휴면 계정', '탈퇴 계정', '블럭 계정'];
  const gender = ['남성', '여성'];
  const role = ['CEO', '재정관리자', '인사관리자', '일반관리자'];

  // function
  const save = async (data) => {
    try {
      await axios.post('/empBase', data).then(() => {
        enqueueSnackbar('수정이 완료되었습니다.', {
          anchorOrigin: { vertical: 'top', horizontal: 'center', color: 'primary' },
          autoHideDuration: 1000
        });
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('수정에 실패하였습니다.', {
        anchorOrigin: { vertical: 'top', horizontal: 'center', color: 'error' },
        autoHideDuration: 1000
      });
    }
  };
  const getInitialValues = () => {
    return {
      id: '',
      password: '',
      confirmPassword: '',
      email: '',
      state: '가입 대기',
      name: '',
      gender: '',
      role: '일반관리자',
      birth: null,
      phoneNumber: '',
      callNumber: '',
      fileId: '',
      address: ''
    };
  };
  // states
  const employeeSchema = Yup.object().shape({
    id: Yup.string().max(30).required('id is required'),
    password: Yup.string()
      .max(30)
      .required('password is required')
      .matches(
        '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$',
        '비밀번호는 최소 8자의 문자, 숫자, 특수문자가 포함되어야 합니다.'
      ),
    confirmPassword: Yup.string().max(30).required('confirmPassword is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    state: Yup.string().max(255),
    name: Yup.string().max(255).required('name is required'),
    gender: Yup.string().max(2).required('gender is required'),
    role: Yup.string().max(10).required('role is required'),
    birth: Yup.date().required('date is required'),
    phoneNumber: Yup.string().max(13).required('phoneNumber is required'),
    callNumber: Yup.string().max(13),
    fileId: Yup.string().max(200),
    address: Yup.string().max(200)
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: employeeSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const data = {
          id: values.id,
          password: values.password,
          confirmPassword: values.confirmPassword,
          email: values.email,
          state: values.state,
          name: values.name,
          gender: values.gender,
          role: values.role,
          birth: values.birth,
          phoneNumber: values.phoneNumber,
          callNumber: values.callNumber,
          fileId: values.fileId,
          address: values.address
        };
        setSubmitting(false);
        save(data);
      } catch (error) {
        console.error(error);
      }
    }
  });
  // states
  // functions
  const { errors, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="id">ID</InputLabel>
                    <TextField
                      fullWidth
                      id="id"
                      placeholder="Enter ID"
                      {...getFieldProps('id')}
                      error={Boolean(touched.id && errors.id)}
                      helperText={touched.id && errors.id}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <TextField
                      fullWidth
                      id="password"
                      placeholder="Enter Password"
                      {...getFieldProps('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      placeholder="Enter ConfirmPassword"
                      {...getFieldProps('confirmPassword')}
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="email">Email </InputLabel>
                    <TextField
                      fullWidth
                      id="email"
                      placeholder="Enter Email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="state"
                        {...getFieldProps('state')}
                        onChange={(event) => setFieldValue('state', event.target.value)}
                        input={<OutlinedInput id="select-state" placeholder="state" />}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Status</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        {status.map((column) => (
                          <MenuItem key={column} value={column}>
                            <ListItemText primary={column} />
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
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextField
                      fullWidth
                      id="name"
                      placeholder="Enter Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="gender"
                        {...getFieldProps('gender')}
                        onChange={(event) => setFieldValue('gender', event.target.value)}
                        input={<OutlinedInput id="select-gender" placeholder="gender" />}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Gender</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        {gender.map((column) => (
                          <MenuItem key={column} value={column}>
                            <ListItemText primary={column} />
                          </MenuItem>
                        ))}
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
                    <InputLabel htmlFor="role">Role</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="role"
                        {...getFieldProps('role')}
                        onChange={(event) => setFieldValue('role', event.target.value)}
                        input={<OutlinedInput id="select-role" placeholder="role" />}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Role</Typography>;
                          }
                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        {role.map((column) => (
                          <MenuItem key={column} value={column}>
                            <ListItemText primary={column} />
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
                    <InputLabel htmlFor="birth">Birth</InputLabel>
                    <DesktopDatePicker
                      value={formik.values.birth}
                      format="dd/MM/yyyy"
                      onChange={(date) => {
                        formik.setFieldValue('birth', date);
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      placeholder="Enter Phone Number"
                      {...getFieldProps('phoneNumber')}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="callNumber">Call Number</InputLabel>
                    <TextField
                      fullWidth
                      id="callNumber"
                      placeholder="Enter Call Number"
                      {...getFieldProps('callNumber')}
                      error={Boolean(touched.callNumber && errors.callNumber)}
                      helperText={touched.callNumber && errors.callNumber}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="callNumber">주소</InputLabel>
                    <TextField
                      fullWidth
                      id="address"
                      placeholder="주소를 입력하세요"
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      제출
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
    </>
  );
};

export default EmployeeCreate;
