import numberFormatPrice from '@/utils/numberFormatPrice';
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddressForm from './addressForm';
import Review from './review';
import Shipping from './shipping';

const steps = ['Information', 'Shipping', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Shipping />;
    case 2:
      return <Review />;

    default:
      throw new Error('Unknown step');
  }
}
const Cart = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has
                    shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/cart">
                      <Button variant="contained" color="secondary" sx={{ mt: 3, ml: 1 }}>
                        Return Card
                      </Button>
                    </Link>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
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
