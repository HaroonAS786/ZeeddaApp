import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isOnBoard: true,
  user: {},
  item: [],
  amount: 0,
  call: false,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.isLoggedIn = true;
      state.isOnBoard = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.isOnBoard = false;
    },
    CartItem: (state, action) => {
      state.item = action.payload;
    },
    CartAmount: (state, action) => {
      state.amount = action.payload;
    },
    CallEffect: (state, action) => {
      state.call = action.payload;
    },
  },
});

export const {setUserData, logout, CartItem, CartAmount, CallEffect} =
  auth.actions;
export default auth;
