import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import CategoryApi from '../../../apis/CategoryApi';
import firebase from '../../../utils/firebase';

// material-ui
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import { Alert, Box, Button, Grid, Input, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
// Formik & Yup validate
import { Form, useFormik, Field, Formik } from 'formik';

import * as yup from 'yup';
// project imports
import MainCard from '../../../components/cards/MainCard';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(3, 'Password should be of minimum 3 characters length')
    .required('name is required'),
  slug: yup
    .string('Enter your slug')
    .min(3, 'Slug should be of minimum 3 characters length')
    .required('Slug is required')

});
const useStyles = makeStyles(theme => ({
  imgPreview: {
    display: 'block',
    width: 300,
    height: 300,
    objectFit: 'contain',
    borderRadius: 10,
    border: `1px solid ${theme.palette.secondary.dark}`
    // shadow: theme.shadow,
  }
}));

const AddEdit = () => {
  const classes = useStyles();
  let history = useHistory();
  let { slug: slugParam } = useParams();

  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState(null);

  // console.log(initialValues);
  const initialValues = slugParam ? { name: ' ', slug: '', image: '', _id: '' } : { name: '', slug: '', image: '' };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        // const file = values.image;
        const { _id, image, name, slug } = values;
        console.log(values);

        // kiem tra file anh co ton tai hay k
        if (typeof image === 'string') {

          // kiem tra co slug hay k
          if (slugParam) {
            console.log('start slugParam = true');
            await CategoryApi.edit(_id, { name, slug, image });
            console.log('end slugParam = true');

          } else {
            console.log('start slugParam = false');
            await CategoryApi.add({ ...values, image });
            console.log('end slugParam = false');
          }

        } else {
          let storageRef = await firebase.storage().ref(`images/${image.name}`);
          await storageRef.put(image);
          const imgUrlFirebase = await storageRef.getDownloadURL();
          if (slugParam) {
            await CategoryApi.edit(_id, { name, slug, image: imgUrlFirebase });
          } else {
            await CategoryApi.add({ ...values, image: imgUrlFirebase });
          }
        }

        setOpen(true);
        // console.log(data);
        // history.push('/admin/category');
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
        const { data } = await CategoryApi.getOne(slugParam);

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
    if (typeof formik.values.image === 'object') {
      setImg(URL.createObjectURL(formik.values.image));
    } else if (typeof formik.values.image === 'string') {
      setImg(formik.values.image);
    }
  }, [formik.values.image]);

  return (
    <MainCard title='Create Category'>
      <Toolbar
        sx={{
          pl: { sm: 0 },
          pr: { xs: 1, sm: 1 },
          flex: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Link to='/admin/category'>
          <Tooltip title='Back'>
            <Button variant='text'
                    sx={{
                      ml: 1,
                      color: 'primary.light',
                      bgcolor: 'grey.700',
                      '&:hover': {
                        bgcolor: 'grey.900'
                      }
                    }}
            >
              Back
            </Button>
          </Tooltip>
        </Link>
      </Toolbar>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='name'
                  name='name'
                  label='Category'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='slug'
                  name='slug'
                  label='Slug'
                  type='text'
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  error={formik.touched.slug && Boolean(formik.errors.slug)}
                  helperText={formik.touched.slug && formik.errors.slug}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor='image'>
                  <Input
                    fullWidth
                    id='image'
                    name='image'
                    label='Image'
                    type='file'
                    accept='image/*'
                    onChange={
                      (e) => {
                        formik.handleChange(e);
                        formik.setFieldValue('image', e.target.files[0]);
                      }
                    }
                    sx={{ display: 'none' }}
                    // error={formik.touched.slug && Boolean(formik.errors.slug)}
                    // helperText={formik.touched.slug && formik.errors.slug}
                  />
                  <Button variant='contained' component='span' fullWidth endIcon={<FileUploadIcon />}>
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/*<Field component={SimpleFileUpload} name="file" label="Simple File Upload" />;*/}
            <Box sx={{ overflow: 'hidden', p: 6 }}>
              <img className={img ? classes.imgPreview : null} src={img} alt={img ? img.alt : 'no image'}
                   loading='lazy' />
            </Box>
          </Grid>
        </Grid>
        <Button color='primary' variant='contained' type='button' onClick={() => formik.resetForm()}>
          Reset
        </Button>
        <Button color='primary' variant='contained' type='submit'>
          {isSubmitting && <CircularProgress size={25} color='secondary' />}
          {isSubmitting || 'Submit'}

        </Button>

      </form>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => {setOpen(false);}}
        autoHideDuration={6000}
        // onClose={handleClose}
        message='Upload anh thanh cong'
        // action={action}
      >
        <Alert variant='filled' severity='success' sx={{ width: '100%' }}>
          Add successfully
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default AddEdit;
