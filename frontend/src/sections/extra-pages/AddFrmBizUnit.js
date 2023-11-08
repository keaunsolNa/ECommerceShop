import PropTypes from 'prop-types';

// material-ui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

// project imports
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

// assets

// constant
const getInitialValues = () => {
  const newBizUnit = {
    unitId: '',
    unitCd: '',
    unitNm: '',
    fullNm: '',
    ordNo: '',
    staYmd: '',
    endYmd: '',
    note: '',
    localeCd: 'EN',
    modUserId: 999999999,
    modDate: '2013-08-21 18:32:52',
    deleteYn: 'N'
  };

  return newBizUnit;
};

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddFrmBizUnit = ({ onCancel, data, setData, retrieve }) => {
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
    initialValues: getInitialValues(),
    validationSchema: FrmBizUnitSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newBizUnit = {
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
        // dispatch(createCustomer(newCustomer)); - add
        await axios
          .post('/properties/frmBizUnit/multi', [newBizUnit])
          .then(() => {
            enqueueSnackbar('데이터가 저장되었습니다.', {
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
              autoHideDuration: 1000
            });
            setSubmitting(false);
            console.log(setData, data);
            onCancel();
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>단위업무관리 추가</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container paddingX={15}>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="unitid">UNITID</InputLabel>
                        <TextField
                          fullWidth
                          id="UNITID"
                          placeholder="Enter UNITID"
                          {...getFieldProps('unitId')}
                          error={Boolean(touched.unitId && errors.unitId)}
                          helperText={touched.unitId && errors.unitId}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="unitCd">단위업무코드</InputLabel>
                        <TextField
                          fullWidth
                          id="unitCd"
                          placeholder="Enter unitCd"
                          {...getFieldProps('unitCd')}
                          error={Boolean(touched.unitCd && errors.unitCd)}
                          helperText={touched.unitCd && errors.unitCd}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="unitNm">단위업무명</InputLabel>
                        <TextField
                          fullWidth
                          id="unitNm"
                          placeholder="Enter unitNm"
                          {...getFieldProps('unitNm')}
                          error={Boolean(touched.unitNm && errors.unitNm)}
                          helperText={touched.unitNm && errors.unitNm}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="fullNm">영문명</InputLabel>
                        <TextField
                          fullWidth
                          id="fullNm"
                          placeholder="Enter fullNm"
                          {...getFieldProps('fullNm')}
                          error={Boolean(touched.fullNm && errors.fullNm)}
                          helperText={touched.fullNm && errors.fullNm}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="ordNo">순번</InputLabel>
                        <TextField
                          fullWidth
                          id="ordNo"
                          placeholder="Enter ordNo"
                          {...getFieldProps('ordNo')}
                          error={Boolean(touched.ordNo && errors.ordNo)}
                          helperText={touched.ordNo && errors.ordNo}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="staYmd">시작일</InputLabel>
                        <FormControl sx={{ width: '100%' }} error={Boolean(touched.staYmd && errors.staYmd)}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker format="yyyy년 MM월 dd일" onChange={(newValue) => setFieldValue('staYmd', newValue)} />
                          </LocalizationProvider>
                        </FormControl>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="endYmd">종료일</InputLabel>
                        <FormControl sx={{ width: '100%' }} error={Boolean(touched.endYmd && errors.endYmd)}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker format="yyyy년 MM월 dd일" onChange={(newValue) => setFieldValue('endYmd', newValue)} />
                          </LocalizationProvider>
                        </FormControl>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="note">비고</InputLabel>
                        <TextField
                          fullWidth
                          id="note"
                          placeholder="Enter note"
                          {...getFieldProps('note')}
                          error={Boolean(touched.note && errors.note)}
                          helperText={touched.note && errors.note}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
    </>
  );
};

AddFrmBizUnit.propTypes = {
  onCancel: PropTypes.func,
  data: PropTypes.array,
  setData: PropTypes.func,
  retrieve: PropTypes.func
};

export default AddFrmBizUnit;
