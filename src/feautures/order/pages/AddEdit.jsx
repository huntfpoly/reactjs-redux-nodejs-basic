import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import ProductApi from '../../../apis/ProductApi';
import firebase from '../../../utils/firebase';

// material-ui
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import {
  Alert,
  Box,
  Button,
  Grid,
  Input,
  CircularProgress,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
// Formik & Yup validate
import { useFormik } from 'formik';

import * as yup from 'yup';
// project imports
import MainCard from '../../../components/cards/MainCard';
import CategoryApi from '../../../apis/CategoryApi';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('name is required'),
  slug: yup
    .string('Enter your slug')
    .min(3, 'Slug should be of minimum 3 characters length')
    .required('slug is required'),
  price: yup
    .number('Enter your price')
    .required('price is required'),
  category_id: yup
    .string()
    .required('Category is required'),
  description: yup
    .string('Enter your description')
    .required('description is required'),
  photo: yup
    .string('Enter your photo')
    .required('Slug is required'),
  quantity: yup
    .number('Enter your quantity')
    .required('quantity is required')
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

  const [category, setCategory] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState(null);

  const initialValues = slugParam ? {
    name: '',
    slug: '',
    price: '',
    description: '',
    category_id: '',
    photo: '', quantity: '',
    _id: ''
  } : {
    name: 'iphone 12', slug: 'iphone12', price: '12345', category_id: '',
    description: 'description', photo: '', quantity: '12'
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        // const file = values.image;
        const { _id, name, slug, price, description,quantity, category_id, photo } = values;
        console.log(values);

        // kiem tra file anh co ton tai hay k
        if (typeof photo === 'string') {

          // kiem tra co slug hay k
          if (slugParam) {
            console.log('start slugParam = true');
            await ProductApi.edit(_id, { name, slug, price,quantity, category_id, description });
            console.log('end slugParam = true');

          } else {
            console.log('start slugParam = false');
            await ProductApi.add({ ...values, photo });
            console.log('end slugParam = false');
          }

        } else {
          let storageRef = await firebase.storage().ref(`images/${photo.name}`);
          await storageRef.put(photo);
          const imgUrlFirebase = await storageRef.getDownloadURL();

          if (slugParam) {
            await ProductApi.edit(_id, { name, slug, price,quantity, description, photo: imgUrlFirebase });
          } else {
            console.log('start add');
            await ProductApi.add({ ...values, photo: imgUrlFirebase });
            console.log('end add');
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
    if (slugParam) {
      (async () => {
        try {
          const { data } = await ProductApi.getOne(slugParam);

          for (const dataKey in formik.initialValues) {
            if (formik.initialValues.hasOwnProperty(dataKey)) {
              await formik.setFieldValue(dataKey, data[dataKey], false);
            }
          }
          await console.log(formik.values);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  const { isSubmitting } = formik;
  // Preview image
  React.useEffect(() => {
    (async function() {
      const { data } = await CategoryApi.getAll();
      setCategory(data);
    })();
    // console.log(typeof formik.values.image);
    if (typeof formik.values.photo === 'object') {
      setImg(URL.createObjectURL(formik.values.photo));
    } else if (typeof formik.values.photo === 'string') {
      setImg(formik.values.photo);
    }
  }, [formik.values.photo]);

  return (
    <MainCard title='Create Product'>
      <Toolbar
        sx={{
          pl: { sm: 0 },
          pr: { xs: 1, sm: 1 },
          flex: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Link to='/admin/product'>
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
                <TextField fullWidth id='name' name='name' label='Product'
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.name && Boolean(formik.errors.name)}
                           helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth id='slug' name='slug' label='Slug' type='text'
                           value={formik.values.slug}
                           onChange={formik.handleChange}
                           error={formik.touched.slug && Boolean(formik.errors.slug)}
                           helperText={formik.touched.slug && formik.errors.slug}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth id='price' name='price' label='Price'
                           value={formik.values.price}
                           onChange={formik.handleChange}
                           error={formik.touched.price && Boolean(formik.errors.price)}
                           helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth id='description' name='description' label='Description' type='text'
                           value={formik.values.description}
                           onChange={formik.handleChange}
                           error={formik.touched.description && Boolean(formik.errors.description)}
                           helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth id='quantity' name='quantity' label='Quantity' type='text'
                           value={formik.values.quantity}
                           onChange={formik.handleChange}
                           error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                           helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth
                           label='Category'
                           id='category_id'
                           error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                           helperText={formik.touched.category_id && formik.errors.category_id}// value={handle}
                           select
                           value={formik.values.category_id}
                           onChange={formik.handleChange('category_id')}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {category && category.map(option => (
                    <MenuItem key={option._id} value={option._id}> {option.name}</MenuItem>
                  ))}
                </TextField>
                {/*<FormHelperText>{(formik.errors.category_id && formik.touched.category_id) && formik.errors.category_id}</FormHelperText>*/}

              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor='photo'>
                  <Input fullWidth id='photo' name='photo' label='Photo' type='file'
                         accept='image/*'
                         onChange={
                           (e) => {
                             formik.handleChange(e);
                             formik.setFieldValue('photo', e.target.files[0]);
                           }
                         }
                         sx={{ display: 'none' }}
                    // error={formik.touched.images && Boolean(formik.errors.images)}
                    // helperText={formik.touched.images && formik.errors.images}
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
