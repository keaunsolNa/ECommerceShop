import { useEffect, useMemo, useState } from 'react';

import { Button, Dialog, TextField } from '@mui/material';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import axios from 'axios';
import { PopupTransition } from '../../components/@extended/Transitions';
import useLocalStorage from '../../hooks/useLocalStorage';
import ProductDetailModal from '../../sections/product/ProductDetailModal';
import CommonSortTable from '../../components/CommonSortTable';

const ProductList = () => {
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
        Header: '상태',
        Footer: '상태',
        dataType: 'text',
        accessor: 'state'
      },
      {
        Header: '이름',
        Footer: '이름',
        dataType: 'text',
        accessor: 'name'
      },
      {
        Header: '가격',
        Footer: '가격',
        dataType: 'text',
        accessor: 'price'
      },
      {
        Header: '재고',
        Footer: '재고',
        dataType: 'text',
        accessor: 'amount'
      },
      {
        Header: '조회수',
        Footer: '조회수',
        dataType: 'text',
        accessor: 'viewCount'
      },
      {
        Header: '설명',
        Footer: '설명',
        dataType: 'text',
        accessor: 'desc'
      },
      {
        Header: '생성일',
        Footer: '생성일',
        dataType: 'date',
        accessor: 'createDate'
      }
    ],
    []
  );
  // functions
  const handleReload = () => {
    setReload(!reload);
  };
  const handleOpen = (row) => {
    if (row && row.values && permission.includes(10)) {
      const retrieveCall = axios.get(`/productBase/${row.values.id}`);
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
    const retrieveCall = axios.get(`/productBase/all`);
    Promise.all([retrieveCall])
      .then(([response1]) => {
        console.log(response1);
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
        title={'상품 목록'}
        secondary={
          <>
            <Button variant='outlined' color='primary' onClick={handleReload}>
              재조회
            </Button>
            {permission.includes(10) ? (
              <Button variant='outlined' color='primary' onClick={() => handleOpen()}>
                신규 상품 생성
              </Button>
            ) : null}
          </>
        }
      >
        <CommonSortTable title={'상품 내역'} columns={columns} data={data} striped={true} handleOpen={handleOpen} />
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
        <ProductDetailModal selectedData={selectedData} handleReload={handleReload} handleOpen={handleOpen} />
      </Dialog>
    </div>
  );
};
export default ProductList;
