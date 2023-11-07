import {
  DialogContent,
  Divider,
  Grid,
  Stack,
  Typography,
  DialogTitle,
  TextField,
  InputLabel,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  useTheme,
  Button,
  Select,
  MenuItem,
  Dialog
} from '@mui/material';
import MainCard from 'components/MainCard';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import ScrollX from 'components/ScrollX';
import { useTable } from 'react-table';
import { useEffect, useMemo, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { PopupTransition } from 'components/@extended/Transitions';
import ApprovalTarget from './ApprovalTarget';

const getInitialValues = () => {
  const newFrmBizUnit = {
    applStatus: '',
    applType: '',
    empNo: '',
    empNm: '',
    useDay: '',
    startDate: '',
    endDate: '',
    note: ''
  };
  return newFrmBizUnit;
};

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Stack spacing={10}>
      <MainCard title="휴가신청내역" content={false}>
        <ScrollX>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup, index) => (
                <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <TableCell key={i}>{column.render('Header')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <TableRow key={index} {...row.getRowProps()}>
                    {row.cells.map((cell, i) => {
                      return (
                        <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollX>
      </MainCard>
    </Stack>
  );
}

function Approval({ onCancel, selectedRow, approval, setApproval }) {
  const [value, setValue] = useState('연차');
  const [add, setAdd] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dayDiff, setDayDiff] = useState(0);

  const [thisApproval, setThisApproval] = useState(approval);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateDateDifference(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateDateDifference(startDate, date);
  };

  const calculateDateDifference = (date1, date2) => {
    if (date1 && date2) {
      const timeDiff = date2 - date1;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      setDayDiff(daysDiff + 1);
    }
  };

  const handleAdd = () => {
    setAdd(!add);
  };

  const onSelectChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (selectedRow !== null) {
      console.log(selectedRow);
      setValue(selectedRow.applType);
      setStartDate(new Date(selectedRow.startDate));
      setEndDate(new Date(selectedRow.endDate));
      setDayDiff(selectedRow.useDay);
      setDisabled(true);
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '근태종류',
        accessor: 'vacType'
      },
      {
        Header: '발생',
        accessor: 'createDay'
      },
      {
        Header: '사용',
        accessor: 'useDay'
      },
      {
        Header: '잔여',
        accessor: 'remainDay'
      }
    ],
    []
  );

  const vacData = [
    {
      vacType: '연차',
      createDay: 23.0,
      useDay: 15.0,
      remainDay: 8.0
    }
  ];

  const frmBizUnitSchema = Yup.object().shape({
    unitId: Yup.string().max(255).required('unitId is required'),
    unitCd: Yup.string().max(255),
    unitNm: Yup.string().max(255),
    startDate: Yup.string().max(255),
    endDate: Yup.string().max(255),
    note: Yup.string().max(255)
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: frmBizUnitSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        const data = [
          {
            localedCd: 'KO',
            note: values.note,
            unitId: values.unitId,
            unitCd: values.unitCd,
            unitNm: values.unitNm,
            funllNm: values.unitNm,
            ordNo: 0,
            modDate: formattedDate(values.startDate),
            modUserId: 111111,
            deleteYn: 'N',
            staYmd: formattedDate(values.startDate),
            endYmd: formattedDate(values.endDate)
          }
        ];
        console.log(data);
        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });


    const { errors, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps} = formik;
    return(
        <>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <DialogTitle>결재라인</DialogTitle>
                    <Divider/>
                    <DialogContent sx={{ p: 2.5 }} >
                        <Grid container spacing={0.5}>
                            {thisApproval.map((column, i) => (
                                <Grid key={i} item xs={12} sm={2}>
                                    <MainCard>
                                        <Typography>{column.type}</Typography>
                                        <Typography>{column.empInfo}</Typography>
                                    </MainCard>
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogContent>
                        <Grid>
                            <ReactTable columns={columns} data={vacData} />
                            <MainCard title="휴가 신청서">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <InputLabel>신청자</InputLabel>
                                        <TextField disabled fullWidth value={selectedRow !== null ? selectedRow.empNm : '곽훈도'} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel>근태종류</InputLabel>
                                        <Select
                                            labelId="editable-select-status-label"
                                            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, svg: { display: 'none' } }}
                                            id="editable-select-status"
                                            disabled={disabled}
                                            value={value}
                                            onChange={onSelectChange}
                                            //onBlur={onBlur}
                                        >
                                            <MenuItem value="연차">
                                            <InputLabel>연차</InputLabel>
                                            </MenuItem>
                                            <MenuItem value="반차">
                                            <InputLabel>반차</InputLabel>
                                            </MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel>근태기간</InputLabel>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack direction='row'>
                                            <DatePicker
                                                id={'startDate'}
                                                format='yyyy-MM-dd'
                                                disabled={disabled}
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                sx={{
                                                '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 90 } },
                                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                                }}
                                            />
                                            <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>~</InputLabel>
                                            <DatePicker
                                                id={'endDate'}
                                                format='yyyy-MM-dd'
                                                disabled={disabled}
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                sx={{
                                                '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 90 } },
                                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                                }}
                                            />
                                            <InputLabel sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                사용일수({dayDiff})
                                            </InputLabel>
                                            </Stack>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel>비고</InputLabel>
                                        <TextField disabled={disabled} fullWidth value={selectedRow !== null ? selectedRow.note : null} />
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                    </DialogContent>
                    {selectedRow === null ? (
                        <>
                            <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" sx={{'width' : '120px'}} onClick={handleAdd}>결재자지정</Button>
                                    <Button variant="contained" sx={{'width' : '120px'}}>임시저장</Button>
                                    <Button variant="contained" sx={{'width' : '120px'}}>기안</Button>
                                    <Button variant="contained" sx={{'width' : '120px'}} onClick={onCancel}>닫기</Button>
                                </Stack>
                                <Dialog
                                    maxWidth="md"
                                    TransitionComponent={PopupTransition}
                                    keepMounted
                                    fullWidth
                                    onClose={handleAdd}
                                    open={add}
                                    sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <ApprovalTarget onCancel={handleAdd} setThisApproval={setThisApproval}/>
                                </Dialog>
                            </DialogContent>
                        </> 
                    ) : (<></>)
                    }
                </Form>
            </FormikProvider>
        </>
    );
}

export default Approval;
