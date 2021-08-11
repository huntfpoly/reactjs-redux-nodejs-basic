import React from 'react';
import UserApi from '@/apis/UserApi';
// project imports
import MainCard from '@/components/cards/MainCard';
import firebase from '@/utils/firebase';
import { Alert, Box, Button, CircularProgress, Grid, Input } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import { makeStyles } from '@material-ui/styles';
// Formik & Yup validate
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '@/store/userSlice';

import * as yup from 'yup';

const validationSchema = yup.object({
  firstName: yup.string().max(255).required('firstName is required'),
  lastName: yup.string().max(255).required('lastName is required')
});
const useStyles = makeStyles((theme) => ({
  imgPreview: {
    display: 'block',
    width: '100%',
    // height: 300,
    objectFit: 'contain',
    borderRadius: 10,
    border: `1px solid ${theme.palette.secondary.dark}`
    // shadow: theme.shadow,
  }
}));

const Profile = () => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState(null);

  // console.log(initialValues);
  const initialValues = { firstName: '', lastName: '', avatar: '', _id: '' };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        // const file = values.image;
        const { _id, firstName, lastName, avatar } = values;
        if (typeof avatar === 'string') {
          console.log('start image string', { firstName, lastName });
          const { data } = await UserApi.update(_id, { firstName, lastName });
          console.log('end image string', data);
        } else {
          let storageRef = await firebase.storage().ref(`images/${avatar.name}`);
          await storageRef.put(avatar);
          const imgUrlFirebase = await storageRef.getDownloadURL();
          await UserApi.update(_id, { firstName, lastName, avatar: imgUrlFirebase });
        }

        setOpen(true);
        dispatch(getMe());
        actions.setSubmitting(false);

        console.log('end On submit');
      } catch (e) {
        console.log(e);
      }
    }
  });

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await UserApi.getUser();

        for (const dataKey in formik.initialValues) {
          if (formik.initialValues.hasOwnProperty(dataKey)) {
            await formik.setFieldValue(dataKey, data[dataKey], false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const { isSubmitting } = formik;
  // Preview image
  React.useEffect(() => {
    // console.log(typeof formik.values.image);
    if (typeof formik.values.avatar === 'object') {
      setImg(URL.createObjectURL(formik.values.avatar));
    } else if (typeof formik.values.avatar === 'string') {
      setImg(formik.values.avatar);
    }
  }, [formik.values.avatar]);

  return (
    <MainCard title="Information  ">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label htmlFor="avatar">
                  <Input
                    fullWidth
                    id="avatar"
                    name="avatar"
                    label="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue('avatar', e.target.files[0]);
                    }}
                    sx={{ display: 'none' }}
                    // error={formik.touched. && Boolean(formik.errors.slug)}
                    // helperText={formik.touched. && formik.errors.slug}
                  />
                  <Button variant="contained" component="span" fullWidth endIcon={<FileUploadIcon />}>
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/*<Field component={SimpleFileUpload} name="file" label="Simple File Upload" />;*/}
            <Box sx={{ overflow: 'hidden', p: 6 }}>
              <img className={img ? classes.imgPreview : null} src={img} alt={img ? img.alt : 'no image'} loading="lazy" />
            </Box>
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          {isSubmitting && <CircularProgress size={25} color="secondary" />}
          {isSubmitting || 'update'}
        </Button>
      </form>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Upload anh thanh cong"
        // action={action}
      >
        <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
          Add successfully
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default Profile;
