import { useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useSelector, dispatch } from 'store';

// material-ui
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import HrInfoMaster from 'sections/extra-pages/hrinfo/HrInfoMaster';
import { dispatchRetrieve } from 'store/reducers/hrinfo';

const HrInfo = () => {
  const [loading, setLoading] = useState(true);
  const { retrieveMaster } = useSelector((state) => state.hrinfo);
  // const [employeeIndex, setEmployeeIndex] = useState(0);
  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {
    case '/hrinfo/appointment':
      selectedTab = 1;
      break;
    case '/hrinfo/personal':
      selectedTab = 2;
      break;
    case '/hrinfo/family':
      selectedTab = 3;
      break;
    case '/hrinfo/address':
      selectedTab = 4;
      break;
    case '/hrinfo/basic':
    default:
      selectedTab = 0;
  }
  const [value, setValue] = useState(selectedTab);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleClick = (calculate) => {
  //   const lastIndex = retrieve.length - 1;
  //   if (calculate === 'plus') {
  //     employeeIndex < lastIndex ? setEmployeeIndex(employeeIndex + 1) : setEmployeeIndex(0);
  //   } else if (calculate === 'minus') {
  //     employeeIndex > 0 ? setEmployeeIndex(employeeIndex - 1) : setEmployeeIndex(lastIndex);
  //   }
  // };

  useEffect(() => {
    const retrieveCall = dispatch(dispatchRetrieve());
    Promise.all([retrieveCall]).then(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  return (
    <MainCard title="인사기본사항" border={false} boxShadow>
      <Stack sx={{ m: 1 }} spacing={2} direction="row">
        <Button onClick={() => console.log('이전')}>이전</Button>
        <Button onClick={() => console.log('다음')}>다음</Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            console.log('retrieveMaster', retrieveMaster);
          }}
        >
          Redux확인
        </Button>
      </Stack>
      <HrInfoMaster retrieveMaster={retrieveMaster} />
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
        <Tab label="인사기본" component={Link} to="/hrinfo/basic"></Tab>
        <Tab label="발령" component={Link} to="/hrinfo/appointment"></Tab>
        <Tab label="인적사항" component={Link} to="/hrinfo/personal"></Tab>
        <Tab label="가족" component={Link} to="/hrinfo/family"></Tab>
        <Tab label="주소/전화" component={Link} to="/hrinfo/address"></Tab>
      </Tabs>
      <Box>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default HrInfo;
