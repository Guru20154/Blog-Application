import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchData, deleteBlog, parseTags } from '../utils/apiUtils.jsx'; 

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const userResponse = await fetchData(`https://blog-application-sable.vercel.app/api/v1/users/current-user`, 'GET', 'Failed to fetch user details');
        setUserDetails(userResponse.data);

        const blogsResponse = await fetchData(`https://blog-application-sable.vercel.app/api/v1/users/userBlogs`, 'GET', 'Failed to fetch user blogs');
        setBlogs(blogsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error}</Alert>;

  const handleCardClick = (id) => {
    navigate(`/blogs/${id}`); 
  };

  const handleUpdateClick = (id) => {
    navigate(`/update/${id}`); 
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(id); 
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      alert('Blog deleted successfully');
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        {userDetails ? (
          <>
            {userDetails.avatar && (
              <Avatar
                src={userDetails.avatar}
                alt="User Avatar"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            )}
            <Typography variant="h6">Welcome, {userDetails.username}!</Typography>
            <Typography variant="body1">Email: {userDetails.email}</Typography>
            <Typography variant="body1">
              Account Created: {new Date(userDetails.createdAt).toLocaleDateString()}
            </Typography>
          </>
        ) : (
          <Typography variant="body1">No user details found.</Typography>
        )}
      </Box>
      <Box mt={4}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="h5" gutterBottom>
            Your Blogs
          </Typography>
        </Box>

        {blogs.length > 0 ? (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {blogs.map((blog) => {
              const parsedTags = parseTags(blog.tags); 

              return (
                <Card key={blog._id} sx={{ width: 300 }}>
                  {blog.coverImage && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={blog.coverImage || '/placeholder.jpg'}
                      alt={blog.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {blog.description}
                    </Typography>

                    
                    {parsedTags.length > 0 && (
                      <Box mt={2}>
                        <Typography variant="body2" color="textSecondary">
                          Tags:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                          {parsedTags.map((tag, index) => (
                            <Box
                              key={index}
                              sx={{
                                backgroundColor: 'lightblue',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                fontSize: '12px',
                              }}
                            >
                              {tag}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}

                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleCardClick(blog._id)}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleUpdateClick(blog._id)}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(blog._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        ) : (
          <Typography variant="body1">You haven't created any blogs yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
