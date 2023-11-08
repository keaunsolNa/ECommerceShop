import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from '@mui/material';

// third-party
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import update from 'immutability-helper';

import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';

// project import
import {
  CSVExport,
  DraggableHeader,
  DragPreview,
  EmptyTable,
  HeaderSort,
  HidingSelect,
  IndeterminateCheckbox,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import FrmBizUnitDetail from 'sections/extra-pages/FrmBizUnitDetail';

import { ThemeMode } from 'config';
import { DefaultColumnFilter, GlobalFilter, renderFilterTypes } from 'utils/react-table';

// assets
import { EditTwoTone, GroupOutlined, SendOutlined, UngroupOutlined } from '@ant-design/icons';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { PopupTransition } from 'components/@extended/Transitions';
import AddFrmBizUnit from 'sections/extra-pages/AddFrmBizUnit';

const epochToDate = (epochTime) => {
  const date = new Date(epochTime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11 in JavaScript
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const EditableRow = ({ value: initialValue, row: { index, values }, column: { id, dataType }, editableRowIndex }) => {
  const dateColumns = ['staYmd', 'endYmd', 'modDate'];
  const [value, setValue] = useState(dateColumns.includes(id) ? epochToDate(initialValue) : initialValue);
  const theme = useTheme();
  const onChange = (e) => {
    e.stopPropagation();
    setValue(e.target.value);
    values[id] = e.target.value;
  };

  let element;
  let userInfoSchema;
  switch (id) {
    default:
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required')
      });
      break;
  }
  let IsEditAble = values.id === undefined || editableRowIndex.includes(values.id);

  switch (dataType) {
    case 'text':
      element = (
        <>
          {IsEditAble ? (
            <>
              <Formik
                initialValues={{
                  userInfo: value
                }}
                enableReinitialize
                validationSchema={userInfoSchema}
                onSubmit={(e) => {
                  console.log(e);
                }}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <TextField
                      value={values.userInfo || ''}
                      id={`${index}-${id}`}
                      name="userInfo"
                      onChange={(e) => {
                        handleChange(e);
                        onChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.userInfo && Boolean(errors.userInfo)}
                      helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          py: 0.75,
                          px: 1,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                        }
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            value
          )}
        </>
      );
      break;
    default:
      element = <span>{value}</span>;
      break;
  }
  return element;
};

// ==============================|| REACT TABLE ||============================== //

const ColumnCell = ({ row, setEditableRowIndex, editableRowIndex }) => (
  <>
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title={!editableRowIndex.includes(row.values.id) ? 'Edit' : 'Save'}>
        <IconButton
          color={!editableRowIndex.includes(row.values.id) ? 'primary' : 'success'}
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = row.values.id;
            if (!editableRowIndex.includes(currentIndex)) {
              // row requested for edit access
              setEditableRowIndex([...editableRowIndex, currentIndex]);
            } else {
              // request for saving the updated row
              const staYmd = epochToDate(row.values.staYmd);
              const endYmd = epochToDate(row.values.endYmd);
              axios
                .patch('/properties/frmBizUnit', { ...row.values, staYmd, endYmd, deleteYn: 'N' })
                .then(() => {
                  enqueueSnackbar(`저장이 완료되었습니다.`, {
                    anchorOrigin: { vertical: 'top', horizontal: 'center', color: 'error' },
                    autoHideDuration: 1000
                  });
                  row.values.rowStatus = '수정';
                  setEditableRowIndex(editableRowIndex.filter((item) => item != currentIndex));
                })
                .catch((error) => {
                  enqueueSnackbar('데이터가 저장 실패하였습니다.', {
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    autoHideDuration: 1000,
                    variant: 'error'
                  });
                  console.log(error);
                });
            }
          }}
        >
          {!editableRowIndex.includes(row.values.id) ? <EditTwoTone /> : <SendOutlined />}
        </IconButton>
      </Tooltip>
    </Stack>
  </>
);

ColumnCell.propTypes = {
  row: PropTypes.object,
  setEditableRowIndex: PropTypes.func,
  editableRowIndex: PropTypes.array
};

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  retrieve: PropTypes.func,
  setData: PropTypes.func,
  isLoading: PropTypes.bool
};

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

