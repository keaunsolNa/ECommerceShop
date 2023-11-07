import { useState, useEffect } from 'react';

// material-ui

// third-party

// project import
import Loader from 'components/Loader';
import { Grid } from '@mui/material';
import OrganizationInfoSearchCondition from 'sections/extra-pages/organizationinfo/OrganizationInfoSearchCondition';
import OrganizationInfoTabs from 'sections/extra-pages/organizationinfo/OrganizationInfoTabs';
import OrganizationInfoTree from 'sections/extra-pages/organizationinfo/OrganizationInfoTree';
import { useSelector } from 'store';
import { dispatch } from 'store';
import { dispatchRetrieve } from 'store/reducers/organizationinfo';
import NoSelected from 'sections/extra-pages/NoSelected';

// assets

const OrganizationInfo = () => {
  // states
  const [loading, setLoading] = useState(true);
  const organizationinfo = useSelector((state) => state.organizationinfo.data[0]);
  const [selected, setSelected] = useState(organizationinfo);
  // functions

  useEffect(() => {
    const retrieveCall = dispatch(dispatchRetrieve());
    Promise.all([retrieveCall]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6} sm={6}>
        <OrganizationInfoSearchCondition />
        <OrganizationInfoTree organizationinfo={organizationinfo} setSelected={setSelected} />
      </Grid>
      <Grid item xs={12} lg={6} sm={6}>
        {selected ? <OrganizationInfoTabs selected={selected} /> : <NoSelected />}
      </Grid>
    </Grid>
  );
};
export default OrganizationInfo;
