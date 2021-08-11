import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from '../apis/UserApi';

export const getMe = createAsyncThunk('user/user', async (params, thunkAPI) => {
  // thunkAPI.dispatch()
  // console.log(thunkAPI)
  const { data: user } = await UserApi.getUser();
  return user;
});

const initialState = {
  user: {},
  isLoading: false,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    }
  },
  extraReducers: {
    [getMe.pending]: (state) => {
      state.isLoading = true;
    },
    [getMe.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getMe.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.error) {
        state.error = payload.error.message;
      } else {
        state.user = payload;
      }
    }
  }
});

const { reducer, actions } = userSlice;
export const { clearUser } = actions;
export default reducer;