function ReactTable({ columns, data, retrieve, setData, isLoading }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const [editableRowIndex, setEditableRowIndex] = useState([]);
  const [insertArr, setInsertArr] = useState([]);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, Cell: EditableRow }), []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      hiddenColumns: ['id'],
      sortBy: [{ id: 'unitId' }],
      columnOrder: ['selection', 'rowStatus', 'unitId', 'unitCd', 'unitNm', 'fullNm', 'ordNo', 'staYmd', 'endYmd', 'note'],
      pageIndex: 0,
      pageSize: 5
    }),
    []
  );

  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page,
    prepareRow,
    setColumnOrder,
    gotoPage,
    setPageSize,
    setHiddenColumns,
    allColumns,
    state: { globalFilter, hiddenColumns, pageIndex, pageSize, columnOrder, selectedRowIds },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      filterTypes,
      editableRowIndex,
      setEditableRowIndex,
      retrieve
    },
    useGlobalFilter,
    useFilters,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        {
          accessor: 'edit',
          id: 'edit',
          Footer: 'Edit',
          Header: 'Edit',
          disableFilters: true,
          disableSortBy: true,
          disableGroupBy: true,
          groupByBoundary: true,
          Cell: ColumnCell
        }
      ]);
    }
  );

  const reorder = (item, newIndex) => {
    const { index: currentIndex } = item;

    let dragRecord = columnOrder[currentIndex];
    if (!columnOrder.includes(item.id)) {
      dragRecord = item.id;
    }

    setColumnOrder(
      update(columnOrder, {
        $splice: [
          [currentIndex, 1],
          [newIndex, 0, dragRecord]
        ]
      })
    );
  };

  const deleteSelectedRows = () => {
    let isFailed = false;
    try {
      selectedFlatRows.forEach(async (selectedRow, loop) => {
        const targetDocumentId = selectedRow.values.id;
        await axios
          .delete(`/properties/frmBizUnit/${targetDocumentId}`)
          .then(() => {
            if (!isFailed && loop === selectedFlatRows.length - 1) {
              enqueueSnackbar('데이터가 삭제되었습니다.', {
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                autoHideDuration: 1000
              });
              retrieve();
            }
          })
          .catch((error) => {
            isFailed = true;
            throw error;
          });
      });
    } catch (error) {
      enqueueSnackbar('데이터 삭제가 실패하였습니다.', {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 1000,
        variant: 'error'
      });
    }
  };

  let headers = [];
  allColumns.map((item) => {
    if (!hiddenColumns?.includes(item.id) && item.id !== 'selection' && item.id !== 'edit') {
      headers.push({ label: typeof item.Header === 'string' ? item.Header : '#', key: item.id });
    }
    return item;
  });
  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2, pb: 0 }}>
          <Stack direction="row" spacing={2}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              size="small"
            />
            <Tooltip title="데이터 입력">
              <Button
                variant="contained"
                onClick={() => {
                  // setAdd(!add);
                  setInsertArr([...insertArr]);
                  setData([
                    {
                      unitId: 1,
                      localeCd: 'KO',
                      unitCd: 'BULK',
                      unitNm: 'BULK',
                      fullNm: 'BULK',
                      ordNo: 1,
                      note: 'BULK',
                      staYmd: '2203-05-12',
                      endYmd: '2203-05-12',
                      modUserId: 123456789,
                      modDate: '2023-09-27',
                      deleteYn: 'Y'
                    },
                    ...data
                  ]);
                  // setEditableRowIndex([ , ...editableRowIndex])
                }}
              >
                입력
              </Button>
            </Tooltip>
            <Tooltip title="데이터 삭제">
              <Button variant="contained" color="error" onClick={deleteSelectedRows}>
                삭제
              </Button>
            </Tooltip>
            <Tooltip title="데이터 확인">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  retrieve();
                  console.log(rows);
                }}
              >
                데이터 확인
              </Button>
            </Tooltip>
            <Tooltip title="데이터 비움">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setData([]);
                }}
              >
                데이터 비움
              </Button>
            </Tooltip>
            <Tooltip title="일괄수정 테스트">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  try {
                    editableRowIndex.map((item) => {
                      rows.find((row) => {
                        if (row.values.id == item) {
                          const staYmd = epochToDate(row.values.staYmd);
                          const endYmd = epochToDate(row.values.endYmd);
                          axios.patch('/properties/frmBizUnit', { ...row.values, staYmd, endYmd, deleteYn: 'N' }).catch((error) => {
                            throw error;
                          });
                        }
                      });
                    });
                    enqueueSnackbar(`저장이 완료되었습니다.`, {
                      anchorOrigin: { vertical: 'top', horizontal: 'center', color: 'error' },
                      autoHideDuration: 1000
                    });
                    setEditableRowIndex([]);
                  } catch (error) {
                    enqueueSnackbar('데이터가 저장 실패하였습니다.', {
                      anchorOrigin: { vertical: 'top', horizontal: 'center' },
                      autoHideDuration: 1000,
                      variant: 'error'
                    });
                    console.log(error);
                  }
                }}
              >
                일괄수정 테스트
              </Button>
            </Tooltip>
            <Tooltip title="일괄삭제 테스트">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  let deleteArr = [];
                  selectedFlatRows.map((row) => {
                    deleteArr.push(row.values.id);
                  });
                  axios
                    .delete('/properties/frmBizUnit/multi', { data: deleteArr })
                    .then((response) => {
                      console.log(response);
                      setData(data.filter((item) => !deleteArr.includes(item.id)));
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                일괄삭제 테스트
              </Button>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2}>
            <HidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
            <CSVExport
              data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original).filter((d) => d !== undefined) : data}
              filename={'umbrella-table.csv'}
              headers={headers}
            />
          </Stack>
        </Stack>

        <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
          <Table {...getTableProps()}>
            <TableHead sx={{ borderTopWidth: 2 }}>
              {headerGroups.map((headerGroup, i) => (
                <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => {
                    const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                    return (
                      <TableCell key={`umbrella-header-cell-${index}`} {...column.getHeaderProps([{ className: column.className }])}>
                        <DraggableHeader reorder={reorder} key={column.id} column={column} index={index}>
                          <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                            {column.canGroupBy ? (
                              <Box
                                sx={{
                                  color: column.isGrouped ? 'error.main' : 'primary.main',
                                  fontSize: '1rem'
                                }}
                                {...column.getGroupByToggleProps()}
                              >
                                {groupIcon}
                              </Box>
                            ) : null}
                            <HeaderSort column={column} sort />
                          </Stack>
                        </DraggableHeader>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            {/* striped table -> add class 'striped' */}
            <TableBody {...getTableBodyProps()} className="striped">
              {headerGroups.map((group, i) => (
                <TableRow key={i} {...group.getHeaderGroupProps()}>
                  {group.headers.map((column, index) => (
                    <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                      {column.canFilter ? column.render('Filter') : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {insertArr.map((item, i) => (
                <TableRow key={i}>
                  <TableCell key={i}>{item}</TableCell>
                </TableRow>
              ))}

              {isLoading ? (
                <EmptyTable msg="No Data" colSpan={12} />
              ) : page.length > 0 ? (
                page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Fragment key={i}>
                      <TableRow
                        {...row.getRowProps()}
                        {...(!editableRowIndex.includes(row.values.id) && {
                          onClick: (e) => {
                            if (e.target.type !== 'checkbox') row.toggleRowExpanded();
                          }
                        })}
                        sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                      >
                        {row.cells.map((cell, index) => {
                          let bgcolor = 'inherit';
                          if (cell.isGrouped) bgcolor = 'success.lighter';
                          if (cell.isAggregated) bgcolor = 'warning.lighter';
                          if (cell.isPlaceholder) bgcolor = 'error.lighter';
                          if (cell.isPlaceholder) bgcolor = 'error.lighter';
                          if (row.isSelected) bgcolor = alpha(theme.palette.primary.lighter, 0.35);
                          return (
                            <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }}>
                              {cell.isAggregated ? cell.render('Aggregated') : cell.isPlaceholder ? null : cell.render('Cell')}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {row.isExpanded && (
                        <FrmBizUnitDetail setData={setData} data={data} row={row} epochToDate={epochToDate} retrieve={retrieve} />
                      )}
                    </Fragment>
                  );
                })
              ) : (
                <EmptyTable msg="No Data" colSpan={12} />
              )}
            </TableBody>

            {/* footer table */}
            <TableFooter sx={{ borderBottomWidth: 2 }}>
              {footerGroups.map((group, i) => (
                <TableRow key={i} {...group.getFooterGroupProps()}>
                  {group.headers.map((column, index) => (
                    <TableCell key={index} {...column.getFooterProps([{ className: column.className }])}>
                      {column.render('Footer')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </Box>
        <Box sx={{ p: 2, py: 0 }}>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
        </Box>
      </Stack>
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddFrmBizUnit onCancel={handleAdd} data={data} setData={setData} retrieve={retrieve} />
      </Dialog>
    </>
  );
}

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

const FrmBizUnitTable = () => {
  // 기능 브랜치 테스트 - update // 기능 브랜치 테스트 - delete // 기능 브랜치 테스트 - create
  const [data, setData] = useState([]);
  const [isLoading, toggleIsLoading] = useState(true);
  const memoizedData = useMemo(() => data, [data]);
  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        id: 'selection',
        Header: SelectionHeader,
        Footer: '#',
        accessor: 'selection',
        groupByBoundary: true,
        Cell: SelectionCell,
        disableSortBy: true,
        disableFilters: true,
        disableGroupBy: true,
        Aggregated: () => null
      },
      {
        Header: '상태',
        Footer: '상태',
        accessor: 'rowStatus',
        className: 'cell-center',
        disableSortBy: true,
        disableFilters: true,
        disableGroupBy: true
      },
      {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
        className: 'cell-center',
        disableSortBy: true,
        disableGroupBy: true
      },
      {
        Header: 'UnitID',
        Footer: 'UnitID',
        accessor: 'unitId',
        className: 'cell-center',
        disableGroupBy: true
      },
      {
        Header: '단위업무코드',
        Footer: '단위업무코드',
        accessor: 'unitCd',
        className: 'cell-center',
        dataType: 'text',
        disableGroupBy: true
      },
      {
        Header: '단위업무명',
        Footer: '단위업무명',
        accessor: 'unitNm',
        dataType: 'text',
        filter: 'fuzzyText',
        disableGroupBy: true
      },
      {
        Header: '영문명',
        Footer: '영문명',
        accessor: 'fullNm',
        dataType: 'text',
        disableGroupBy: true
      },
      {
        Header: '순번',
        Footer: '순번',
        accessor: 'ordNo',
        className: 'cell-center',
        dataType: 'text',
        disableFilters: true,
        disableGroupBy: true
      },
      {
        Header: '시작일',
        Footer: '시작일',
        accessor: 'staYmd',
        className: 'cell-right',
        dataType: 'text',
        disableGroupBy: true
      },
      {
        Header: '종료일',
        Footer: '종료일',
        accessor: 'endYmd',
        className: 'cell-right',
        dataType: 'text',
        disableGroupBy: true
      },
      {
        Header: '비고',
        Footer: '비고',
        accessor: 'note',
        dataType: 'text',
        disableGroupBy: true
      },
      {
        Header: '수정일시',
        Footer: '수정일시',
        accessor: 'modDate',
        dataType: 'text',
        disableGroupBy: true
      }
    ],
    []
  );

  const retrieve = async () => {
    toggleIsLoading(true);
    setData([]);
    try {
      await axios
        .get('/properties/frmBizUnit/searchList/N')
        .then((response) => {
          setData(response.data);
          enqueueSnackbar('조회가 완료되었습니다.', { anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1000 });
        })
        .catch((error) => {
          enqueueSnackbar('조회가 실패하였습니다.', {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            autoHideDuration: 1000,
            variant: 'error'
          });
          throw error;
        });
    } catch (error) {
      console.error(error);
    } finally {
      toggleIsLoading(false);
    }
  };

  useEffect(() => {
    retrieve();
  }, []);

  return (
    <MainCard title="단위업무관리" subheader="단위업무를 관리하는 페이지입니다." content={false}>
      <ScrollX>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <ReactTable columns={columns} data={memoizedData} setData={setData} retrieve={retrieve} isLoading={isLoading} />
          <DragPreview />
        </DndProvider>
      </ScrollX>
    </MainCard>
  );
};

export default FrmBizUnitTable;
