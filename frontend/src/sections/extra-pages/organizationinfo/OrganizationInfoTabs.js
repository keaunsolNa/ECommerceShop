import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// third-party
// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';

// assets

const OrganizationInfoTabs = ({ selected }) => {
  // states
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {
    case '/organizationinfo/appointment':
      selectedTab = 1;
      break;
    case '/organizationinfo/personal':
      selectedTab = 2;
      break;
    case '/organizationinfo/family':
      selectedTab = 3;
      break;
    case '/organizationinfo/address':
      selectedTab = 4;
      break;
    case '/organizationinfo/basic':
    default:
      selectedTab = 0;
  }
  const [value, setValue] = useState(selectedTab);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // functions

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return (
    <MainCard sx={{ height: 800 }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab" sx={{ mb: 1 }}>
        <Tab label="조직기본" component={Link} to="/organizationinfo/basic"></Tab>
        <Tab label="변경이력" component={Link} to="/organizationinfo/history"></Tab>
        <Tab label="주소변경" component={Link} to="/organizationinfo/addresschange"></Tab>
      </Tabs>
      <Box>
        <Outlet context={selected} />
      </Box>
    </MainCard>
  );
};
export default OrganizationInfoTabs;
