import { useEffect, useMemo, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import axios from 'axios';
import Loader from '../../components/Loader';
import MainCard from '../../components/MainCard';
import CommonSortTable from '../../components/CommonSortTable';
import { PopupTransition } from '../../components/@extended/Transitions';
import { Dialog } from '@mui/material';
import SupplyDetailModal from '../../sections/supply/SupplyDetailModal';

const SupplyManagement = () => {
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
      { Header: 'ID', accessor: 'supplyId' },
      { Header: '이름', accessor: 'name' },
      { Header: '상태', accessor: 'state' },
      { Header: '연락처', accessor: 'tel' },
      { Header: '설명', accessor: 'desc' },
      { Header: '생성일', accessor: 'createDate' }
    ],
    []
  );

  // functions
  const handleReload = () => {
    setReload(!reload);
  };
  const handleOpen = (row) => {
    if (row && row.values && permission.includes(30)) {
      const retrieveCall = axios.get(`/supplyBase/${row.values.id}`);
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

    if (permission.includes(10)) setOpen(!open);
  };

  useEffect(() => {
    const retrieveCall = axios.get(`/supplyBase/all/createDate`);
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
    <>
      <MainCard
        content={false}
        title={'공급 업체 목록'}
      >
        <CommonSortTable title={'업체 목록'} columns={columns} data={data} striped={true} handleOpen={handleOpen} />
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
        <SupplyDetailModal  selectedData={selectedData} handleReload={handleReload} handleOpen={handleOpen} />
      </Dialog>
    </>
  )

}

export default SupplyManagement;