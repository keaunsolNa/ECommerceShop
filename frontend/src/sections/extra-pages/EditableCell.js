import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import {
  alpha,
  Box,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  useTheme
} from '@mui/material';

// third-party
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useFilters, useTable } from 'react-table';

// project import
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// import makeData from 'data/react-table';
import { DefaultColumnFilter } from 'utils/react-table';

// assets
import { CheckOutlined } from '@ant-design/icons';

const CellEdit = ({ value: initialValue, row, row: { index }, column: { id, dataType }, updateData }) => {
  const [value, setValue] = useState(initialValue);
  const [showSelect, setShowSelect] = useState(false);

  const onChange = (e) => {
    row.values[id] = e.target?.value;
    setValue(e.target?.value);
  };

  const onBlur = () => {
    row.values.rowStatus = row.original[id] !== row.values[id] ? '수정' : '조회';
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
        userInfo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required')
      });
      break;
  }

  switch (dataType) {
    case 'text':
      element = (
        <>
          <Formik
            initialValues={{
              userInfo: value
            }}
            enableReinitialize
            validationSchema={userInfoSchema}
            onSubmit={(e) => {
              console.log('Formik Submit...', e);
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
        <>
          <Select
            labelId='editable-select-status-label'
            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, svg: { display: 'none' } }}
            id='editable-select-status'
            value={value === '입력' ? '입력' : value === '수정' ? '수정' : value === '삭제' ? '삭제' : '조회'}
            onChange={onChange}
            onClick={() => console.log(value)}
          >
            <MenuItem value='조회'>
              <Chip color='default' label='조회' size='small' variant='dark' />
            </MenuItem>
            <MenuItem value='입력'>
              <Chip color='success' label='입력' size='small' variant='dark' />
            </MenuItem>
            <MenuItem value='수정'>
              <Chip color='warning' label='수정' size='small' variant='dark' />
            </MenuItem>
            <MenuItem value='삭제'>
              <Chip color='error' label='삭제' size='small' variant='dark' />
            </MenuItem>
          </Select>
        </>
      );
      break;
    case 'select':
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
            <MenuItem value='Complicated'>
              <Chip color='error' label='Complicated' size='small' variant='light' />
            </MenuItem>
            <MenuItem value='Relationship'>
              <Chip color='success' label='Relationship' size='small' variant='light' />
            </MenuItem>
            <MenuItem value='Single'>
              <Chip color='info' label='Single' size='small' variant='light' />
            </MenuItem>
          </Select>
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
    default:
      element = <span></span>;
      break;
  }
  return element;
};

// ==============================|| REACT TABLE ||============================== //

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  updateData: PropTypes.func,
  skipPageReset: PropTypes.bool
};

function ReactTable({ columns, data, updateData, skipPageReset }) {
  const theme = useTheme();
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: CellEdit
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateData
    },
    useFilters
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell key={column.id} {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow
              sx={{
                bgcolor:
                  row.values.rowStatus === '입력'
                    ? alpha(theme.palette.success.lighter, 0.9)
                    : row.values.rowStatus === '수정'
                      ? alpha(theme.palette.warning.lighter, 0.9)
                      : row.values.rowStatus === '삭제'
                        ? alpha(theme.palette.error.lighter, 0.9)
                        : 'inherit'
              }}
              key={row.id}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => (
                <TableCell key={cell.column.id} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //
const EditableCell = (props) => {
  const [data, setData] = useState(() => props.data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateData = (rowIndex, columnId, value) => {
    // we also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
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

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  return (
    <ScrollX>
      <ReactTable columns={props.columns} data={props.data} updateData={updateData} skipPageReset={skipPageReset} />
    </ScrollX>
  );
};

EditableCell.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
};

export default EditableCell;
