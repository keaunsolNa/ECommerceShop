// import { useMemo, useState } from 'react';
// import * as React from 'react';
// // material-ui
// import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Stack, InputLabel } from '@mui/material';
//
// // third-party
// import PropTypes from 'prop-types';
//
// // project import
// import { useTable } from 'react-table';
// import MainCard from '../MainCard';
// import ScrollX from '../ScrollX';
// import axios from 'axios';
// import DaumPostcode from 'react-daum-postcode';
// import { boolean } from 'yup';
// function SearchAddressBasicTable({ columns, data, striped, handleOpen, setSelect }) {
//   const initialState = useMemo(
//     () => ({
//       filters: [],
//       hiddenColumns: ['id'],
//       columnOrder: [],
//       pageIndex: 0,
//       pageSize: 10
//     }),
//     []
//   );
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//     initialState
//   });
//
//   return (
//     <Table {...getTableProps()}>
//       <TableHead>
//         {headerGroups.map((headerGroup, i) => (
//           <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column, index) => (
//               <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])} style={{ minWidth: '100px' }}>
//                 {column.render('Header')}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableHead>
//       <TableBody {...getTableBodyProps()} {...(striped && { className: 'striped' })}>
//         {rows.map((row, i) => {
//           prepareRow(row);
//           return (
//             <TableRow
//               {...row.getRowProps()}
//               key={i}
//               onClick={() => {
//                 setSelect(row);
//               }}
//               onDoubleClick={() => {
//                 handleOpen(row);
//               }}
//             >
//               {row.cells.map((cell, i) => (
//                 <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
//                   {cell.render('Cell')}
//                 </TableCell>
//               ))}
//             </TableRow>
//           );
//         })}
//       </TableBody>
//     </Table>
//   );
// }
//
// SearchAddressBasicTable.propTypes = {
//   columns: PropTypes.array,
//   data: PropTypes.array,
//   handleOpen: PropTypes.func,
//   striped: PropTypes.bool,
//   setSelect: PropTypes.func
// };
//
// const SearchAddressModal = ({ searchCondition, setSearchCondition, handleReload, handleOpen }) => {
//   // state
//   const [loading, setLoading] = useState(true);
//   const [select, setSelect] = useState();
//   const [query, setQuery] = useState('');
//   const [openPostcode, setOpenPostcode] = React.useState<boolean>false;
//   const columns = useMemo(
//     () => [
//       { Header: '번호', accessor: (row, index) => index + 1 },
//       {
//         Header: '도로명주소',
//         accessor: 'address'
//       },
//       {
//         Header: '지번주소',
//         accessor: 'address2'
//       },
//       {
//         Header: '우편번호',
//         accessor: 'zipCode'
//       }
//     ],
//     []
//   );
//   //function
//   const searchConditionChange = (newValue) => {
//     setSearchCondition((prevCondition) => {
//       if (newValue.target.id === 'zipCode') {
//         return { ...prevCondition, zipCode: newValue.target.value };
//       } else if (newValue.target.id === 'address') {
//         return { ...prevCondition, address: newValue.target.checked };
//       }
//     });
//   };
//
//   // useEffect(() => {
//   //   const conditionValue = Address.data;
//   //   Promise.all([conditionValue])
//   //     .then(([response1]) => {
//   //       setData(response1);
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching data:', error);
//   //       setLoading(false); // 오류가 발생하더라도 setLoading(false) 호출
//   //     });
//   // }, [searchCondition]);
//   // if (loading) return <Loader />;
//   return (
//     <MainCard title="주소 찾기">
//       <ScrollX>
//         <Stack direction="row" spacing={2}>
//           <InputLabel>주소 검색어</InputLabel>
//           <TextField
//             id="searchConditionAddress"
//             name="searchConditionAddress"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             size={'medium'}
//           />
//           <Button variant="contained" color="primary" onClick={handleSearch}>
//             조회
//           </Button>
//           <Button variant="contained" color="primary" onClick={() => handleOpen(select)}>
//             확인
//           </Button>
//         </Stack>
//         {/*<SearchAddressBasicTable columns={columns} data={data} striped={true} handleOpen={handleOpen} setSelect={setSelect} />*/}
//       </ScrollX>
//     </MainCard>
//   );
// };
//
// SearchAddressModal.propTypes = {
//   searchCondition: PropTypes.object,
//   setSearchCondition: PropTypes.func,
//   handleReload: PropTypes.func,
//   handleOpen: PropTypes.func
// };
// export default SearchAddressModal;
