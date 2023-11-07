import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';

// material-ui
import { Box, Chip, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useFilters, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { TablePagination } from 'components/third-party/ReactTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, top }) {
  const navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
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

  const fileClick = (data) => {
    console.log('data is : ', data);

    navigate(`/viewposting?id=${data.id}`);
    // navigate('/viewposting', {
    //   state: {
    //     data: data
    //   }
    // });
  };

  return (
    <Stack>
      {top && (
        <Box sx={{ p: 2 }}>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
        </Box>
      )}
      <Table {...getTableProps()}>
        {/* <SearchTableHead headerGroups={headerGroups} /> */}
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <TableCell key={i} {...column.getHeaderProps([{ className: column.className }])}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            // console.log('page is :', row);

            if (row.original.title == '삭제된 게시글입니다.') {
              // 삭제된 게시글의 경우 처리
              return null;
            } else {
              // 아닐떄의 테이블 로우 처리
              return (
                <TableRow key={i} {...row.getRowProps()} onClick={() => fileClick(data[i])} style={{ cursor: 'pointer' }}>
                  {row.cells.map((cell, index) => (
                    <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            }
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
  top: PropTypes.bool
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

const PostPagination = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    axios.get('/post/posting').then((res) => {
      setFileList(res.data.specificFields);
    });
  }, []);

  // const text = '영업팀';
  // const searchFile = (text) => {
  //   axios.get(`${url}/etl/searchDivision?division="${text}"`).then((res) => {
  //     setFileList(res.data);
  //   });
  // };
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'postNum'
      },
      {
        Header: '제목',
        accessor: 'title',
        className: 'cell-left'
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
            <ReactTable columns={columns} data={fileList} />
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default PostPagination;
