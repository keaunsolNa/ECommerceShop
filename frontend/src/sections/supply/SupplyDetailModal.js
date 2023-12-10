import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import Loader from '../../components/Loader';
import PropTypes from 'prop-types';
import ScrollX from '../../components/ScrollX';
import MainCard from '../../components/MainCard';
import {
  Button,
  Chip,
  Dialog,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { PopupTransition } from '../../components/@extended/Transitions';
import DaumPostcode from 'react-daum-postcode';
import AnimateButton from '../../components/@extended/AnimateButton';
import DeleteModal from '../../pages/common/DeleteModal';

const SupplyDetailModal = ({ selectedData, handleReload, handleOpen }) => {

  // states
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const isInsert = selectedData.supplyId === undefined;
  const [supplyStateList, setSupplyStateList] = useState(['B+']);
  const [findAddressOpen, setFindAddressOpen] = useState(false);
  const supplySchema = Yup.object().shape({
    supplyId: Yup.string(),
    name: Yup.string().max(255).required('이름은 필수값입니다.'),
    state: Yup.string().max(10).required('발주처 상태는 필수값입니다.'),
    frontTel: Yup.string()
      .max(3)
      .matches(/^(010|011|016)$/, '올바른 휴대폰 번호를 입력하세요.')
      .required('통신사 번호는 필수입니다.'),
    middleTel: Yup.string()
      .max(4)
      .matches(/^\d{4}$/, '올바른 중간 번호를 입력하세요.')
      .required('휴대폰 번호를 입력하세요.'),
    lastTel: Yup.string()
      .max(4)
      .matches(/^\d{4}$/, '올바른 번호를 입력하세요.')
      .required('휴대폰 번호를 입력하세요.'),
    zipCode: Yup.string(),
    address: Yup.string().max(200),
    detailAddress: Yup.string().max(200),
    desc: Yup.string().max(2000).required('발주처 설명을 입력하세요.')
  });

  // functions
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
  const getInitialValues = () => {
    return {
      supplyId: isInsert ? '' : selectedData.supplyId,
      name: isInsert ? '' : selectedData.name,
      state: isInsert ? 'B+' : selectedData.state,
      frontTel: isInsert ? '010' : selectedData.frontTel,
      middleTel: isInsert ? '' : selectedData.middleTel,
      lastTel: isInsert ? '' : selectedData.lastTel,
      zipCode: isInsert ? '' : selectedData?.zipCode,
      address: isInsert ? '' : selectedData?.address,
      detailAddress: isInsert ? '' : selectedData?.detailAddress,
      createDate: isInsert ? null : dayjs(new Date(selectedData.createDate)),
      desc: isInsert ? '' : selectedData.desc
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: supplySchema,
    onSubmit: async (values) => {
      const data = {
        supplyId: values.supplyId,
        name: values?.name,
        state: values?.state,
        frontTel: values.frontTel,
        middleTel: values.middleTel,
        lastTel: values.lastTel,
        zipCode: values.zipCode,
        address: values.address,
        detailAddress: values.detailAddress,
        desc: values.desc,
        createDate: values.createDate.format('YYYY-MM-DD')
      };

      if (values.id === '') {
        delete values.id;
      }

      const response1 = isInsert ? axios.post('/suplly', data) : axios.patch(`/suplly`, data);
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
    const response1 = axios.delete(`/supply/${selectedData.id}`);
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
    Promise.all([]).then(() => setLoading(false));
  }, []);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  if (loading) return <Loader />;
  return (
    <ScrollX>
      <MainCard
        title={isInsert ? '신규 발주처 등록' : '기존 발주처 수정'}
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
                    <InputLabel>발주처 이름</InputLabel>
                    <TextField
                      fullWidth
                      id="name"
                      {...getFieldProps('name')}
                      placeholder="발주처 이름"
                      onChange={formik.handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
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
                        defaultValue={'B+'}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <Typography variant="subtitle1">Select Status</Typography>;
                          }

                          return <Typography variant="subtitle2">{selected}</Typography>;
                        }}
                      >
                        <MenuItem value="A+">
                          <Chip color="primary" label="A+" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="A">
                          <Chip color="primary" label="A" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="B+">
                          <Chip color="primary" label="B+" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="B">
                          <Chip color="primary" label="B" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="C+">
                          <Chip color="primary" label="C+" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="C">
                          <Chip color="primary" label="C" size="small" variant="light" />
                        </MenuItem>
                        <MenuItem value="D+">
                          <Chip color="primary" label="D+" size="small" variant="light" />
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {touched.state && errors.state && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                        {errors.state}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <InputLabel>발주처 담당자 번호</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="frontTel"
                        {...getFieldProps('frontTel')}
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
                    {touched.frontTel && errors.frontTel && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                        {errors.frontTel}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="middleTel"
                    {...getFieldProps('middleTel')}
                    placeholder="핸드폰 번호를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.middleTel && errors.middleTel)}
                    helperText={touched.middleTel && errors.middleTel}
                    sx={{ mb: { xs: -0.5, sm: 0.5 }, marginTop: 3 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="lastTel"
                    {...getFieldProps('lastTel')}
                    placeholder="핸드폰 번호를 입력하세요"
                    onChange={formik.handleChange}
                    error={Boolean(touched.lastTel && errors.lastTel)}
                    helperText={touched.lastTel && errors.lastTel}
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
                      disabled={true}
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
                      onComplete={(data) => handleFindAddressOpen(data)}
                      autoClose={false}
                      defaultQuery=""
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
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel>발주처 설명</InputLabel>
                    <TextField
                      fullWidth
                      id="desc"
                      {...getFieldProps('desc')}
                      placeholder="발주처 설명"
                      onChange={formik.handleChange}
                      error={Boolean(touched.desc && errors.desc)}
                      helperText={touched.desc && errors.desc}
                    />
                  </Stack>
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
}

SupplyDetailModal.prototype = {
  selectedData: PropTypes.any,
  handleReload: PropTypes.func,
  handleOpen: PropTypes.func
}
export default SupplyDetailModal;