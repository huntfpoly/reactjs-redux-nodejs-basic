import { createSlice } from '@reduxjs/toolkit';
import { getCartItems, setCartItems } from '@/utils/localstorage';

const initialState = {
  information: '',
  shipping: ''
};
const checkoutSlices = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addInformation: (state, { payload }) => {},
    addShipping: (state, { payload }) => {}
  }
});
const { reducer, actions } = checkoutSlices;

export const { addToCard, removeItem, addQuantity, subQuantity, addShipping } = actions;

export default reducer;
