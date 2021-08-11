import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isAuth: false,
  error: ''
};
// include reducer + action
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = '';
    },
    loginFail: (state, action) => {
      // console.log(action)
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      // console.log(action)
      // state.isLoading = true;
      state.isAuth = false;
      localStorage.removeItem('accessToken');
      // localStorage.removeItem('cartItems');
    }
  }
});

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFail, logout } = actions;

export default reducer;
