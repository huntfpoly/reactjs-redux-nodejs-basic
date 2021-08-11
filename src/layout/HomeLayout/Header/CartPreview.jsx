import * as React from 'react';
import Box from '@material-ui/core/Box';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography, Divider, Card, CardMedia, CardContent, Drawer, IconButton, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { addQuantity, subQuantity } from './../../../feautures/cart/cartSlice';
import numberFormatPrice from '../../../utils/numberFormatPrice';
import { Link } from 'react-router-dom';
const CartPreview = () => {
  const [open, setOpen] = React.useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartItems);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleAddQuantityCartItem = async (product) => {
    console.log(product);
    const action = addQuantity(product);
    await dispatch(action);
  };
  const handleSubQuantityCartItem = async (product) => {
    console.log(product);
    const action = subQuantity(product);
    await dispatch(action);
  };
  // const handleAddQuantityItem =
  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer(true)}>
        <ShoppingBasketIcon />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 350, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box>
            <Typography variant="h2" align="center" color="primary" sx={{ py: '20px' }}>
              Cart
            </Typography>
            <Divider />
          </Box>
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
                        {numberFormatPrice(item.price)}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                          onClick={(e) => {
                            handleSubQuantityCartItem(item);
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          onClick={(e) => {
                            handleAddQuantityCartItem(item);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>{numberFormatPrice(item.total)}</Box>
                </Card>
              ))}
          </Box>
          <Box>
            <Divider />
            <Typography variant="h2" align="center" color="primary" sx={{ py: '20px' }}>
              Total: {numberFormatPrice(cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0))}
            </Typography>

            <Link to="/cart">
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                View Card
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default CartPreview;
