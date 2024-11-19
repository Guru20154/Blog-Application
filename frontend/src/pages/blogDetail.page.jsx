import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Container, Button } from '@mui/material';
import { fetchData } from '../utils/apiUtils';
import Comments from '../components/comments.jsx'; 

const BlogDetail = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchBlogDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchData(`${process.env.BACKEND_URL}/api/v1/users/blogs/${id}`, 'GET', 'Failed to fetch blog details');
      setBlog(response.blog);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error}</Alert>;

  
  const tags = blog && blog.tags ? JSON.parse(blog.tags) : [];

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        {blog && (
          <>
            <Typography variant="h4" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              By {blog.owner.username}
            </Typography>
            <Typography variant="body1" component={'p'}>
              {blog.description}
            </Typography>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Tags:
              </Typography>
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <Button key={index} variant="outlined" size="small" sx={{ marginRight: 1 }}>
                    {tag}
                  </Button>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No tags available.
                </Typography>
              )}
            </Box>
            <Typography
              variant="body1"
              component="p"
              dangerouslySetInnerHTML={{
                __html: blog.body, 
              }}
            />
          </>
        )}

        
        <Comments blogId={id} />
      </Box>
    </Container>
  );
};

export default BlogDetail;
