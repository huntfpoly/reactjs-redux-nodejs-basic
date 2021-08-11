import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  status: '',
  message: ''
};

const registerSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    registerPending: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = 'success';
      state.message = payload;
    },
    registerError: (state, { payload }) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = payload;
    }
  }
});

const { reducer, actions } = registerSlice;

export const {
  registerPending,
  registerSuccess,
  registerError
} = actions;

export default reducer;
