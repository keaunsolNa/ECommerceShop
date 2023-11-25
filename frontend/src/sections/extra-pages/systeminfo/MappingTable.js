import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockLayout, useSortBy, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';

import { ThemeMode } from 'config';

const TableWrapper = styled('div')(() => ({
  '.header': {
    position: 'sticky',
    zIndex: 1,
    width: 'fit-content'
  },
  '& th[data-sticky-td]': {
    position: 'sticky',
    zIndex: '5 !important'
  }
}));
const EditableRow = ({ value: initialValue, row, row: { index }, column: { dataType } }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  let element;
  switch (dataType) {
    case 'text':
      element = <>{row.original.value1 === '' || row.original.value1 === undefined ?
        <TextField id={`${index}`} size='small' /> : value}</>;
      break;
    default :
      element = <>{row.original.value1 === '' || row.original.value1 === undefined ?
        <TextField id={`${index}`} size='small' /> : value}</>;
      break;
  }
  return element;
};

function ReactTable({ columns, data, getHeaderProps, kindNm, setData }) {
  const theme = useTheme();
  const defaultColumn = useMemo(() => ({ Cell: EditableRow }));
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      kindNm,
      setData
    },
    useSortBy,
    useBlockLayout
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <TableRow
          {...row.getRowProps({
            style
          })}
        >
          {row.cells.map((cell, index) => {
            return (
              <TableCell
                key={index}
                sx={{
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white
                }}
                {...cell.getCellProps()}
              >
                {cell.render('Cell')}
              </TableCell>
            );
          })}
        </TableRow>
      );
    },
    [prepareRow, rows, theme]
  );

  const insertRow = () => {
    const newData = {
      header1: `${data[0]?.header1}`,
      header2: `${data[0]?.header2}`,
      header3: `${data[0]?.header3}`,
      header4: `${data[0]?.header4}`,
      header5: `${data[0]?.header5}`,
      header6: `${data[0]?.header6}`,
      header7: `${data[0]?.header7}`,
      header8: `${data[0]?.header8}`,
      header9: `${data[0]?.header9}`,
      header10: `${data[0]?.header10}`,
      header11: `${data[0]?.header11}`,
      header12: `${data[0]?.header12}`,
      header13: `${data[0]?.header13}`,
      header14: `${data[0]?.header14}`,
      header15: `${data[0]?.header15}`,
      header16: `${data[0]?.header16}`,
      header17: `${data[0]?.header17}`,
      header18: `${data[0]?.header18}`,
      header19: `${data[0]?.header19}`,
      header20: `${data[0]?.header20}`,
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      value15: '',
      value16: '',
      value17: '',
      value18: '',
      value19: '',
      value20: ''
    };
    const keysToCheck = Object.keys(newData);
    const filteredKeys = keysToCheck.filter((key) => data[key] === undefined);
    const resultData = Object.fromEntries(filteredKeys.map((key) => [key, newData[key]]));
    const insertData = [resultData, ...data];
    setData(insertData);
    // console.log('data is ...', data);
    // console.log('data is ...', resultData);
  };
  // Render the UI for your table
  return (
    <Stack spacing={10}>
      <Stack direction='row' justifyContent='space-between' sx={{ p: 0, pb: 0 }}>
        <MainCard
          title={kindNm}
          content={false}
          secondary={
            <>
              <Button onClick={insertRow}>입력</Button>
              {/* <Button onClick={toggleEditable}>수정</Button> */}
              <Button
                color='success'
                onClick={() => {
                  console.log('저장 완료');
                }}
              >
                저장
              </Button>
              <CSVExport data={data} filename='업무기준관리.csv' />
            </>
          }
          sx={{ maxWidth: 1205 }}
        >
          <ScrollX>
            <TableWrapper>
              <Table {...getTableProps()} stickyHeader>
                <TableHead>
                  {headerGroups.map((headerGroup, index) => (
                    <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, i) => (
                        <TableCell
                          key={i}
                          sx={{ position: 'sticky !important' }}
                          {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                        >
                          <HeaderSort column={column} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  <FixedSizeList height={600} itemCount={rows.length} itemSize={50} width='100%'>
                    {RenderRow}
                  </FixedSizeList>
                </TableBody>
              </Table>
            </TableWrapper>
          </ScrollX>
          <Button
            onClick={() => {
              console.log('rows is ...', rows);
            }}
          >
            test
          </Button>
        </MainCard>
      </Stack>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  kindNm: PropTypes.string
};

const StatusCell = ({ value }) => {
  switch (value) {
    case 'Complicated':
      return <Chip color='error' label='Complicated' size='small' variant='light' />;
    case 'Relationship':
      return <Chip color='success' label='Relationship' size='small' variant='light' />;
    case 'Single':
    default:
      return <Chip color='info' label='Single' size='small' variant='light' />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.string
};

const ProgressCell = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

ProgressCell.propTypes = {
  value: PropTypes.number
};

function MappingTable(props) {
  const originalId = props.originalId;
  const [kindNm, setKindNm] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    setData(props.data.filter((item) => item.id === originalId)[0].key);
    setKindNm(props.data.filter((item) => item.id === originalId)[0].kindNm);
  }, [originalId]);
  const columns = useMemo(
    () => [
      {
        Header: `${data[0]?.header1}`,
        accessor: 'value1',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header2}`,
        accessor: 'value2',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header3}`,
        accessor: 'value3',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header4}`,
        accessor: 'value4',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header5}`,
        accessor: 'value5',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header6}`,
        accessor: 'value6',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header7}`,
        accessor: 'value7',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header8}`,
        accessor: 'value8',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header9}`,
        accessor: 'value9',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header10}`,
        accessor: 'value10',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header11}`,
        accessor: 'value11',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header12}`,
        accessor: 'value12',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header13}`,
        accessor: 'value13',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header14}`,
        accessor: 'value14',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header15}`,
        accessor: 'value15',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header16}`,
        accessor: 'value16',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header17}`,
        accessor: 'value17',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header18}`,
        accessor: 'value18',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header19}`,
        accessor: 'value19',
        dataType: 'text'
      },
      {
        Header: `${data[0]?.header20}`,
        accessor: 'value20',
        dataType: 'text'
      }
    ],
    [data]
  );
  const filteredColumns = columns.filter((column) => column.Header !== `${undefined}`);
  // console.log('filteredColumns Is...', filteredColumns);
  return (
    <ReactTable
      columns={filteredColumns}
      data={data}
      getHeaderProps={(column) => column.getSortByToggleProps()}
      kindNm={kindNm}
      setData={setData}
    />
  );
}

export default MappingTable;
