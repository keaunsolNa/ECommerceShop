import { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { useSelector, dispatch } from 'store';

// material-ui

// third-party

// project import
import { dispatchRetrievePersonal } from 'store/reducers/hrinfo';
import Loader from 'components/Loader';
import DynamicTable from 'components/win/DynamicTable';

// assets

const HrInfoPersonal = () => {
  // states
  const [loading, setLoading] = useState(true);
  const { retrieveMaster, retrievePersonal } = useSelector((state) => state.hrinfo);
  // const employeeName = retrieve.filter((item) => item.employeeId === employeeId)[0].name;
  // const nameColumns = useMemo(
  //   () => [
  //     {
  //       Header: '상태',
  //       accessor: 'rowStatus',
  //       dataType: 'rowStatus'
  //     },
  //     {
  //       Header: '이름종류코드',
  //       accessor: 'language',
  //       dataType: 'text'
  //     },
  //     {
  //       Header: '이름',
  //       accessor: 'value',
  //       dataType: 'text'
  //     },
  //     {
  //       Header: '시작일자',
  //       accessor: 'startDate',
  //       dataType: 'text'
  //     },
  //     {
  //       Header: '종료일자',
  //       accessor: 'endDate',
  //       dataType: 'text'
  //     }
  //   ],
  //   []
  // );

  const personalColumns = useMemo(
    () => [
      {
        Header: '상태',
        accessor: 'rowStatus',
        dataType: 'rowStatus'
      },
      {
        Header: '주민번호',
        accessor: 'residentRegistrationNumber',
        dataType: 'text'
      },
      {
        Header: '이름',
        accessor: 'name',
        dataType: 'text'
      },
      {
        Header: '생년월일',
        accessor: 'birth',
        dataType: 'text'
      },
      {
        Header: '내국인여부',
        accessor: 'foreigner',
        dataType: 'text'
      },
      {
        Header: '결혼여부',
        accessor: 'marriage',
        dataType: 'text'
      },
      {
        Header: '국적',
        accessor: 'nationality',
        dataType: 'text'
      }
    ],
    []
  );

  const tableType = { 
    search: true, 
    save: true, 
    download: true, 
    input: true
  };

  // functions
  useEffect(() => {
    const retrievePersonalCall = dispatch(dispatchRetrievePersonal());
    Promise.all([retrievePersonalCall]).then(() => setLoading(false));
  }, [retrieveMaster]);

  if (loading) return <Loader />;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* <MainCard
          title={'이름'}
          content={false}
          secondary={
            <Stack direction={'row'} spacing={2}>
              <Button color="success" variant="outlined" onClick={() => console.log('인사기본사항_인적사항_이름 입력...')}>
                입력
              </Button>
              <Button variant="outlined" onClick={() => console.log('인사기본사항_인적사항_이름 저장...')}>
                저장
              </Button>
              <CSVExport data={employeeName} filename={`인사기본사항_인적사항_이름_${getDate()}.csv`} />
            </Stack>
          }
        >
          <EditableCell data={employeeName} columns={nameColumns} />
        </MainCard> */}
      </Grid>
      <Grid item xs={12}>
        <DynamicTable
          name="인적사항"
          data={retrievePersonal}
          columns={personalColumns}
          tableType={tableType}
        />
      </Grid>
    </Grid>
  );
};

export default HrInfoPersonal;
