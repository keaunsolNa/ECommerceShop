import { useState, useEffect } from 'react';

// material-ui

// third-party

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import { Typography } from '@mui/material';

// assets

const NoSelected = () => {
  // states
  const [loading, setLoading] = useState(true);

  // functions

  useEffect(() => {
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, []);

  if (loading) return <Loader />;
  return (
    <MainCard>
      <Typography variant="h5" color="primary">
        상위항목을 선택해주세요.
      </Typography>
    </MainCard>
  );
};
export default NoSelected;
