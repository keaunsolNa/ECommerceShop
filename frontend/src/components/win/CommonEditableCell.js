import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { alpha, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, useTheme } from '@mui/material';
// third-party

// project import
import ScrollX from 'components/ScrollX';
import { HeaderSort } from '../third-party/ReactTable';
import CommonModal from './CommonModal';

// assets

// ==============================|| REACT TABLE ||============================== //

ReactTable.propTypes = {
  tableType: PropTypes.object,
  getTableProps: PropTypes.func,
  getTableBodyProps: PropTypes.func,
  headerGroups: PropTypes.array,
  prepareRow: PropTypes.func,
  rows: PropTypes.array,
  footerGroups: PropTypes.array,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func
};

function ReactTable({
  tableType,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  rows,
  footerGroups,
  openModal,
  setOpenModal
}) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handlerModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers
                .filter((item) => !item.hidden)
                .map((column) => (
                  <TableCell key={column.id} {...column.getHeaderProps()}>
                    {tableType.sort ? <HeaderSort column={column} sort /> : column.render('Header')}
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
                    row.values['rowStatus'] === '입력'
                      ? alpha(theme.palette.primary.lighter, 0.9)
                      : row.values['rowStatus'] === '수정'
                      ? alpha(theme.palette.warning.lighter, 0.9)
                      : row.values['rowStatus'] === '삭제'
                      ? alpha(theme.palette.error.lighter, 0.9)
                      : 'inherit'
                }}
                key={row.id}
                {...row.getRowProps()}
              >
                {row.cells
                  .filter((item) => !item.column.hidden)
                  .map((cell) => (
                    <TableCell
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      onClick={() => {
                        setSelectedIndex(row.values[cell.column.modalUUID]);
                        setSelectedComponent(cell.column.modalComponent);
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter sx={{ borderBottomWidth: 2 }}>
          {footerGroups.map((group, i) => (
            <TableRow key={i} {...group.getFooterGroupProps()}>
              {group.headers
                .filter((column) => !column.hidden)
                .map((column, index) => (
                  <TableCell key={index} {...column.getFooterProps([{ className: column.className }])}>
                    {column.render('Footer')}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      <CommonModal id={selectedIndex} modalData={selectedComponent} open={openModal} handleClose={handlerModalClose} />
    </>
  );
}

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //
const CommonEditableCell = (props) => {
  return (
    <ScrollX>
      <ReactTable
        tableType={props.tableType}
        getTableProps={props.getTableProps}
        getTableBodyProps={props.getTableBodyProps}
        headerGroups={props.headerGroups}
        prepareRow={props.prepareRow}
        rows={props.rows}
        footerGroups={props.footerGroups}
        openModal={props.openModal}
        setOpenModal={props.setOpenModal}
      />
    </ScrollX>
  );
};

CommonEditableCell.propTypes = {
  tableType: PropTypes.object,
  getTableProps: PropTypes.func,
  getTableBodyProps: PropTypes.func,
  headerGroups: PropTypes.array,
  prepareRow: PropTypes.func,
  rows: PropTypes.array,
  footerGroups: PropTypes.array,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func
};

export default CommonEditableCell;
