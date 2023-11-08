import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Box, Chip, Grid, Stack, Table, TableBody, TableCell, TableRow } from '@mui/material';

// third-party
import { useFilters, usePagination, useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { TablePagination } from 'components/third-party/ReactTable';
import SearchTableHead from './SearchTableHead';
import SearchModal from './SearchModal';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, top, setFileList }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    usePagination
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const fileClick = (htmlContent) => {
    setModalOpen(true);
    setHtmlContent(htmlContent);
    console.log('htmlContent : ', htmlContent);
  };

  return (
    <Stack>
      {top && (
        <Box sx={{ p: 2 }}>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
        </Box>
      )}
      {modalOpen && <SearchModal setModalOpen={setModalOpen} htmlContent={htmlContent} />}
      <Table {...getTableProps()}>
        {/* <SearchTableHead headerGroups={headerGroups} /> */}
        <SearchTableHead headerGroups={headerGroups} setFileList={setFileList} />
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <TableRow key={i} {...row.getRowProps()} onClick={() => fileClick(row.original.htmlContent)} style={{ cursor: 'pointer' }}>
                {row.cells.map((cell, index) => (
                  //   console.log('cell is : ', cell.render('Cell').props.cell.row.original.htmlContent);
                  <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                    {/* <Button
                        key={index}
                        onClick={}
                        style={{ color: 'black' }}
                      > */}
                    {cell.render('Cell')}
                    {/* </Button> */}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell sx={{ p: 2 }} colSpan={7}>
              <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  top: PropTypes.bool,
  setFileList: PropTypes.func
};

// ==============================|| REACT TABLE - PAGINATION ||============================== //

const StatusCell = ({ value }) => {
  switch (value) {
    case 'Complicated':
      return <Chip color="error" label="Complicated" size="small" variant="light" />;
    case 'Relationship':
      return <Chip color="success" label="Relationship" size="small" variant="light" />;
    case 'Single':
    default:
      return <Chip color="info" label="Single" size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.string
};

const ProgressCell = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

ProgressCell.propTypes = {
  value: PropTypes.number
};

const SearchPagination = () => {
  const [fileList, setFileList] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    // console.log('fileList : ', fileList);
    setTest(fileList);
  }, [fileList]);

  // useEffect(() => {
  //   console.log('test : ', test);
  // }, [test]);

  // const text = '영업팀';
  // const searchFile = (text) => {
  //   axios.get(`${url}/etl/searchDivision?division="${text}"`).then((res) => {
  //     setFileList(res.data);
  //   });
  // };
  const columns = useMemo(
    () => [
      {
        Header: '제목',
        accessor: 'title'
      },
      {
        Header: '기안부서',
        accessor: 'division'
      },
      {
        Header: '작성자',
        accessor: 'actor'
      }
    ],
    []
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard content={false}>
          <ScrollX>
            <ReactTable columns={columns} data={test} setFileList={setFileList} />
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default SearchPagination;
