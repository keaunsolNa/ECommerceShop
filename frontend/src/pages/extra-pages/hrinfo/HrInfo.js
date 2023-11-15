import { useEffect, useState } from 'react';
import { dispatch, useSelector } from 'store';

// material-ui

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import HrInfoMaster from 'sections/extra-pages/hrinfo/HrInfoMaster';
import { dispatchRetrieveEmployee } from '../../../store/reducers/emp/employee';

const HrInfo = () => {
  const [loading, setLoading] = useState(true);
  const retrieveMaster = useSelector((state) => state.employee.data);

  useEffect(() => {
    const retrieveCall = dispatch(dispatchRetrieveEmployee('empBase', 'testId123'));
    Promise.all([retrieveCall]).then(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  return (
    <MainCard title="인사기본사항" border={false} boxShadow>
      <HrInfoMaster retrieveMaster={retrieveMaster} />
    </MainCard>
  );
};

export default HrInfo;
