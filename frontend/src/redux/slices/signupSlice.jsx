import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signup = createAsyncThunk('auth/signup', async (formDataToSend, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users/register`, {
      method: 'POST',
      body: formDataToSend,
    });
    const data = await response.json();
    
    if (!data.success) {
      return rejectWithValue(data.message || 'Sign-up failed. Please try again.');
    }
    return data;
  } catch (error) {
    return rejectWithValue('An error occurred. Please try again later.');
  }
});

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSignupState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;
