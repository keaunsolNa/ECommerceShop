import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useSortBy, useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import InfiniteScroll from 'react-infinite-scroll-component';

// project import
import ScrollX from 'components/ScrollX';
import { HeaderSort } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import { ThemeMode } from 'config';

// ==============================|| REACT TABLE ||============================== //

// table style
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

function ReactTable({ columns, data, update, height, getHeaderProps, setSelected }) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 80,
      width: 100,
      maxWidth: 400
    }),
    []
  );
  const theme = useTheme();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useSortBy,
    useSticky
  );

  const sortingRow = rows;
  let sortedData = sortingRow.map((d) => d.original);
  Object.keys(sortedData).forEach((key) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);
  return (
    <Stack spacing={10}>
      <ScrollX sx={{ height: height }} id='scrollableDiv'>
        <InfiniteScroll
          dataLength={rows.length}
          next={update}
          hasMore={true}
          loader={<h4>Loading more 20 items...</h4>}
          scrollThreshold={0.5}
          scrollableTarget='scrollableDiv'
        >
          <TableWrapper>
            <Table {...getTableProps()} stickyHeader>
              <TableHead>
                {headerGroups.map((headerGroup, index) => (
                  <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => {
                      return (
                        <TableCell
                          key={i}
                          sx={{ position: 'sticky !important' }}
                          {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                        >
                          <HeaderSort column={column} />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <TableRow key={index} {...row.getRowProps()}
                              onClick={() => (setSelected ? setSelected(row.values.id) : null)}>
                      {row.cells.map((cell, i) => {
                        return (
                          <TableCell
                            key={i}
                            sx={{
                              backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white
                            }}
                            {...cell.getCellProps([{ className: cell.column.className }])}
                          >
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
        </InfiniteScroll>
      </ScrollX>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  update: PropTypes.func,
  getHeaderProps: PropTypes.func
};

// ==============================|| REACT TABLE - STICKY ||============================== //

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

const VirtualizedInfiniteScrollTable = ({ data, columns, fetchMoreData, height, setSelected }) => {
  const memoizedData = useMemo(() => data, [data]);

  const memoizedColumns = useMemo(() => columns, [columns]);

  return (
    <ReactTable
      columns={memoizedColumns}
      data={memoizedData}
      update={fetchMoreData}
      height={height}
      setSelected={setSelected}
      getHeaderProps={(column) => column.getSortByToggleProps()}
    />
  );
};

export default VirtualizedInfiniteScrollTable;
