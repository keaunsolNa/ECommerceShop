import {
  DialogContent,
  Divider,
  Grid,
  Stack,
  Typography,
  DialogTitle,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  useTheme,
  Button,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import MainCard from 'components/MainCard';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import ScrollX from 'components/ScrollX';
import { useTable } from 'react-table';
import { useMemo, useState } from 'react';

const getInitialValues = () => {
  const newFrmBizUnit = {
    unitId: '',
    unitCd: '',
    unitNm: '',
    startDate: '',
    endDate: '',
    note: ''
  };
  return newFrmBizUnit;
};

const CustomCell = ({ value: initialValue, row: { index, values }, column: { id, dataType }, update }) => {
  const [value, setValue] = useState(initialValue);
  const onSelectChange = (e) => {
    console.log(values);
    setValue(e.target?.value);
  };
  const onBlur = () => {
    update(index, id, value);
  };

  let element;
  switch (dataType) {
    case 'select':
      element = (
        <>
          <Select
            labelId="editable-select-status-label"
            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, svg: { display: 'none' } }}
            id="editable-select-status"
            value={value}
            onChange={onSelectChange}
            onBlur={onBlur}
          >
            <MenuItem value="기안">
              <Chip color="error" label="기안" size="small" variant="light" />
            </MenuItem>
            <MenuItem value="결재">
              <Chip color="success" label="결재" size="small" variant="light" />
            </MenuItem>
            <MenuItem value="참조">
              <Chip color="info" label="참조" size="small" variant="light" />
            </MenuItem>
          </Select>
        </>
      );
      break;
    default:
      element = <span></span>;
      break;
  }

  return element;
};

function ReactTable({ columns, data, onRowClick, selectedRowIndex }) {
  const theme = useTheme();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Stack spacing={10}>
      <MainCard title="사원목록" content={false}>
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
                  <TableRow
                    key={index}
                    onClick={() => onRowClick(row.original, index, selectedRowIndex)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: selectedRowIndex === index ? '#e6ebf1' : 'white',
                      border: selectedRowIndex === index ? '2px solid #e6ebf1' : '1px solid #e6ebf1'
                    }}
                    {...row.getRowProps()}
                  >
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

function ReactTable2({ columns, data, onSelectChange, update }) {
  const theme = useTheme();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    onSelectChange,
    update
  });

  return (
    <Stack spacing={10}>
      <MainCard title="결재라인" content={false}>
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

function ApprovalTarget({ onCancel, setThisApproval }) {
  const [value, setValue] = useState('02');

  const onSelectChange = (e) => {
    setValue(e.target.value);
  };

  const columns = useMemo(
    () => [
      {
        Header: '사번',
        accessor: 'empNo'
      },
      {
        Header: '사원정보',
        accessor: 'empInfo'
      }
    ],
    []
  );
  const columns2 = useMemo(
    () => [
      {
        Header: '승인상태',
        accessor: 'type',
        dataType: 'select',
        Cell: CustomCell
      },
      {
        Header: '사원정보',
        accessor: 'empInfo'
      }
    ],
    []
  );
  const data = [
    {
      empNo: '0241',
      empInfo: '곽훈도(팀장/1급)'
    },
    {
      empNo: '0241',
      empInfo: '곽훈도(팀장/2급)'
    },
    {
      empNo: '0241',
      empInfo: '곽훈도(팀장/3급)'
    },
    {
      empNo: '0241',
      empInfo: '곽훈도(팀장/4급)'
    },
    {
      empNo: '0241',
      empInfo: '곽훈도(팀장/5급)'
    },
    {
      empNo: '0241',
      empInfo: '곽훈도(팀장/6급)'
    }
  ];

  const data2 = [
    {
      type: '기안',
      empInfo: '곽훈도(팀장/1급)'
    },
    {
      type: '기안',
      empInfo: '곽훈도(팀장/2급)'
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

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataToMove, setDataToMove] = useState(data2);

  const handleRowClick = (originalData, index, selectedRowIndex) => {
    setSelectedRowIndex(index);
    setSelectedRow(originalData);
    if (index == selectedRowIndex) {
      setSelectedRowIndex(-1);
      setSelectedRow(null);
    }
  };

  const handleMoveToAnotherTable = (e) => {
    console.log(e.target.value);
    if (selectedRow) {
      let isAdd = true;
      dataToMove.map((value) => {
        if (value.empInfo === selectedRow.empInfo) {
          isAdd = false;
          return;
        } else {
          selectedRow.type = e.target.value;
        }
      });
      if (isAdd) setDataToMove([...dataToMove, selectedRow]);
      setSelectedRow(null);
    }
  };

  const updateApproval = (rowIndex, columnId, value) => {
    setDataToMove((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  const applyApproval = () => {
    setThisApproval(dataToMove);
    onCancel();
  };

  const { errors, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                결재라인
              </Typography>
              <Button variant="contained" sx={{ width: '80px' }} onClick={applyApproval}>
                적용
              </Button>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={0.5}>
              <Grid item xs={12} sm={5.5}>
                <ReactTable columns={columns} data={data} onRowClick={handleRowClick} selectedRowIndex={selectedRowIndex} />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack direction="column" spacing={1}>
                  <Button variant="contained" sx={{ width: '80px' }} onClick={handleMoveToAnotherTable} value="기안">
                    기안
                  </Button>
                  <Button variant="contained" sx={{ width: '80px' }} onClick={handleMoveToAnotherTable} value="결재">
                    결재
                  </Button>
                  <Button variant="contained" sx={{ width: '80px' }} onClick={handleMoveToAnotherTable} value="참조">
                    참조
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={5.5}>
                <ReactTable2 columns={columns2} data={dataToMove} onSelectChange={onSelectChange} update={updateApproval} />
              </Grid>
            </Grid>
          </DialogContent>
        </Form>
      </FormikProvider>
    </>
  );
}

export default ApprovalTarget;
