import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import registerReducer from '@/feautures/auth/registerSlice';
import loginReducer from '@/feautures/auth/loginSlice';
import userReducer from '@/store/userSlice';
import cartReducer from '@/feautures/cart/cartSlice';
import checkoutReducer from '@/feautures/cart/checkoutSlice';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer
  }
});
export default store;
