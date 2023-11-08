import { useEffect, useState } from 'react';

// material-ui
import { Stack, TextField, Typography } from '@mui/material';

// third-party
// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dispatch } from 'store';
import { dispatchCondition } from 'store/reducers/organizationinfo';

// assets

const OrganizationInfoSearchCondition = () => {
  // states
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [organization, setOrganization] = useState(true);
  // functions

  const handleChange = (newDate) => {
    setDate(dayjs(newDate));
  };

  useEffect(() => {
    dispatch(dispatchCondition(date, organization));
    Promise.all([]).then(() => setLoading(false)); // 모든 비동기 작업이 종료되면, 화면을 그린다
  }, [date, organization]);

  if (loading) return <Loader />;
  return (
    <MainCard title="조회조건">
      <Stack direction={'column'} spacing={2}>
        <Stack direction={'column'} spacing={1}>
          <Typography variant="h5" color="inherit">
            기준일자
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              sx={{ width: '200px' }}
              views={['year', 'month', 'day']}
              format="YYYY-MM-DD"
              value={date}
              onChange={handleChange}
            />
          </LocalizationProvider>
        </Stack>
        <Stack direction={'column'}>
          <Typography variant="h5" color="inherit">
            부서
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <TextField label="부서코드" variant="outlined" />
            <TextField label="부서명" variant="outlined" />
          </Stack>
        </Stack>
      </Stack>
    </MainCard>
  );
};
export default OrganizationInfoSearchCondition;
