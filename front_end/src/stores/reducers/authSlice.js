import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token)
    },

    update: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token')
    },
  },
});

export const { login, logout, update } = authSlice.actions;
export default authSlice.reducer;
