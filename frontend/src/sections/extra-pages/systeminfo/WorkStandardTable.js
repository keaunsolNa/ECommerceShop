// import PropTypes from 'prop-types';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useBlockLayout, useSortBy, useTable } from 'react-table';
// import { FixedSizeList } from 'react-window';
//
// // material-ui
// import { styled, useTheme } from '@mui/material/styles';
// import { Button, Chip, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
//
// // project-import
// import MainCard from 'components/MainCard';
// import ScrollX from 'components/ScrollX';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
// import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';
//
// import { ThemeMode } from 'config';
//
// const TableWrapper = styled('div')(() => ({
//   '.header': {
//     position: 'sticky',
//     zIndex: 1,
//     width: 'fit-content'
//   },
//   '& th[data-sticky-td]': {
//     position: 'sticky',
//     zIndex: '5 !important'
//   }
// }));
//
// const CellDetail = ({ value: initialValue, row, row: { index }, column: { dataType }, originalId, setOriginalId }) => {
//   const [value, setValue] = useState(initialValue);
//   const [editMode, setEditMode] = useState(false);
//   const toggleEditable = () => {
//     setEditMode(!editMode);
//   };
//   const theme = useTheme();
//   const onChange = (e) => {
//     e.stopPropagation();
//     setValue(e.target.value);
//   };
//   useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);
//   useEffect(() => {
//     setEditMode(editMode);
//   }, [editMode]);
//
//   let element;
//   switch (dataType) {
//     case 'text':
//       element = (
//         <>
//           {editMode ? (
//             <>
//               <TextField
//                 value={value}
//                 onChange={(e) => {
//                   setValue(e.target.value);
//                 }}
//                 id={`${index}`}
//                 sx={{
//                   '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 200 } },
//                   '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
//                 }}
//               />
//             </>
//           ) : (
//             value
//           )}
//         </>
//       );
//       break;
//     case 'select':
//       element = (
//         <>
//           <Select
//             labelId="demo-simple-select-label"
//             sx={{
//               '& .MuiOutlinedInput-input': {
//                 py: 0.75,
//                 px: 1,
//                 backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
//               },
//               '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
//             }}
//             id="demo-simple-select"
//             value={'Single'}
//             onChange={onChange}
//           >
//             <MenuItem value={'Complicated'}>
//               <Chip color="error" label="수정" size="small" variant="light" />
//             </MenuItem>
//             <MenuItem value={'Relationship'}>
//               <Chip color="success" label="입력" size="small" variant="light" />
//             </MenuItem>
//             <MenuItem value={'Single'}>
//               <Chip color="info" label="조회" size="small" variant="light" />
//             </MenuItem>
//           </Select>
//         </>
//       );
//       break;
//     case 'detail':
//       element = (
//         <>
//           <Button
//             size="small"
//             color="success"
//             onClick={() => {
//               setOriginalId(row.original.id);
//               // console.log(originalId);
//             }}
//           >
//             상세보기
//           </Button>
//           {/* <Button
//             onClick={() => {
//               toggleEditable();
//               console.log(editMode);
//             }}
//           >
//             Edit
//           </Button> */}
//         </>
//       );
//       break;
//     default:
//       element = <span></span>;
//       break;
//   }
//   return element;
// };
// function ReactTable({ columns, data, getHeaderProps, originalId, setOriginalId }) {
//   const theme = useTheme();
//
//   const defaultColumn = useMemo(() => ({ Cell: CellDetail, width: 240 }), []);
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
//     {
//       columns,
//       defaultColumn,
//       data,
//       originalId,
//       setOriginalId
//     },
//     useSortBy,
//     useBlockLayout
//   );
//
//   const RenderRow = useCallback(
//     ({ index, style }) => {
//       const row = rows[index];
//       prepareRow(row);
//       return (
//         <TableRow
//           {...row.getRowProps({
//             style
//           })}
//         >
//           {row.cells.map((cell, index) => {
//             return (
//               <TableCell
//                 key={index}
//                 sx={{
//                   backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white
//                 }}
//                 {...cell.getCellProps()}
//               >
//                 {cell.render('Cell')}
//               </TableCell>
//             );
//           })}
//         </TableRow>
//       );
//     },
//     [prepareRow, rows, theme]
//   );
//
//   // Render the UI for your table
//   return (
//     <>
//       <Stack spacing={10}>
//         <MainCard
//           title="업무기준관리"
//           content={false}
//           secondary={<CSVExport data={data} filename="업무기준관리.csv" />}
//           sx={{ maxWidth: 1205 }}
//         >
//           <ScrollX>
//             <TableWrapper>
//               <Table {...getTableProps()} stickyHeader>
//                 <TableHead>
//                   {headerGroups.map((headerGroup, index) => (
//                     <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map((column, i) => (
//                         <TableCell
//                           key={i}
//                           sx={{ position: 'sticky !important' }}
//                           {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
//                         >
//                           <HeaderSort column={column} />
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableHead>
//                 <TableBody {...getTableBodyProps()}>
//                   <FixedSizeList height={400} itemCount={rows.length} itemSize={60} width="100%">
//                     {RenderRow}
//                   </FixedSizeList>
//                 </TableBody>
//               </Table>
//             </TableWrapper>
//           </ScrollX>
//         </MainCard>
//       </Stack>
//     </>
//   );
// }
//
// ReactTable.propTypes = {
//   columns: PropTypes.array,
//   data: PropTypes.array,
//   getHeaderProps: PropTypes.func,
//   originalId: PropTypes.number,
//   setOriginalId: PropTypes.func
// };
//
// const StatusCell = ({ value }) => {
//   switch (value) {
//     case 'Complicated':
//       return <Chip color="error" label="Complicated" size="small" variant="light" />;
//     case 'Relationship':
//       return <Chip color="success" label="Relationship" size="small" variant="light" />;
//     case 'Single':
//     default:
//       return <Chip color="info" label="Single" size="small" variant="light" />;
//   }
// };
//
// StatusCell.propTypes = {
//   value: PropTypes.string
// };
//
// const ProgressCell = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;
//
// ProgressCell.propTypes = {
//   value: PropTypes.number
// };
//
// function WorkStandardTable(props) {
//   const data = props.data;
//   const originalId = props.originalId;
//   const setOriginalId = props.setOriginalId;
//   const columns = useMemo(
//     () => [
//       {
//         Header: 'ID',
//         accessor: 'id',
//         dataType: 'text'
//       },
//       {
//         Header: '상태',
//         accessor: 'status',
//         dataType: 'select'
//       },
//       {
//         Header: '기준분류',
//         accessor: 'stdKind',
//         dataType: 'text'
//       },
//       {
//         Header: '기준분류명',
//         accessor: 'kindNm',
//         dataType: 'text'
//       },
//       {
//         Header: '상세보기',
//         accessor: 'detail',
//         dataType: 'detail'
//       }
//     ],
//     []
//   );
//
//   return (
//     <ReactTable
//       columns={columns}
//       data={data}
//       originalId={originalId}
//       setOriginalId={setOriginalId}
//       getHeaderProps={(column) => column.getSortByToggleProps()}
//     />
//   );
// }
//
// export default WorkStandardTable;
