import { useEffect, useMemo, useState } from 'react';

import { Button, Dialog, TextField } from '@mui/material';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import axios from 'axios';
import EmployeeListTable from '../../sections/employee/EmployeeListTable';
import EmployeeDetailModal from '../../sections/employee/EmployeeDetailModal';
import { PopupTransition } from '../../components/@extended/Transitions';

const EmployeeList = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [searchCodeClassify, setSearchCodeClassify] = useState('TEST_INPUT');
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        Footer: 'ID',
        dataType: 'id',
        accessor: 'id'
      },
      {
        Header: '이름',
        Footer: '이름',
        dataType: 'text',
        accessor: 'name'
      },
      {
        Header: '이메일',
        Footer: '이메일',
        dataType: 'text',
        accessor: 'email'
      },
      {
        Header: '상태',
        Footer: '상태',
        dataType: 'text',
        accessor: 'state'
      },
      {
        Header: '직책',
        Footer: '직책',
        dataType: 'text',
        accessor: 'role'
      },
      {
        Header: '성별',
        Footer: '성별',
        dataType: 'text',
        accessor: 'gender'
      },
      {
        Header: '생년월일',
        Footer: '생년월일',
        dataType: 'text',
        accessor: 'birth'
      },
      {
        Header: '핸드폰번호',
        Footer: '핸드폰번호',
        dataType: 'text',
        accessor: 'phoneNumber'
      },
      {
        Header: '집전화번호',
        Footer: '집전화번호',
        dataType: 'text',
        accessor: 'callNumber'
      },
      {
        Header: '주소',
        Footer: '주소',
        dataType: 'text',
        accessor: 'address'
      }
    ],
    []
  );
  // functions
  const handleReload = () => {
    setReload(!reload);
  };
  const handleOpen = (row) => {

    if (row && row.values) {
      const retrieveCall = axios.get(`/empBase/${row.values.id}`);
      Promise.all([retrieveCall])
        .then(([response1]) => {
          setSelectedData(response1.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
    else setSelectedData([]);

    setOpen(!open);
  };
  const searchConditionChange = (e) => {
    setSearchCodeClassify(e.target?.value);
  };
  useEffect(() => {
    const retrieveCall = axios.get(`/empBase/all`);
    Promise.all([retrieveCall])
      .then(([response1]) => {
        setData(response1.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [reload]);

  if (loading) return <Loader />;
  return (
    <div>
      <MainCard
        content={false}
        title={'사원 목록'}
        secondary={
          <>
            <TextField id="searchCondition" name="searchCondition" placeholder="이름" onChange={searchConditionChange} size={'small'} />
            <Button variant="outlined" color="primary" onClick={handleReload}>
              조회
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleOpen()} >
              인사 카드 생성
            </Button>
          </>
        }
      >
        <EmployeeListTable title={'코드분류내역'} columns={columns} data={data} striped={true} handleOpen={handleOpen} />
      </MainCard>
      <Dialog
        maxWidth="md"
        TransitionComponent={PopupTransition}
        onClose={() => handleOpen()}
        open={open}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(255, 255, 255, 0.5)' } } }}
      >
        <EmployeeDetailModal selectedData={selectedData} handleReload={handleReload} handleOpen={handleOpen} />
      </Dialog>
    </div>
  );
};
export default EmployeeList;
