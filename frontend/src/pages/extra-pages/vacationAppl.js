// 휴가신청
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Grid, Button, Stack, Dialog } from '@mui/material';

// third-party
import { useTable, useSortBy, useBlockLayout } from 'react-table';

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';
import { useSelector } from 'store';
import { DefaultColumnFilter } from 'utils/react-table';

import { dispatchRetrieve } from 'store/reducers/vacation';
import { dispatch } from 'store';
import { PopupTransition } from 'components/@extended/Transitions';
import Approval from 'sections/extra-pages/Approval';

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

function ReactTable({ columns, data, getHeaderProps, handleRowClick, handleAdd }) {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      minWidth: 80,
      width: 150,
      maxWidth: 400
    }),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useSortBy,
    useBlockLayout
  );

  return (
    <Stack spacing={10}>
      <MainCard
        title="휴가신청내역"
        content={false}
        secondary={
          <>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={(e) => handleAdd(e.target.value)} value="new">
                신청
              </Button>
              <CSVExport data={data} filename={'vacationAppl.csv'} />
            </Stack>
          </>
        }
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
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <TableRow key={index} {...row.getRowProps()} onClick={() => handleRowClick(row.original)} sx={{ cursor: 'pointer' }}>
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
          </TableWrapper>
        </ScrollX>
      </MainCard>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func
};

const Employee = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (originalData) => {
    setSelectedRow(originalData);
    handleAdd();
  };

  const handleAdd = (value) => {
    if (value) setSelectedRow(null);
    setAdd(!add);
  };

  const { retrieve } = useSelector((state) => state.vacationCrud);
  const data = retrieve;

  useEffect(() => {
    const retrieveCall = dispatch(dispatchRetrieve());
    Promise.all([retrieveCall]).then(() => setLoading(false));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '사번',
        accessor: 'empNo',
        dataType: 'text'
      },
      {
        Header: '성명',
        accessor: 'empNm',
        dataType: 'text'
      },
      {
        Header: '부서',
        accessor: 'orgNm',
        dataType: 'text'
      },
      {
        Header: '직위',
        accessor: 'posNm',
        dataType: 'text'
      },
      {
        Header: '직책',
        accessor: 'dutyNm',
        dataType: 'text'
      },
      {
        Header: '결재상태',
        accessor: 'applStatus',
        dataType: 'text'
      },
      {
        Header: '신청일',
        accessor: 'applDate',
        dataType: 'text'
      },
      {
        Header: '결재일',
        accessor: 'confirmDate',
        dataType: 'text'
      },
      {
        Header: '근태종류',
        accessor: 'applType',
        dataType: 'text'
      },
      {
        Header: '시작일',
        accessor: 'startDate',
        dataType: 'text'
      },
      {
        Header: '종료일',
        accessor: 'endDate',
        dataType: 'text'
      },
      {
        Header: '사용일수',
        accessor: 'useDay',
        dataType: 'text'
      },
      {
        Header: '비고',
        accessor: 'note',
        dataType: 'text'
      }
    ],
    []
  );

  const tmpApproval = [
    {
      type: '기안',
      empInfo: '곽훈도(팀장/1급)'
    },
    {
      type: '참조',
      empInfo: '민숙종(본부장/5급)'
    },
    {
      type: '참조',
      empInfo: '민숙종(본부장/5급)'
    }
  ];

  const [approval, setApproval] = useState(tmpApproval);

  if (loading) return <Loader />;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
            <Stack>사원</Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <ReactTable
            columns={columns}
            data={data}
            getHeaderProps={(column) => column.getSortByToggleProps()}
            handleRowClick={handleRowClick}
            handleAdd={handleAdd}
          />
          <Dialog
            maxWidth="md"
            TransitionComponent={PopupTransition}
            //keepMounted
            fullWidth
            onClose={handleAdd}
            open={add}
            sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
            aria-describedby="alert-dialog-slide-description"
            slotProps={{ backdrop: { style: { backgroundColor: 'rgba(255, 255, 255, 0.1)' } } }}
          >
            <Approval onCancel={handleAdd} selectedRow={selectedRow} approval={approval} setApproval={setApproval} />
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default Employee;
