import axios from 'axios';

export const handleRegister = async user => {
  return await axios.post('/api/auth/register', user);
};

export const handleLogin = async user => {
  return await axios.post('/api/auth/login', user);
};

export const fetchBooks = async () => {
  return await axios.get('/api/books');
};

export const fetchUser = async () => {
  return await axios.get('/api/auth/current_user');
};

export const postBook = async book => {
  return await axios.post('/api/books', book);
};
