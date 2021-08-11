import * as React from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import OrderApi from '@/apis/OrderApi';

const validationSchema = yup.object({
  firstName: yup.string('Enter your first name').required('name is required'),
  lastName: yup.string('Enter your last name').required('last name is required'),
  address: yup.string('Enter your address').required('address is required'),
  phoneNumber: yup.string('Enter your phone number').required('phone number is required')
});

export default function AddressForm({ handleSubmitPlaceOrder }) {
  const initialValues = { firstName: 'pv', lastName: 'hieu', address: 'TB', phoneNumber: '0962370557' };
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const { data } = await OrderApi.createOrder({ ...values, data: cartItems, userId: user._id });
        await handleSubmitPlaceOrder(data);
        // console.log(handleSubmitPlaceOrder());
        actions.setSubmitting(false);

        console.log('end On submit');
      } catch (e) {
        console.log(e);
      }
    }
  });
  const { isSubmitting, handleChange, touched, errors, values, handleSubmit } = formik;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="standard"
              id="firstName"
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
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
              value={values.lastName}
              onChange={handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="standard"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="standard"
              id="address"
              name="address"
              label="Address"
              value={values.address}
              onChange={handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/cart">
            <Button variant="contained" type="button" color="secondary" sx={{ mt: 3, ml: 1 }}>
              Return Card
            </Button>
          </Link>
          <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
            {isSubmitting && <CircularProgress size={25} color="secondary" />}
            Place order
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
}
