import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper from './../components/AuthWrapper';
import AuthCardWrapper from './../components/AuthCardWrapper';
import Logo from './../components/Logo';
import RegisterComponent from '../components/FirebaseRegister';
// import AuthFooter from './../../../../components/cards/AuthFooter';
// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Register = () => {
  const theme = useTheme();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSignup, setIsSignup] = React.useState(false);
  const handleOnSignup = () => {
    setIsSignup(true);
  };
  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                {!isSignup ? (
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <RouterLink to="#">
                        <Logo />
                      </RouterLink>
                    </Grid>
                    <Grid item xs={12}>
                      <RegisterComponent handleSignup={handleOnSignup} />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography component={RouterLink} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                          Have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <div>Đăng ký thành công, vui lòng kiểm tra hộp thư xác thực mail đã đăng ký</div>
                )}
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Register;
