export const fetchData = async (url, method = 'GET', errorMessage = 'Request failed') => {
  const response = await fetch(url, {
    method,
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  
  return await response.json();
};

export const deleteBlog = async (id) => {
  const url = `http://localhost:8000/api/v1/users/blogs/${id}`;
  const response = await fetchData(url, 'DELETE', 'Failed to delete blog');
  return response;
};

export const parseTags = (tags) => {
  try {
    return JSON.parse(tags);
  } catch {
    return [];
  }
};
