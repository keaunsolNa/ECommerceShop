import { useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

// material-ui
import { Box, Button, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import HrInfoMaster from 'sections/extra-pages/hrinfo/HrInfoMaster';
import { response } from './data';
import axios from 'axios';

const HrInfo = () => {
  const [responseIndex, setResponseIndex] = useState(0);
  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {

    case '/hrinfo/family':
      selectedTab = 3;
      break;

    default:
      selectedTab = 0;
  }
  const [value, setValue] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (calculate) => {
    const lastIndex = response.data.length - 1;
    if (calculate === 'plus') {
      responseIndex > 1 ? setResponseIndex(responseIndex - 1) : setResponseIndex(lastIndex);
    } else if (calculate === 'minus') {
      responseIndex < lastIndex ? setResponseIndex(responseIndex + 1) : setResponseIndex(0);
    }
  };

  useEffect(() => {
    axios.get('/api/hrinfo/personalinfo?uuid=3008948717').then((res) => {
      console.log('hrinfo/personalinfo is : ', res.data);
    });
  }, []);

  return (
    <MainCard title="인사기본사항" border={false} boxShadow>
      <Box>
        <Button onClick={() => handleClick('minus')}>이전</Button>
        <Button onClick={() => handleClick('plus')}>다음</Button>
        <HrInfoMaster response={response.data[responseIndex]} />
      </Box>
      <Box>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
          <Tab label="인사기본" component={Link} to="/hrinfo/basic"></Tab>
          <Tab label="발령" component={Link} to="/hrinfo/appointment"></Tab>
          <Tab label="인적사항" component={Link} to="/hrinfo/personal"></Tab>
          <Tab label="가족" component={Link} to="/hrinfo/family"></Tab>
          <Tab label="주소/전화" component={Link} to="/hrinfo/address"></Tab>
        </Tabs>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default HrInfo;