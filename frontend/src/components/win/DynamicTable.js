import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { dispatch } from '../../store';
// material-ui
import { Button, Grid, Stack } from '@mui/material';

// third-party
// project import
import { CSVExport } from 'components/third-party/ReactTable';
import MainCard from 'components/MainCard';
import CommonCellEdit from './CommonCellEdit';
import CommonEditableCell from './CommonEditableCell';
import { getDate } from 'utils/common';
import { DefaultColumnFilter, GlobalFilter, renderFilterTypes } from '../../utils/react-table';
import { update } from '../../store/reducers/emp/employee';

// assets
const DynamicTable = ({ name, columns, data, tableType }) => {
  const [dataValue, setDataValue] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: CommonCellEdit
    }),
    []
  );
  const updateData = (rowIndex, columnId, dataValue) => {
    setDataValue((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            rowStatus: '수정',
            ...old[rowIndex],
            [columnId]: dataValue
          };
        }
        return row;
      })
    );
  };
  const save = () => {
    if (dataValue === originalData) return;
    const updateData = dataValue
      .filter((item) => item.rowStatus !== '삭제')
      .map((item) => {
        // eslint-disable-next-line no-unused-vars
        const { rowStatus, no, ...rest } = item;
        return rest;
      });
    dispatch(update(tableType.reducer.updateReducer, updateData));
  };

  const addRow = () => {
    const newRow = columns.reduce((acc, column) => {
      acc[column.accessor] = '입력';
      return acc;
    }, {});

    const updateData = [...dataValue, newRow];

    setDataValue(updateData);
    setOriginalData(updateData);
  };

  useEffect(() => {
    const updatedDataValue = data.map((item, index) => ({
      rowStatus: '조회',
      no: index,
      ...item
    }));
    setDataValue(updatedDataValue);
    setOriginalData(updatedDataValue);
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    footerGroups,
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      originalData,
      data: dataValue,
      defaultColumn,
      updateData,
      filterTypes,
      setOpenModal
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard
          title={name}
          content={false}
          secondary={
            <Stack direction={'row'} spacing={2}>
              {tableType.search ? (
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                  size='middle'
                />
              ) : null}
              {tableType.input ? (
                <Button color='success' variant='outlined' onClick={() => addRow()}>
                  입력
                </Button>
              ) : null}
              {tableType.save ? (
                <Button variant='outlined' onClick={() => save()}>
                  저장
                </Button>
              ) : null}
              {tableType.download ? <CSVExport data={data} filename={`${name}${getDate()}.csv`} /> : null}
            </Stack>
          }
        >
          <CommonEditableCell
            tableType={tableType}
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            prepareRow={prepareRow}
            rows={rows}
            footerGroups={footerGroups}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

DynamicTable.propTypes = {
  name: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  tableType: PropTypes.object
};

export default DynamicTable;
