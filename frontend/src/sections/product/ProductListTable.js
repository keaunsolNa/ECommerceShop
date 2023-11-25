import { useMemo } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable } from 'react-table';

// project import
import ScrollX from 'components/ScrollX';

// ==============================|| REACT TABLE ||============================== //

function ProductListBasicTable({ columns, data, striped, handleOpen }) {
  const initialState = useMemo(
    () => ({
      filters: [],
      hiddenColumns: ['id', 'fileId'],
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
  );
}

ProductListBasicTable.propTypes = {
  columns: PropTypes.array,
  handleOpen: PropTypes.func,
  data: PropTypes.array,
  striped: PropTypes.bool
};

// ==============================|| REACT TABLE - BASIC ||============================== //

const ProductListTable = ({ columns, data, striped, handleOpen }) => {
  return (
    <ScrollX>
      <ProductListBasicTable columns={columns} data={data} striped={striped} handleOpen={handleOpen} />
    </ScrollX>
  );
};

ProductListTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  columns: PropTypes.array,
  handleOpen: PropTypes.func
};

export default ProductListTable;
