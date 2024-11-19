import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/apiUtils.jsx'; 

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagQuery, setTagQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchMoreBlogs = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(`https://blog-application-sable.vercel.app/api/v1/users/blogs?page=${page}&limit=5`);
      
      setBlogs((prev) => [...prev, ...data.blogs]);
      setHasMore(data.blogs.length > 0); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreBlogs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    
    let filtered = blogs;

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((blog) => {
        let parsedTags = [];
        try {
          parsedTags = JSON.parse(blog.tags);
        } catch {}

        return (
          (blog.title && blog.title.toLowerCase().includes(lowercasedQuery)) ||
          (blog.description && blog.description.toLowerCase().includes(lowercasedQuery)) ||
          (blog.owner && blog.owner.username && blog.owner.username.toLowerCase().includes(lowercasedQuery)) ||
          (parsedTags && parsedTags.some((tag) => tag.toLowerCase().includes(lowercasedQuery)))
        );
      });
    }

    if (tagQuery) {
      const lowercasedTagQuery = tagQuery.toLowerCase().split(',').map((tag) => tag.trim());
      filtered = filtered.filter((blog) => {
        let parsedTags = [];
        try {
          parsedTags = JSON.parse(blog.tags);
        } catch {
          parsedTags = [];
        }

        return parsedTags.some((tag) =>
          lowercasedTagQuery.some((queryTag) =>
            tag.toLowerCase().includes(queryTag) || queryTag.includes(tag.toLowerCase())
          )
        );
      });
    }

    setFilteredBlogs(filtered);
  }, [searchQuery, tagQuery, blogs]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleCardClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTagChange = (event) => {
    setTagQuery(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          All Blogs
        </Typography>

        
        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          <input
            type="text"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '40%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            placeholder="Filter by Tags (comma-separated)..."
            value={tagQuery}
            onChange={handleTagChange}
            style={{
              width: '40%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {filteredBlogs.length === 0 ? (
          <Typography variant="h6" color="textSecondary" align="center">
            No matching blogs found.
          </Typography>
        ) : (
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" alignItems="center">
            {filteredBlogs.map((blog) => {
              let parsedTags = [];
              try {
                parsedTags = JSON.parse(blog.tags);
              } catch {
                parsedTags = [];
              }

              return (
                <Card
                  key={blog._id}
                  sx={{ width: 300, cursor: 'pointer' }}
                  onClick={() => handleCardClick(blog._id)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.coverImage || '/placeholder.jpg'}
                    alt={blog.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2">{blog.description}</Typography>

                    
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
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}

        {!loading && hasMore && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleLoadMore}>
              Load More
            </Button>
          </Box>
        )}

        {!hasMore && (
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            sx={{ mt: 4 }}
          >
            No more blogs to display.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;
