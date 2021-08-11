import { createSlice } from '@reduxjs/toolkit';
import { cleanCart, getCartItems, setCartItems } from '../../utils/localstorage';

// const itemLocalStorage = getCartItems();
const initialState = {
  cartItems: getCartItems()
  // cartTotalPrice: 0,
  // cartQuantity: 0
};
// include reducer + action
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCard: (state, { payload }) => {
      const { _id, name, price, photo } = payload;

      const stateCardItem = state.cartItems;
      let existed_item = stateCardItem.findIndex((item) => _id === item._id);

      if (existed_item !== -1) {
        stateCardItem[existed_item].quantity += 1;
        stateCardItem[existed_item].total += stateCardItem[existed_item].price;
        console.log(stateCardItem);

        setCartItems(state.cartItems);
      } else {
        let newItem = { _id, name, price, photo };
        newItem['quantity'] = 1;
        newItem['total'] = newItem.price;
        console.log(newItem);
        // stateCardItem.push(newItem);
        // console.log(stateCardItem);
        setCartItems([...state.cartItems, { ...newItem }]);

        return {
          ...state,
          cartItems: [...state.cartItems, { ...newItem }]
        };
      }
    },
    removeItem: (state, { payload }) => {
      const stateCardItem = state.cartItems;
      let newStateCardItem = stateCardItem.filter((item) => payload._id !== item._id);
      // const newStateCardItem = stateCardItem.find(existed_item);
      // console.log(existed_item);
      setCartItems([...newStateCardItem]);

      return {
        ...state,
        cartItems: [...newStateCardItem]
      };
    },
    addQuantity: (state, { payload }) => {
      const stateCardItem = state.cartItems;
      let existed_item = stateCardItem.findIndex((item) => payload._id === item._id);
      stateCardItem[existed_item].quantity += 1;
      stateCardItem[existed_item].total += stateCardItem[existed_item].price;
    },
    subQuantity: (state, { payload }) => {
      const stateCardItem = state.cartItems;
      let existed_item = stateCardItem.findIndex((item) => payload._id === item._id);
      if (stateCardItem[existed_item].quantity > 1) {
        stateCardItem[existed_item].quantity -= 1;
        stateCardItem[existed_item].total -= stateCardItem[existed_item].price;
      }
      return;
    },
    clearCart: (state, { payload }) => {
      state.cartItems = [];
      cleanCart();
    }
  }
});

const { reducer, actions } = cartSlice;

export const { addToCard, removeItem, addQuantity, subQuantity, clearCart } = actions;

export default reducer;
