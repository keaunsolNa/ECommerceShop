import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
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
import { CloseOutlined, DeleteFilled } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteModal from '../../pages/common/DeleteModal';
import PropTypes from 'prop-types';

const ProductDetailModal = ({ selectedData, handleReload, handleOpen }) => {
  // states
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const isInsert = selectedData.id === undefined;
  const avatarImage = require.context('assets/images/users', true);
  const [productStateList, setProductStateList] = useState(['신규 상품']);
  const [categoriesList, setCategoriesList] = useState(['상의']);

  const productSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().max(255).required('이름은 필수값입니다.'),
    price: Yup.number().required('가격을 입력하세요'),
    amount: Yup.number().required('재고 수량을 입력하세요'),
    desc: Yup.string().max(2000).required('상품 설명을 입력하세요.')
  });
  const getInitialValues = () => {
    return {
      id: isInsert ? '' : selectedData.id,
      name: isInsert ? '' : selectedData.name,
      state: isInsert ? '신규 상품' : selectedData.state,
      categories: isInsert ? '상의' : selectedData.categories,
      price: isInsert ? 0 : selectedData.price,
      amount: isInsert ? 0 : selectedData.amount,
      createDate: isInsert ? null : dayjs(new Date(selectedData.createDate)),
      desc: isInsert ? '' : selectedData.desc
    };
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: productSchema,
    onSubmit: (values) => {
      const data = {
        id: values.id,
        name: values.name,
        state: values.state,
        categories: values.categories,
        price: values.price,
        amount: values.amount,
        createDate: values.createDate,
        desc: values.desc
      };

      if (values.id === '') {
        delete values.id;
      }
      const response1 = isInsert ? axios.post('/productBase', data) : axios.patch(`/productBase`, data);
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
    const response1 = axios.delete(`/productBase/${selectedData.id}`);
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
    const retrieveStateCall = axios.get(`/api/productState`);
    Promise.all([retrieveStateCall])
      .then(([response]) => {
        setProductStateList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    const retrieveCategoiresCall = axios.get(`/api/categories`);
    Promise.all([retrieveCategoiresCall])
      .then(([response]) => {
        console.log(response);
        setCategoriesList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;
  if (loading) return <Loader />;
  return (
    <MainCard
      title='상품 카드'
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
          <DeleteModal title={'상품 카드'} open={deleteModal} handleClose={() => setDeleteModal(!deleteModal)}
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
                    <Avatar alt='Avatar 1' size='xl' src={avatarImage(`./default.png`)} />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>이름</InputLabel>
                  <TextField
                    fullWidth
                    id='name'
                    {...getFieldProps('name')}
                    placeholder='이름을 입력하세요'
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
                      fullWidth
                      id='state'
                      {...getFieldProps('state')}
                      onChange={formik.handleChange}
                      defaultValue={'신규 상품'}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography variant='subtitle1'>Select Status</Typography>;
                        }

                        return <Typography variant='subtitle2'>{selected}</Typography>;
                      }}
                    >
                      {productStateList.map((option, idx) => (
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
                  <InputLabel>상품 카테고리</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      fullWidth
                      id='categories'
                      {...getFieldProps('categories')}
                      onChange={formik.handleChange}
                      defaultValue={'상의'}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography variant='subtitle1'>Select Status</Typography>;
                        }

                        return <Typography variant='subtitle2'>{selected}</Typography>;
                      }}
                    >
                      {categoriesList.map((option, idx) => (
                        <MenuItem key={option} value={option} id={`${option}-${idx}`}>
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.categories && errors.categories && (
                    <FormHelperText error id='standard-weight-helper-text-email-login' sx={{ pl: 1.75 }}>
                      {errors.categories}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>가격</InputLabel>
                  <TextField
                    fullWidth
                    id='price'
                    {...getFieldProps('price')}
                    placeholder='가격을 입력하세요'
                    onChange={formik.handleChange}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>재고</InputLabel>
                  <TextField
                    fullWidth
                    id='amount'
                    name='amount'
                    placeholder='재고'
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helpertext={formik.touched.amount && formik.errors.amount}
                    type={'number'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>설명</InputLabel>
                  <TextField
                    fullWidth
                    id='desc'
                    name='desc'
                    placeholder='설명'
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                    error={formik.touched.desc && Boolean(formik.errors.desc)}
                    helpertext={formik.touched.desc && formik.errors.desc}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} style={{ display: isInsert ? 'none' : 'block' }}>
                <Stack spacing={1.25}>
                  <InputLabel>생성일</InputLabel>
                  <DatePicker
                    value={formik.values.createDate}
                    format='YYYY-MM-DD'
                    disabled={!isInsert}
                    onChange={(date) => {
                      formik.setFieldValue('createDate', date);
                    }}
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

ProductDetailModal.propTypes = {
  selectedData: PropTypes.any,
  handleReload: PropTypes.func,
  handleOpen: PropTypes.func
};
export default ProductDetailModal;
