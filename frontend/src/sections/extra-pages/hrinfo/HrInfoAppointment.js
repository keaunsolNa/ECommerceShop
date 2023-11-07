// material-ui
import { Grid } from '@mui/material';
import { useOutletContext } from 'react-router';
// project import
import DynamicTable from 'components/win/DynamicTable';
import { useEffect, useMemo, useState } from 'react';
import { dispatch } from 'store';
import { dispatchRetrieveAppointment } from 'store/reducers/hrinfo';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';

// third-party

// assets

const HrInfoAppointment = () => {
  // states
  const [loading, setLoading] = useState(true);
  const { retrieveAppointment } = useSelector((state) => state.hrinfo); // hrinfo내에 retrieve와 retrieveAppointment 선택하겠다. 여기서 state는 index를 의미
  // const retrieveAppointment = useSelector((state) => state.hrinfo.HrInfoAppointment); // 이런 식으로도 사용 가능
  // const employeeId = useOutletContext(); // 부모 컴포넌트에게 employeeId 를 받는다.
  const column = useMemo(
    () => [
      {
        Header: '상태',
        Footer: '상태',
        dataType: 'rowStatus',
        accessor: 'rowStatus'
      },
      {
        Header: '시작일자',
        Footer: '시작일자',
        dataType: 'date',
        accessor: 'dateOfAppointment'
      },
      {
        Header: '타입코드',
        Footer: '타입코드',
        dataType: 'text',
        accessor: 'typeCode'
      },
      {
        Header: '근무지',
        Footer: '근무지',
        dataType: 'text',
        accessor: 'workplace',
        className: 'cell-right'
      },
      {
        Header: '부서',
        Footer: '부서',
        dataType: 'text',
        accessor: 'division'
      },
      {
        Header: '직급',
        Footer: '직급',
        dataType: 'text',
        accessor: 'grade'
      },
      {
        Header: '직위',
        Footer: '직위',
        dataType: 'text',
        accessor: 'post'
      },
      {
        Header: '직책',
        Footer: '직책',
        dataType: 'text',
        accessor: 'duty'
      },
      {
        Header: '겸직부서',
        Footer: '겸직부서',
        dataType: 'text',
        accessor: 'additionalDivision'
      },
      {
        Header: '종료예정일',
        Footer: '종료예정일',
        dataType: 'date',
        accessor: 'endDate'
      },
      {
        Header: '비고',
        Footer: '비고',
        dataType: 'text',
        accessor: 'note'
      }
    ],
    []
  );
  const tableType = {
    sort: true,
    search: true,
    input: true,
    save: true,
    download: true
  };

  // functions
  useEffect(() => {
    const retrieveAppointmentCall = dispatch(dispatchRetrieveAppointment()); // 여기서 조회함수가 발생하여 retrieveAppointment[]값이 설정되어 상단의 retrieveAppointment에 값이 주입됨.
    Promise.all([retrieveAppointmentCall]).then(() => setLoading(false)); // Proimse.all() => 비동기통신이 전부 완료되었을 때 실행한다.
  }, []);

  if (loading) return <Loader />;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DynamicTable
          name={'인사발령'}
          columns={column}
          data={retrieveAppointment}
          tableType={tableType}
          popups={'http://localhost:3000/hrinfo/appointment'}
        />
      </Grid>
    </Grid>
  );
};

export default HrInfoAppointment;
