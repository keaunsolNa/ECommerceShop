import { useState } from 'react';
import { Button, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { MinusOutlined } from '@ant-design/icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

function SearchTableHead({ headerGroups, setFileList }) {
  const [startDate, setStartDate] = useState([dayjs('')]);
  const [endDate, setEndDate] = useState([dayjs('')]);
  const [division, setDivision] = useState('');
  const [actor, setActor] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [endDateKey, setEndDateKey] = useState(0);

  const SendSearchWord = (startDate, endDate, division, actor) => {
    console.log(startDate.$d);
    if (startDate.$d == null || endDate.$d == null) {
      alert('날짜입력은 필수입니다');
    } else {
      const data = {
        date: startDate.$d.toISOString() + ',' + endDate.$d.toISOString(),
        division: division,
        actor: actor
      };
      console.log('data is : ', data);
      axios.post('/etl/sample', data).then((res) => {
        console.log('res : ', res.data.size);
        setFileList(res.data.data);
        setSearchCount(res.data.size);
      });
    }
  };

  //console.log('headerGroups : ', headerGroups[0].headers.length);

  const handleEndDateChange = (newValue) => {
    if (newValue.isBefore(startDate)) {
      // 만약 선택한 끝 날짜가 시작 날짜보다 작다면
      setEndDate(startDate); // 끝 날짜를 시작 날짜로 설정
      alert('현재날짜는 시작일 보다 작을 수 없습니다.');
    } else {
      setEndDate(newValue); // 그렇지 않으면 끝 날짜 업데이트
    }
    setEndDateKey(endDateKey + 1); // DatePicker key 업데이트
  };

  return (
    <TableHead style={{ backgroundColor: 'white', width: '100%' }}>
      <TableRow>
        <TableCell colSpan={headerGroups[0].headers.length}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                display: 'flex',
                marginLeft: 10,
                width: 250,
                height: '100%',
                alignItems: 'center'
              }}
            >
              <h1 style={{}}>검색</h1>
              <div style={{ marginLeft: 10 }}>{searchCount} 건이 검색되었습니다</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 400, marginRight: 20, display: 'flex' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                <Button
                  style={{ color: 'white', backgroundColor: 'navy' }}
                  label="조회"
                  onClick={() => SendSearchWord(startDate, endDate, division, actor)}
                >
                  조회
                </Button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>

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
  );
}

SearchTableHead.propTypes = {
  headerGroups: PropTypes.array,
  setFileList: PropTypes.func
};

export default SearchTableHead;
