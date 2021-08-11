import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@material-ui/core';
// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// material-ui
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// third party
import * as Yup from 'yup';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';
// import Google from './../../../../assets/images/icons/social-google.svg';
import AnimateButton from './../components/AnimateButton';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { registerPending, registerSuccess, registerError } from '@/feautures/auth/registerSlice';
import UserApi from '@/apis/UserApi';

// style constant
const useStyles = makeStyles((theme) => ({
  redButton: {
    fontSize: '1rem',
    fontWeight: 500,
    backgroundColor: theme.palette.grey[50],
    border: '1px solid',
    borderColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem'
    }
  },
  signDivider: {
    flexGrow: 1
  },
  signText: {
    cursor: 'unset',
    margin: theme.spacing(2),
    padding: '5px 56px',
    borderColor: theme.palette.grey[100] + ' !important',
    color: theme.palette.grey[900] + '!important',
    fontWeight: 500
  },
  loginIcon: {
    marginRight: '16px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px'
    }
  },
  loginInput: {
    ...theme.typography.customInput
  }
}));

//===========================|| FIREBASE - REGISTER ||===========================//

const RegisterComponent = ({ handleSignup, ...others }) => {
  const classes = useStyles();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState('');
  const [error, setError] = React.useState('');

  const registerState = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    // changePassword('123456');
  }, []);

  return (
    <React.Fragment>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="red">
          {registerState.message}
        </Typography>
      </Box>

      <Formik
        initialValues={{
          firstName: 'Pham',
          lastName: 'Hieu',
          email: 'hieunuce13@gmail.com',
          password: '123456'
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          firstName: Yup.string().max(255).required('firstName is required'),
          lastName: Yup.string().max(255).required('lastName is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: true });
            dispatch(registerPending());
            await UserApi.register(values);

            dispatch(registerSuccess());
            handleSignup();
            setError('');
          } catch (err) {
            dispatch(registerError(err.response.data.error.message));

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} className={classes.loginInput}>
                  <InputLabel htmlFor="firstName-register">First Name</InputLabel>
                  <OutlinedInput
                    id="firstName-register"
                    type="text"
                    value={values.firstName}
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText error id="firstName-register">
                      {errors.firstName}{' '}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>{' '}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} className={classes.loginInput}>
                  <InputLabel htmlFor="lastName-register">First Name</InputLabel>
                  <OutlinedInput
                    id="lastName-register"
                    type="text"
                    value={values.lastName}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText error id="lastName-register">
                      {' '}
                      {errors.lastName}{' '}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}{' '}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}{' '}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box
                  sx={{
                    mb: 2
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        backgroundColor={level.color}
                        sx={{
                          width: 85,
                          height: 8,
                          borderRadius: '7px'
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 2
              }}
            >
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {registerState.isLoading && <CircularProgress />}
                  {!registerState.isLoading && `Sign up`}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default RegisterComponent;
