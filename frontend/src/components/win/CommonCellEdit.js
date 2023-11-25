import React, { useEffect, useState } from 'react';

// material-ui
import { Box, Chip, IconButton, MenuItem, Select, Slider, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CheckOutlined } from '@ant-design/icons';

// third-party
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { format, parseISO } from 'date-fns';

// project import
// assets
import LinearWithLabel from '../@extended/progress/LinearWithLabel';

const CommonCellEdit = ({
                          value: initialValue,
                          originalData,
                          rows,
                          row: { index, values },
                          column: { id, dataType },
                          updateData,
                          columns,
                          setOpenModal
                        }) => {
  const [value, setValue] = useState(initialValue);
  const [showSelect, setShowSelect] = useState(false);
  const comboList = new Map();
  columns
    .filter((item) => item.dataType === 'select')
    .map((column) => {
      comboList.set(column.id, column.valueList);
    }, {});

  const onChange = (e) => {
    setValue(e.target?.value);
    values[id] = e.target?.value;
  };

  const compareObjects = (obj1, obj2) => {
    let setStatus;
    const keysToIgnore = ['id', 'no', 'uuid', 'rowStatus'];
    for (const key in obj1) {
      if (!keysToIgnore.includes(key)) {
        setStatus = JSON.stringify(obj1[key]) === JSON.stringify(obj2[key]) ? '조회' : '수정';
        if (setStatus === '수정') {
          break;
        }
      }
    }
    return setStatus;
  };

  const onBlur = () => {
    let setStatus;
    if (values['rowStatus'] !== '입력') {
      setStatus = compareObjects(originalData[index], values);
      rows[index].original['rowStatus'] = setStatus;
    }

    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  let element;
  let userInfoSchema;
  switch (id) {
    case 'email':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().email('Enter valid email ').required('Email is a required field')
      });
      break;
    case 'age':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number()
          .typeError('Age must be number')
          .required('Age is required')
          .min(18, 'You must be at least 18 years')
          .max(100, 'You must be at most 60 years')
      });
      break;
    case 'visits':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number().typeError('Visits must be number').required('Required')
      });
      break;
    default:
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string()
      });
      break;
  }

  switch (dataType) {
    case 'no':
      element = (
        <>
          <Formik
            initialValues={{
              userInfo: value
            }}
            enableReinitialize
            validationSchema={userInfoSchema}
            onSubmit={() => {
            }}
          >
            {({ handleBlur, errors, touched }) => (
              <Form>
                <TextField
                  value={`${index + 1}`}
                  id={`${index}-${id}`}
                  name='userInfo'
                  disabled
                  onBlur={(e) => {
                    handleBlur(e);
                    onBlur(e);
                  }}
                  error={touched.userInfo && Boolean(errors.userInfo)}
                  helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                  sx={{
                    '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 80 } },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                  }}
                />
              </Form>
            )}
          </Formik>
        </>
      );
      break;
    case 'rowStatus':
      element = (
        <TextField
          value={values['rowStatus']}
          id={`${index}-${id}`}
          name='rowStatus'
          sx={{
            '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 80 } },
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
          }}
        />
      );
      break;
    case 'text':
      element = (
        <>
          <Formik
            initialValues={{
              userInfo: value
            }}
            enableReinitialize
            validationSchema={userInfoSchema}
            onSubmit={() => {
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <TextField
                  value={values.userInfo}
                  id={`${index}-${id}`}
                  name='userInfo'
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    onBlur(e);
                  }}
                  error={touched.userInfo && Boolean(errors.userInfo)}
                  helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                  sx={{
                    '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: 'auto', maxWidth: 120 },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                  }}
                />
              </Form>
            )}
          </Formik>
        </>
      );
      break;
    case 'select':
      element = (
        <>
          <Formik
            initialValues={{
              userInfo: value
            }}
            enableReinitialize
            validationSchema={userInfoSchema}
            onSubmit={() => {
            }}
          >
            {({ values }) => (
              <Form>
                <Select
                  value={values.userInfo === '입력' ? '' : values.userInfo}
                  id={`${index}-combo`}
                  onChange={(e) => {
                    onChange(e);
                    if (rows[index].values.rowStatus !== '입력') {
                      rows[index]['rowStatus'] = '수정';
                      originalData[index]['rowStatus'] = '수정';
                    }
                    updateData(index, id, value);
                  }}
                >
                  {comboList.get(id).map((option) => (
                    <MenuItem key={option} value={option} id={`${index}-${id}`}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Form>
            )}
          </Formik>
        </>
      );
      break;
    case 'date':
      element = (
        <>
          <Formik
            initialValues={{
              userInfo: value
            }}
            enableReinitialize
            validationSchema={userInfoSchema}
            onSubmit={() => {
            }}
          >
            {({ values, errors, touched }) => (
              <Form>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id={`${index}-${id}`}
                    name='userInfo'
                    format='yyyy-MM-dd'
                    value={parseISO(values.userInfo)}
                    onChange={(newValue) => {
                      const formattedDate = format(newValue, 'yyyy-MM-dd');
                      setValue(formattedDate);
                      values[id] = formattedDate;
                      if (rows[index].values.rowStatus !== '입력') {
                        rows[index]['rowStatus'] = '수정';
                        originalData[index]['rowStatus'] = '수정';
                      }
                      updateData(index, id, value);
                    }}
                    error={touched.userInfo && Boolean(errors.userInfo)}
                    helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                    sx={{
                      '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 80 } },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                    }}
                  />
                </LocalizationProvider>
              </Form>
            )}
          </Formik>
        </>
      );
      break;
    case 'boolean':
      element = (
        <>
          <Select
            labelId='editable-select-status-label'
            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, svg: { display: 'none' } }}
            id='editable-select-status'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            <MenuItem value='true'>
              <Chip color='success' label='예' size='small' variant='light' />
            </MenuItem>
            <MenuItem value='false'>
              <Chip color='error' label='아니오' size='small' variant='light' />
            </MenuItem>
          </Select>
        </>
      );
      break;
    case 'progress':
      element = (
        <>
          {!showSelect ? (
            <Box onClick={() => setShowSelect(true)}>
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            </Box>
          ) : (
            <>
              <Stack direction='row' alignItems='center' spacing={1} sx={{ pl: 1, minWidth: 120 }}>
                <Slider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onBlur={onBlur}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay='auto'
                  aria-labelledby='non-linear-slider'
                />
                <Tooltip title={'Submit'}>
                  <IconButton onClick={() => setShowSelect(false)}>
                    <CheckOutlined />
                  </IconButton>
                </Tooltip>
              </Stack>
            </>
          )}
        </>
      );
      break;
    case 'modalBtn':
      element = (
        <IconButton
          color='primary'
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Typography>확인</Typography>
        </IconButton>
      );
      break;
    default:
      element = <span></span>;
      break;
  }
  return element;
};

export default CommonCellEdit;
