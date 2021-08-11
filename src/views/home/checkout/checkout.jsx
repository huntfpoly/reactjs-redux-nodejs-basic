import numberFormatPrice from '@/utils/numberFormatPrice';
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddressForm from './addressForm';
import { clearCart } from '@/feautures/cart/cartSlice';
const Cart = () => {
  const [activePlaceOrder, setActivePlaceOrder] = React.useState(false);
  const [order, setOrder] = React.useState('');
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handlePlaceOrder = (result) => {
    setActivePlaceOrder(true);
    // console.log(result.newOrder);
    setOrder(result.newOrder._id);
    dispatch(clearCart());
  };
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>

            <React.Fragment>
              {activePlaceOrder ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">Your order number is #{order}.</Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <AddressForm handleSubmitPlaceOrder={handlePlaceOrder} />
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box xs={{ display: 'flex', flexDirection: 'column', border: '1px solid red' }}>
            <Box sx={{ m: 1.5 }}>
              <Box sx={{ fontSize: '1.5em' }}>Items: {cartItems.reduce((a, c) => a + c.quantity, 0)}</Box>

              {cartItems &&
                cartItems.map((item) => (
                  <Card key={item._id} sx={{ display: 'flex', boxShadow: 5, my: 2, borderRadius: '3px' }}>
                    <CardMedia sx={{ width: 120 }} image={item.photo} title={item.name} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" color="primary">
                          {item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="secondary" component="p">
                          {numberFormatPrice(item.price)} x {item.quantity}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>{numberFormatPrice(item.total)}</Box>
                  </Card>
                ))}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5em' }}>
              <Typography variant="h5" align="left">
                Sub total:
              </Typography>
              <Typography variant="h5" align="left">
                {numberFormatPrice(cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0))}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Cart;
