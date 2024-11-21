// src/components/navbar.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';
import { Box, Button, Link, Typography, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300, 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#1976d2',
        color: 'white',
        boxShadow: 3,
        height: '60px', 
      }}
    >
      <Typography variant="h6">Blog Platform</Typography>

    
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 2,
        }}
      >
        {isAuthenticated ? (
          <>
            <Link href="/" color="inherit" underline="none">
              <Button color="inherit">Home</Button>
            </Link>
            <Link href="/create-blog" color="inherit" underline="none">
              <Button color="inherit">Create Blog</Button>
            </Link>
            <Link href="/profile" color="inherit" underline="none">
              <Button color="inherit">Profile</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/" color="inherit" underline="none">
              <Button color="inherit">Home</Button>
            </Link>
            <Link href="/login" color="inherit" underline="none">
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/signup" color="inherit" underline="none">
              <Button color="inherit">Sign Up</Button>
            </Link>
          </>
        )}
      </Box>

      
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <Box
            sx={{
              zIndex: 2000,
              width: 250,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={() => toggleDrawer(false)}
              sx={{
                alignSelf: 'flex-end',
              }}
            >
              <CloseIcon />
            </IconButton>

            {isAuthenticated ? (
              <>
                <Link href="/" color="inherit" underline="none">
                  <Button color="inherit" fullWidth onClick={() => toggleDrawer(false)}>
                    Home
                  </Button>
                </Link>
                <Link href="/create-blog" color="inherit" underline="none">
                  <Button color="inherit" fullWidth onClick={() => toggleDrawer(false)}>
                    Create Blog
                  </Button>
                </Link>
                <Link href="/profile" color="inherit" underline="none">
                  <Button color="inherit" fullWidth onClick={() => toggleDrawer(false)}>
                    Profile
                  </Button>
                </Link>
                <Button
                  color="inherit"
                  fullWidth
                  onClick={() => {
                    handleLogout();
                    toggleDrawer(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/" color="inherit" underline="none">
                  <Button color="inherit" fullWidth onClick={() => toggleDrawer(false)}>
                    Home
                  </Button>
                </Link>
                <Link href="/login" color="inherit" underline="none">
                  <Button color="inherit" fullWidth onClick={() => toggleDrawer(false)}>
                    Login
                  </Button>
                </Link>
                <Link href="/signup" color="inherit" underline="none">
                  <Button color="inherit" fullWidth onClick={() => toggleDrawer(false)}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
