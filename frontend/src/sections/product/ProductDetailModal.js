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

const ProductDetailModal = ({ selectedData, handleReload, handleOpen }) => {
  // states
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const isInsert = selectedData.id === undefined;
  const avatarImage = require.context('assets/images/users', true);
  const [productStateList, setProductStateList] = useState([]);

  const productSchema = Yup.object().shape({
    state: Yup.string().max(255).required('상품 상태를 입력하세요'),
    name: Yup.string().max(255).required('이름은 필수값입니다.'),
    price: Yup.number().required('상품 가격을 입력하세요'),
    amount: Yup.number(),
    viewCount: Yup.number(),
    createDate: Yup.date(),
    desc: Yup.string().max(2000).required('상품 설명을 입력하세요.')
  });
  const getInitialValues = () => {
    return {
      state: isInsert ? '신규 상품' : selectedData.state,
      name: isInsert ? '' : selectedData.name,
      price: isInsert ? 0 : selectedData.price,
      amount: isInsert ? 0 : selectedData.amount,
      viewCount: isInsert ? 0 : selectedData.viewCount,
      createDate: isInsert ? null : dayjs(new Date(selectedData.createDate)),
      desc: isInsert ? '' : selectedData.desc
    }
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: productSchema,
    onSubmit: (values) => {
      const data = {
        state: values.state,
        name: values.name,
        price: values.price,
        amount: values.amount,
        viewCount: values.viewCount,
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
          console.log(response1)
          console.log(data)
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
        console.log(response.data)
        setProductStateList(response.data)
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
      title="상품 카드"
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
          <DeleteModal title={'상품 카드'} open={deleteModal} handleClose={() => setDeleteModal(!deleteModal)} deleteData={deleteData} />
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
                    defaultValue={'신규 상품'}
                  >
                    {productStateList.map((option, idx) => (

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
                  <InputLabel>가격</InputLabel>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    placeholder="가격"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helpertext={formik.touched.price && formik.errors.price}
                    type={'number'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>재고</InputLabel>
                  <TextField
                    fullWidth
                    id="amount"
                    name="amount"
                    placeholder="재고"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helpertext={formik.touched.amount && formik.errors.amount}
                    type={'number'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} style={{ display: isInsert ? 'none' : 'block' }}>
                <Stack spacing={1.25}>
                  <InputLabel>조회수</InputLabel>
                  <TextField
                    fullWidth
                    id="viewCount"
                    name="viewCount"
                    placeholder="조회수"
                    value={formik.values.viewCount}
                    onChange={formik.handleChange}
                    error={formik.touched.viewCount && Boolean(formik.errors.viewCount)}
                    helpertext={formik.touched.viewCount && formik.errors.viewCount}
                    type={'number'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel>설명</InputLabel>
                  <TextField
                    fullWidth
                    id="desc"
                    name="desc"
                    placeholder="설명"
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
                    format="YYYY-MM-DD"
                    onChange={(date) => {
                      formik.setFieldValue('createDate', date);
                    }}
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

ProductDetailModal.propTypes = {
  selectedData: PropTypes.any,
  handleReload: PropTypes.func,
  handleOpen: PropTypes.func
};
export default ProductDetailModal;
