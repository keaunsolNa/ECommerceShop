import { useEffect, useMemo, useState } from 'react';

import { Button, Dialog, TextField } from '@mui/material';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import axios from 'axios';
import MemberDetailModal from '../../sections/employee/MemberDetailModal';
import { PopupTransition } from '../../components/@extended/Transitions';
import useLocalStorage from '../../hooks/useLocalStorage';
import CommonSortTable from '../../components/CommonSortTable';

const MemberList = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const permission = useLocalStorage('role')[0];
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
      }

    ],
    []
  );
  // functions
  const handleReload = () => {
    setReload(!reload);
  };
  const handleOpen = (row) => {
    if (row && row.values && permission.includes(20)) {
      const retrieveCall = axios.get(`/empBase/member/${row.values.id}`);
      Promise.all([retrieveCall])
        .then(([response1]) => {
          setSelectedData(response1.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else setSelectedData([]);

    if (permission.includes(20)) setOpen(!open);
  };

  useEffect(() => {
    const retrieveCall = axios.get(`/empBase/memberList`);
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
        title={'회원 목록'}
        secondary={
          <>
            <Button variant='outlined' color='primary' onClick={handleReload}>
              재조회
            </Button>
            {permission.includes(20) ? (
              <Button variant='outlined' color='primary' onClick={() => handleOpen()}>
                인사 카드 생성
              </Button>
            ) : null}
          </>
        }
      >
        <CommonSortTable title={'회원 목록'} columns={columns} data={data} striped={true} handleOpen={handleOpen} />
      </MainCard>
      <Dialog
        maxWidth='md'
        TransitionComponent={PopupTransition}
        onClose={() => handleOpen()}
        open={open}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby='alert-dialog-slide-description'
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(255, 255, 255, 0.5)' } } }}
      >
        <MemberDetailModal selectedData={selectedData} handleReload={handleReload} handleOpen={handleOpen} />
      </Dialog>
    </div>
  );
};
export default MemberList;
