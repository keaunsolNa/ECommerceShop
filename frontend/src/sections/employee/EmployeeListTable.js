import { useMemo } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable } from 'react-table';

// project import
import ScrollX from 'components/ScrollX';

// ==============================|| REACT TABLE ||============================== //

function EmployeeListBasicTable({ columns, data, striped, rowSelect }) {
  const initialState = useMemo(
    () => ({
      filters: [],
      hiddenColumns: ['id', 'birth', 'phoneNumber', 'callNumber', 'address'],
      columnOrder: [],
      pageIndex: 0,
      pageSize: 10
    }),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                {column.render('Header')}
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
                rowSelect(row);
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
  );
}

EmployeeListBasicTable.propTypes = {
  columns: PropTypes.array,
  rowSelect: PropTypes.func,
  data: PropTypes.array,
  striped: PropTypes.bool
};

// ==============================|| REACT TABLE - BASIC ||============================== //

const EmployeeListTable = ({ columns, data, striped, rowSelect }) => {
  return (
    <ScrollX>
      <EmployeeListBasicTable columns={columns} data={data} striped={striped} rowSelect={rowSelect} />
    </ScrollX>
  );
};

EmployeeListTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  columns: PropTypes.array,
  title: PropTypes.string,
  rowSelect: PropTypes.func
};

export default EmployeeListTable;
