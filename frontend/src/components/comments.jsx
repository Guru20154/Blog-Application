import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { fetchData } from '../utils/apiUtils';

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [visibleComments, setVisibleComments] = useState(5); 
  const [hasMoreComments, setHasMoreComments] = useState(true); 

  
  const fetchComments = async () => {
    try {
      const response = await fetchData(`https://blog-application-sable.vercel.app/api/v1/users/comments/${blogId}`, 'GET', 'Failed to fetch comments');
      const sortedComments = response.comments || [];
      
      sortedComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComments(sortedComments);
    } catch (err) {
      console.error(err.message);
    }
  };

  
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`https://blog-application-sable.vercel.app/api/v1/users/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId, comment: newComment }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      
      setNewComment('');
      setCommentError('');

      
      fetchComments();
    } catch (err) {
      setCommentError('Error adding comment. Try again.');
    }
  };

  
  const handleLoadMore = () => {
    setVisibleComments((prev) => {
      const newVisibleCount = prev + 5;
      if (newVisibleCount >= comments.length) {
        setHasMoreComments(false); 
      }
      return newVisibleCount;
    });
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        <TextField
          label="Add a comment"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          error={!!commentError}
          helperText={commentError}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddComment}>
          Submit
        </Button>
      </Box>

      {comments.length > 0 ? (
        comments.slice(0, visibleComments).map((comment) => (
          <Box key={comment._id} mb={2} p={2} border="1px solid #ddd" borderRadius={2}>
            <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
              {comment.username}
            </Typography>
            <Typography variant="body2">{comment.comment}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No comments yet. Be the first to comment!
        </Typography>
      )}

      {hasMoreComments && (
        <Button variant="contained" onClick={handleLoadMore} sx={{ mt: 2 }}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default Comments;
