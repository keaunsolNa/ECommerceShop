import { useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  FormControl,
  Grid,
  List,
  ListItem,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';

// project import
import MainCard from 'components/MainCard';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const FrmBizUnitDetail = ({ row, epochToDate, retrieve }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const backColor = alpha(theme.palette.primary.lighter, 0.1);
  const [insertMode, setInertMode] = useState(false);
  const toggleInsertMode = () => {
    setInertMode(!insertMode);
  };

  const FrmBizUnitSchema = Yup.object().shape({
    unitId: Yup.string().max(255).required('unitId is required'),
    unitCd: Yup.string().max(255),
    unitNm: Yup.string().max(255),
    fullNm: Yup.string().max(255),
    ordNo: Yup.string().max(255),
    staYmd: Yup.string().max(255),
    endYmd: Yup.string().max(255),
    note: Yup.string().max(255)
  });

  const isoToKoreanDate = (isoStr) => {
    const date = new Date(isoStr);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-11 in JavaScript
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  const formik = useFormik({
    initialValues: { ...row.values, staYmd: '2023-02-02', endYmd: '2023-02-02' },
    validationSchema: FrmBizUnitSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newBizUnit = {
          id: values.id,
          unitId: values.unitId,
          unitCd: values.unitCd,
          unitNm: values.unitNm,
          fullNm: values.fullNm,
          ordNo: values.ordNo,
          staYmd: isoToKoreanDate(values.staYmd),
          endYmd: isoToKoreanDate(values.endYmd),
          note: values.note,
          localeCd: 'EN',
          modUserId: 999999999,
          modDate: '2013-08-21',
          deleteYn: 'N'
        };

        await axios
          .post('/properties/frmBizUnit', newBizUnit)
          .then(() => {
            enqueueSnackbar('데이터가 저장되었습니다.', {
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
              autoHideDuration: 1000
            });
            setSubmitting(false);
            retrieve();
          })
          .catch((error) => {
            enqueueSnackbar('데이터가 저장 실패하였습니다.', {
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
              autoHideDuration: 1000,
              variant: 'error'
            });
            setSubmitting(false);
            throw error;
          });
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
  return (
    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={12} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10 } }}>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <MainCard
              title='단위업무상세'
              secondary={
                <Stack direction={'row'} spacing={0.5}>
                  {
                    {
                      false: (
                        <Tooltip title='데이터 수정'>
                          <Button variant='contained' onClick={toggleInsertMode}>
                            수정
                          </Button>
                        </Tooltip>
                      ),
                      true: (
                        <>
                          <Tooltip title='데이터 저장'>
                            <Button
                              variant='contained'
                              onClick={() => {
                                formik.submitForm();
                              }}
                            >
                              저장
                            </Button>
                          </Tooltip>
                          <Tooltip title='데이터 수정 취소'>
                            <Button variant='contained' color='error' onClick={toggleInsertMode}>
                              취소
                            </Button>
                          </Tooltip>
                        </>
                      )
                    }[insertMode]
                  }
                </Stack>
              }
            >
              <List sx={{ py: 0 }}>
                {
                  {
                    true: (
                      <>
                        <FormikProvider value={formik}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                              <ListItem divider={!matchDownMD}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <Stack spacing={0.5}>
                                      <Typography color='secondary'>단위업무코드</Typography>
                                      <TextField
                                        {...getFieldProps('unitCd')}
                                        style={{ width: 300 }}
                                        error={Boolean(touched.unitCd && errors.unitCd)}
                                        helperText={touched.unitCd && errors.unitCd}
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Stack spacing={0.5}>
                                      <Typography color='secondary'>단위업무명</Typography>
                                      <TextField
                                        {...getFieldProps('unitNm')}
                                        style={{ width: 300 }}
                                        error={Boolean(touched.unitNm && errors.unitNm)}
                                        helperText={touched.unitNm && errors.unitNm}
                                      />
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </ListItem>
                              <ListItem divider={!matchDownMD}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <Stack spacing={0.5}>
                                      <Typography color='secondary'>영문명</Typography>
                                      <TextField
                                        {...getFieldProps('fullNm')}
                                        style={{ width: 300 }}
                                        error={Boolean(touched.fullNm && errors.fullNm)}
                                        helperText={touched.fullNm && errors.fullNm}
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Stack spacing={0.5}>
                                      <Typography color='secondary'>순번</Typography>
                                      <TextField
                                        {...getFieldProps('ordNo')}
                                        style={{ width: 300 }}
                                        error={Boolean(touched.ordNo && errors.ordNo)}
                                        helperText={touched.ordNo && errors.ordNo}
                                      />
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </ListItem>
                              <ListItem>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <Stack spacing={0.5}>
                                      <Typography color='secondary'>시작일</Typography>
                                      <FormControl sx={{ width: '100%' }}
                                                   error={Boolean(touched.staYmd && errors.staYmd)}>
                                        <DatePicker
                                          {...{ ...getFieldProps('staYmd'), value: new Date() }}
                                          format='yyyy년 MM월 dd일'
                                          onChange={(newValue) => setFieldValue('staYmd', newValue)}
                                        />
                                      </FormControl>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Stack spacing={0.5}>
                                      <Typography color='secondary'>종료일</Typography>
                                      <FormControl sx={{ width: '100%' }}
                                                   error={Boolean(touched.endYmd && errors.endYmd)}>
                                        <DatePicker
                                          {...{ ...getFieldProps('endYmd'), value: new Date() }}
                                          format='yyyy년 MM월 dd일'
                                          onChange={(newValue) => setFieldValue('endYmd', newValue)}
                                        />
                                      </FormControl>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            </Form>
                          </LocalizationProvider>
                        </FormikProvider>
                      </>
                    ),
                    false: (
                      <>
                        <ListItem divider={!matchDownMD}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color='secondary'>단위업무코드</Typography>
                                <Typography>{row.values.unitCd}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color='secondary'>단위업무명</Typography>
                                <Typography>{row.values.unitNm}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider={!matchDownMD}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color='secondary'>영문명</Typography>
                                <Typography>{row.values.fullNm}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color='secondary'>순번</Typography>
                                <Typography>{row.values.ordNo}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color='secondary'>시작일</Typography>
                                <Typography>{epochToDate(row.values.staYmd)}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={0.5}>
                                <Typography color='secondary'>종료일</Typography>
                                <Typography>{epochToDate(row.values.endYmd)}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </>
                    )
                  }[insertMode]
                }
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

FrmBizUnitDetail.propTypes = {
  row: PropTypes.any,
  epochToDate: PropTypes.func,
  retrieve: PropTypes.func
};

export default FrmBizUnitDetail;
