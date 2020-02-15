import axios from 'axios';

export const handleRegister = async user => {
  return await axios.post('/api/auth/register', user);
};

export const handleLogin = async user => {
  return await axios.post('/api/auth/login', user);
};

export const fetchBooks = async (page, limit, sortBy = 'title ASC') => {
  const sort = sortBy.split(' ')[0];
  const order = sortBy.split(' ')[1];
  return await axios.get('/api/books', {
    params: {
      page,
      limit,
      sort,
      order,
    },
  });
};

export const fetchUser = async () => {
  return await axios.get('/api/auth/current_user');
};

export const postBook = async book => {
  return await axios.post('/api/books', book);
};

export const updateBook = async book => {
  return await axios.put('api/books', book);
};

export const deleteBook = async ({ bookId }) => {
  return await axios.delete(`api/books/${bookId}`);
};
