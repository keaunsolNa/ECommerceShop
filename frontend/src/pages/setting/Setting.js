import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import OrganizationSetting from 'sections/setting/OrganizationSetting';

// ================================|| LOGIN ||================================ //

const Setting = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline'
                 sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h3'>조직 설정</Typography>
            <Typography
              component={Link}
              variant='body1'
              sx={{ textDecoration: 'none' }}
              color='primary'
              onClick={() => alert('도움말 모달')}
            >
              도움말
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <OrganizationSetting />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Setting;
