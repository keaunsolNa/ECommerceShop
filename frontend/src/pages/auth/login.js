import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const { isLoggedIn } = useAuth();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline'
                 sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h3'>Login</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/register'}
              variant='body1'
              sx={{ textDecoration: 'none' }}
              color='primary'
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
          {/*<div style={{ marginTop: 10 }}>*/}
          {/*  <AnimateButton>*/}
          {/*    <Button*/}
          {/*      onClick={kakaoLogin}*/}
          {/*      style={{ backgroundImage: 'url(/kakao_login_large_wide.png)', backgroundSize: '100% 100%', width: '100%', height: 60 }}*/}
          {/*    ></Button>*/}
          {/*  </AnimateButton>*/}
          {/*</div>*/}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
