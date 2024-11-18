// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import signupReducer from './slices/signupSlice';
import userReducer from './slices/userSlice.jsx';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
