import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// third-party

// project import
import DynamicTable from 'components/win/DynamicTable';
import { useOutletContext } from 'react-router';
import { useSelector } from 'store';
import { dispatchRetrieveAddress, dispatchRetrievePhone } from 'store/reducers/hrinfo';
import { dispatch } from 'store';
import Loader from 'components/Loader';


// ==============================|| REACT TABLE ||============================== //


// ==============================|| REACT TABLE - STICKY ||============================== //

const VirtualizedInfiniteScrollTable = () => {
  //const data = useMemo(() => makeData(50), []);
  const { retrieveAddress, retrievePhone } = useSelector((state) => state.hrinfo);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveAddressCall = dispatch(dispatchRetrieveAddress());
    const retrievePhoneCall = dispatch(dispatchRetrievePhone());
    Promise.all([retrieveAddressCall, retrievePhoneCall]).then(() => setLoading(false));
  }, []);

  const addrColumns = useMemo(
    () => [
      {
        Header: '상태',
        accessor: 'rowStatus',
        dataType: 'rowStatus'
      },
      {
        Header: '국가',
        accessor: 'nation',
        dataType: 'text'
      },
      {
        Header: '주소종류',
        accessor: 'nowadress',
        dataType: 'text'
      },
      {
        Header: '우편번호',
        accessor: 'mailadress',
        dataType: 'text'
      },
      {
        Header: '주소',
        accessor: 'address',
        dataType: 'text'
      },
      {
        Header: '상세주소',
        accessor: 'detailaddress',
        dataType: 'text'
      },
      {
        Header: '시작일자',
        accessor: 'startday',
        dataType: 'text'
      },
      {
        Header: '종료일자',
        accessor: 'endday',
        dataType: 'text'
      },
      {
        Header: '비고',
        accessor: 'note',
        dataType: 'text'
      }
    ],
    []
  );

  const phoneColumns = useMemo(
    () => [
      {
        Header: '상태',
        accessor: 'rowStatus',
        dataType: 'rowStatus'
      },
      {
        Header: '국가',
        accessor: 'nation',
        dataType: 'text'
      },
      {
        Header: '전화번호종류',
        accessor: 'nowphone',
        dataType: 'text'
      },
      {
        Header: '전화번호',
        accessor: 'phonenumber',
        dataType: 'text'
      },
      {
        Header: '시작일자',
        accessor: 'startday',
        dataType: 'text'
      },
      {
        Header: '종료일자',
        accessor: 'endday',
        dataType: 'text'
      },
      {
        Header: '비고',
        accessor: 'note',
        dataType: 'text'
      }
    ],
    []
  );

  const tableType = {
    checkBox:true,
    sort: true,
    search: true,
    input: true,
    save: true,
    download: true
  };

  if (loading) return <Loader />;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DynamicTable
              name={'주소사항'}
              columns={addrColumns}
              data={retrieveAddress[0]}
              tableType={tableType}
              height={{height : 200}}
            />
        </Grid>
        <Grid item xs={12}>
          <DynamicTable
              name={'전화번호'}
              columns={phoneColumns}
              data={retrievePhone[0]}
              tableType={tableType}
              height={{height : 200}}
            />
        </Grid>
      </Grid>
    </>
  );
};

export default VirtualizedInfiniteScrollTable;
