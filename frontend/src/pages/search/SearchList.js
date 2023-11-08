import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';

import { MinusOutlined } from '@ant-design/icons';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { koKR } from '@mui/x-date-pickers';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import File from './File';
import Typography from 'themes/overrides/Typography';

function SearchTableHead() {
  const [startDate, setStartDate] = useState([dayjs('')]);
  const [endDate, setEndDate] = useState([dayjs('')]);
  const [division, setDivision] = useState('');
  const [actor, setActor] = useState('');
  const [endDateKey, setEndDateKey] = useState(0);

  const handleEndDateChange = (newValue) => {
    if (newValue.isBefore(startDate)) {
      // 만약 선택한 끝 날짜가 시작 날짜보다 작다면
      setEndDate(startDate.add(1, 'day')); // 끝 날짜를 시작 날짜로 설정
    } else {
      setEndDate(newValue); // 그렇지 않으면 끝 날짜 업데이트
    }
    setEndDateKey(endDateKey + 1); // DatePicker key 업데이트
  };
  useEffect(() => {
    console.log('startDate : ', startDate.$d, 'endDate : ', endDate.$d);
  }, [startDate, endDate]);
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                marginLeft: 10,
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{}}>
                <Typography>검색</Typography>
              </div>
            </div>
            <div style={{ marginRight: 30, display: 'flex' }}>
              <div style={{ width: 400, marginRight: 20, display: 'flex' }}>
                {/* 날짜 캘린더 파트 */}
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koKR}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginRight: 10 }}>
                      <DatePicker format="YYYY-MM-DD" label="시작" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                    </div>
                    <div style={{ marginRight: 10 }}>
                      <MinusOutlined />
                    </div>
                    <div>
                      <DatePicker key={endDateKey} format="YYYY-MM-DD" label="현재" value={endDate} onChange={handleEndDateChange} />
                    </div>
                  </div>
                </LocalizationProvider>
              </div>
              <div style={{ width: 350, marginRight: 20, display: 'flex' }}>
                <TextField
                  style={{ marginRight: 20, alignItems: 'center' }}
                  label="기안부서"
                  value={division}
                  onChange={(event) => {
                    setDivision(event.target.value);
                  }}
                  InputLabelProps={{ style: { paddingTop: 2, marginTop: -2 } }}
                />
                <TextField
                  style={{ marginRight: 20, alignItems: 'center' }}
                  label="작성자"
                  value={actor}
                  onChange={(event) => {
                    setActor(event.target.value);
                  }}
                  InputLabelProps={{ style: { paddingTop: 2, marginTop: -2 } }}
                />
                <Button style={{ color: 'white', backgroundColor: 'navy' }} label="조회" onClick={() => SendSearchWord(division, actor)}>
                  조회
                </Button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const SendSearchWord = (division, actor) => {
  console.log('division : ', division, 'actor : ', actor);
};

const SearchList = () => {
  const [fileList, setFileList] = useState([]);

  const text = '영업팀';

  useEffect(() => {
    searchFile(text);
  }, []);

  const searchFile = (text) => {
    //console.log('this is text : ', text);
    axios.get(`${url}/etl/searchDivision?division="${text}"`).then((res) => {
      setFileList(res.data);
    });
  };

  // useEffect(() => {
  //   console.log('filelist is : ', fileList);
  // }, [fileList]);

  return (
    <div>
      <Box>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' }
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            sx={{
              '& .MuiTableCell-root': {
                borderColor: '#DCDCDC'
              },
              '& .MuiTableCell-root:first-of-type': {
                pl: 2
              },
              '& .MuiTableCell-root:last-of-type': {
                pr: 2
              }
            }}
          >
            <SearchTableHead />
            <TableBody>
              <TableCell>
                {fileList.map((res, index) => (
                  //console.log('res is : ', res);
                  <File key={index} file={res} />
                ))}
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
export default SearchList;
