import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [body, setBody] = useState(''); 
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState([]); 
  const [tagInput, setTagInput] = useState(''); 
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleBodyChange = (value) => {
    setBody(value); 
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim().toLowerCase()]);
      setTagInput(''); 
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = new FormData();
    blogData.append('title', formData.title);
    blogData.append('description', formData.description);
    blogData.append('body', body); 
    blogData.append('tags', JSON.stringify(tags));
    if (coverImage) blogData.append('coverImage', coverImage);

    try {
      const response = await fetch(`https://blog-application-sable.vercel.app/api/v1/users/blogs`, {
        method: 'POST',
        body: blogData,
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        navigate('/'); 
      } else {
        setError(data.message || 'Failed to create blog');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Create Blog
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Box mt={2}>
            <Typography variant="subtitle1">Body</Typography>
            <ReactQuill
              value={body}
              onChange={handleBodyChange}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'link',
                'image',
              ]}
              style={{ height: '200px', marginBottom: '70px' }}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1">Tags</Typography>
            <TextField
              label="Add a tag"
              variant="outlined"
              fullWidth
              margin="normal"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagAdd}
              helperText="Press Enter to add a tag"
            />
            <Box mt={1} sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                  color="primary"
                />
              ))}
            </Box>
          </Box>
          <Button variant="contained" component="label" fullWidth sx={{ mb: 2, mt: 2 }}>
            Upload Cover Image
            <input type="file" hidden onChange={handleCoverImageChange} />
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Post Blog
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBlog;
