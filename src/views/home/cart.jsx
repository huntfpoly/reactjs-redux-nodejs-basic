import { addQuantity, subQuantity, removeItem } from '@/feautures/cart/cartSlice';
import numberFormatPrice from '@/utils/numberFormatPrice';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleAddQuantityCartItem = async (product) => {
    // console.log(product);
    const action = addQuantity(product);
    await dispatch(action);
  };
  const handleSubQuantityCartItem = async (product) => {
    // console.log(product);
    const action = subQuantity(product);
    await dispatch(action);
  };
  const handleRemoveCartItem = async (product) => {
    const action = removeItem(product);
    await dispatch(action);
  };
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Products </TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!cartItems.length && <CircularProgress />}
                {cartItems.length > 0 &&
                  cartItems.map((row) => (
                    <TableRow key={row._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', my: 2, borderRadius: '3px' }}>
                          <CardMedia sx={{ width: 120 }} image={row.photo} title={row.name} />
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h5">
                                {row.name}
                              </Typography>
                            </CardContent>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <IconButton
                            onClick={(e) => {
                              handleSubQuantityCartItem(row);
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{row.quantity}</Typography>
                          <IconButton
                            onClick={(e) => {
                              handleAddQuantityCartItem(row);
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{numberFormatPrice(row.total)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={(e) => {
                            handleRemoveCartItem(row);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box xs={{ display: 'flex', flexDirection: 'column', border: '1px solid red' }}>
            <Typography variant="h3" align="center" color="primary">
              Order Summary
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5em' }}>
              <Typography variant="h5" align="left">
                Sub total:
              </Typography>
              <Typography variant="h5" align="left">
                {numberFormatPrice(cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0))}
              </Typography>
            </Box>
            <Link to="/checkout">
              <Button fullWidth variant="contained" sx={{ borderRadius: 5 }}>
                Process to checkout
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Cart;
