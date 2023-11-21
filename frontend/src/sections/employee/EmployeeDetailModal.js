import * as Yup from 'yup';
import { useFormik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Avatar, Button, Grid, IconButton, InputLabel, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { CloseOutlined, DeleteFilled } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AnimateButton from 'components/@extended/AnimateButton';
import DeleteModal from '../../pages/common/DeleteModal';

const EmployeeDetailModal = ({ selectedData, handleReload, handleOpen }) => {
  // states
  const isInsert = selectedData.id === undefined;
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const avatarImage = require.context('assets/images/users', true);

  const employeeSchema = Yup.object().shape({
    id: Yup.string().max(30).required('id is required'),
    password: Yup.string().max(30).required('password is required'),
    confirmPassword: Yup.string().max(30).required('confirmPassword is required'),
    email: Yup.string().max(255).required('email is required'),
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
    initialValues: {
      id: isInsert ? '' : selectedData.id,
      email: isInsert ? '' : selectedData.email,
      state: isInsert ? '' : selectedData.state,
      name: isInsert ? '' : selectedData.name,
      gender: isInsert ? '' : selectedData.gender,
      role: isInsert ? '' : selectedData.role,
      birth: isInsert ? null : dayjs(new Date(selectedData.birth)),
      phoneNumber: isInsert ? '' : selectedData.phoneNumber,
      callNumber: isInsert ? '' : selectedData.callNumber,
      fileId: isInsert ? '' : selectedData.fileId,
      address: isInsert ? '' : selectedData.address
    },
    enableReinitialize: true,
    employeeSchema,
    onSubmit: (values, { resetForm }) => {
      //폼 제출 전 로직 후 제출
      const item = {
        id: values.id,
        email: values.commonCodeName,
        state: values.commonLanguageCode,
        name: values.commonCodeAbbreviation,
        gender: values.commonForeignName,
        role: values.systemKorean,
        birth: values.systemEnglish.format('YYYY-MM-DD'),
        phoneNumber: values.commonChinese,
        callNumber: values.systemJapanese,
        fileId: values.commonOutName,
        address: values.commonMainCode
      };
      // 제출 이후 로직 작성
      setLoading(true);

      if (values.id === '') {
        delete item.id;
      }
      const response1 = isInsert ? axios.post('api/empBase', item) : axios.patch(`api/empBase/update`, item);
      Promise.all([response1])
        .then(() => {
          enqueueSnackbar(`저장이 완료되었습니다.`, {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 1000
          });
          resetForm();
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
    const response1 = axios.delete(`api/empBase/delete?id=${selectedData.id}`);
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
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

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
      <form onSubmit={formik.handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2.5}>
            <Grid item xs={3}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end"></Stack>
                <Stack spacing={2.5} alignItems="center">
                  <Avatar alt="Avatar 1" size="xl" src={avatarImage(`./default.png`)} />
                </Stack>
              </Grid>
              <Stack spacing={1}>
                <InputLabel>공통코드</InputLabel>
                <TextField
                  fullWidth
                  id="id"
                  name="id"
                  placeholder="ID"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  error={formik.touched.id && Boolean(formik.errors.id)}
                  helperText={formik.touched.id && formik.errors.id}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>이메일</InputLabel>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="이메일"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>상태</InputLabel>
                <TextField
                  fullWidth
                  id="state"
                  name="state"
                  placeholder="상태"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>이름</InputLabel>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder="코드약명"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>성별</InputLabel>
                <TextField
                  fullWidth
                  id="gender"
                  name="gender"
                  placeholder="성별"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>직책</InputLabel>
                <TextField
                  fullWidth
                  id="role"
                  name="role"
                  placeholder="직책"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
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
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>핸드폰 번호</InputLabel>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="핸드폰 번호"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>집 전화 번호</InputLabel>
                <TextField
                  fullWidth
                  id="callNumber"
                  name="callNumber"
                  placeholder="집 전화 번호"
                  value={formik.values.callNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.callNumber && Boolean(formik.errors.callNumber)}
                  helperText={formik.touched.callNumber && formik.errors.callNumber}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <InputLabel>주소</InputLabel>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  placeholder="주소"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.commonJapanese)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Stack>
            </Grid>
            <Grid item pt={2} xs={12}>
              <AnimateButton>
                <Button fullWidth variant="contained" type="submit">
                  저장
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
    </MainCard>
  );
};

export default EmployeeDetailModal;
