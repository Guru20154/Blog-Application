import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  blogs: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
    },
  },
});

export const {
  setUserDetails,
  setBlogs,
  setLoading,
  setError,
  removeBlog,
} = userSlice.actions;

export default userSlice.reducer;
