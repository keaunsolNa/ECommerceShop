import { useEffect, useMemo, useState } from 'react';

import { Button, Dialog } from '@mui/material';
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
      { Header: '#', accessor: (row, index) => index + 1 },
      { Header: 'ID', accessor: 'id' },
      { Header: '이름', accessor: 'name' },
      { Header: '이메일', accessor: 'email' },
      { Header: '상태', accessor: 'state' },
      { Header: '성별', accessor: 'gender' },
      { Header: '생년월일', accessor: 'birth' }
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
            {permission.includes(20) ? (
              <Button variant="outlined" color="primary" onClick={() => handleOpen()}>
                인사 카드 생성
              </Button>
            ) : null}
          </>
        }
      >
        <CommonSortTable title={'회원 목록'} columns={columns} data={data} striped={true} handleOpen={handleOpen} />
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
        <MemberDetailModal selectedData={selectedData} handleReload={handleReload} handleOpen={handleOpen} />
      </Dialog>
    </div>
  );
};
export default MemberList;
