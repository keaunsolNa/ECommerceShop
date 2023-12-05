import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';

// project import
import ScrollX from 'components/ScrollX';
import { GlobalFilter, renderFilterTypes } from '../utils/react-table';
import { HeaderSort } from './third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

function CommonBasicTable({ columns, data, striped, handleOpen }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [],
      hiddenColumns: ['id'],
      columnOrder: [],
      pageIndex: 0,
      pageSize: 10
    }),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, globalFilter, preGlobalFilteredRows, setGlobalFilter } = useTable({
      columns,
      data,
      filterTypes,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  return (
    <Grid style={{ display: 'flex', flexDirection: 'column' }}>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        size='middle'
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                  <HeaderSort column={column} sort />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()} {...(striped && { className: 'striped' })}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                key={i}
                onDoubleClick={() => {
                  handleOpen(row);
                }}
              >
                {row.cells.map((cell, i) => (
                  <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Grid>
  );
}


CommonBasicTable.propTypes = {
  columns: PropTypes.array,
  handleOpen: PropTypes.func,
  data: PropTypes.array,
  striped: PropTypes.bool
};

// ==============================|| REACT TABLE - BASIC ||============================== //

const CommonSortTable = ({ columns, data, striped, handleOpen }) => {
  return (
    <ScrollX>
      <CommonBasicTable columns={columns} data={data} striped={striped} handleOpen={handleOpen} />
    </ScrollX>
  );
};

CommonSortTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  columns: PropTypes.array,
  title: PropTypes.string,
  handleOpen: PropTypes.func
};

export default CommonSortTable;
