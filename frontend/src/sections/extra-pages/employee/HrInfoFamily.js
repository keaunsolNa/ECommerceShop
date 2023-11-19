import { useEffect, useState } from 'react';
import { dispatch, useSelector } from 'store';

// material-ui
import { Grid } from '@mui/material';
// third-party
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import DynamicTable from 'components/win/DynamicTable';
// project import
import HrInfoMaster from '../../../pages/extra-pages/employee/EmployeeSelf';
// assets
const OrganizationMember = () => {
  // states
  const [loading, setLoading] = useState(true);
  const retrieveValue = useSelector((state) => state.hrinfo.retrieve);

  // setting states
  const column = [
    {
      Header: '상태',
      accessor: 'rowStatus',
      dataType: 'rowStatus',
      Footer: '상태'
    },
    {
      Header: '번호',
      accessor: 'no',
      dataType: 'no',
      Footer: '번호'
    },
    {
      Header: '성명',
      accessor: 'name',
      dataType: 'text',
      Footer: '성명'
    },
    {
      Header: '주민번호',
      accessor: 'residentRegistrationNumber',
      dataType: 'text',
      Footer: '주민번호'
    },
    {
      Header: '가족관계',
      accessor: 'relationship',
      dataType: 'text',
      Footer: '가족관계',
      hidden: 'true'
    },
    {
      Header: '성별',
      accessor: 'gender',
      dataType: 'text',
      Footer: '성별'
    },
    {
      Header: '생년월일',
      accessor: 'birth',
      dataType: 'text',
      Footer: '생년월일'
    },
    {
      Header: '음양구분',
      accessor: 'lunarOrSolar',
      dataType: 'text',
      Footer: '음양구분'
    },
    {
      Header: '학력',
      accessor: 'education',
      dataType: 'text',
      Footer: '학력'
    },
    {
      Header: '비고',
      accessor: 'note',
      dataType: 'text',
      Footer: '비고'
    },
    {
      Header: '모달',
      accessor: 'modal',
      dataType: 'modalBtn',
      Footer: '모달',
      modalUUID: 'relationship',
      modalComponent: <HrInfoMaster />
    }
  ];
  const tableType = {
    sort: true,
    search: true,
    input: true,
    save: true,
    download: false,
    reducer: {
      updateReducer: 'hrinfo/updatefamily'
    }
  };

  // functions
  useEffect(() => {
    const retrieveCall = dispatch(dispatchRetrieveEmployee('family', 'testId123'));
    Promise.all([retrieveCall]).then(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <Grid>
        <MainCard content={false}>
          <DynamicTable name={'가족사항'} columns={column} data={retrieveValue} tableType={tableType} />
        </MainCard>
      </Grid>
    </div>
  );
};
export default OrganizationMember;
