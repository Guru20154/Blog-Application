import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home.page.jsx';
import Profile from './pages/profile.page.jsx';
import Navbar from './components/navbar.jsx';
import Signup from './pages/signup.page.jsx';
import Login from './pages/login.page.jsx';
import CreateBlog from './pages/createBlog.page.jsx';
import BlogDetail from './pages/blogDetail.page.jsx';
import UpdateBlog from './pages/updateBlog.page.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/create-blog',
      element: <CreateBlog />,
    },
    {
      path: "/blogs/:id",
      element: <BlogDetail />,
    },
    {
      path: "/update/:id",
      element: <UpdateBlog />,
    }
  ]
);

const App = () => {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
