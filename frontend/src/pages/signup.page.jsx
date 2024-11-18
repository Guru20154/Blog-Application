import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { signup, resetSignupState } from '../redux/slices/signupSlice';
import { login } from '../redux/slices/authSlice'; 
const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.signup);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username || !avatar) {
      alert('All fields, including avatar, are required!');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('avatar', avatar);

    dispatch(signup(formDataToSend));
  };

  useEffect(() => {
    if (success) {
      dispatch(login()); 
      window.location.href = '/login';
      dispatch(resetSignupState());
    }
  }, [success, dispatch]);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Box display="flex" alignItems="center" mt={2}>
            <Button variant="contained" component="label" fullWidth sx={{ mr: 2 }}>
              Upload Avatar
              <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </Button>
            {avatar && <CheckCircleIcon color="success" />}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
