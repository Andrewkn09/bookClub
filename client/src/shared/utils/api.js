import axios from 'axios';

export const handleRegister = async user => {
  return await axios.post('/api/register', user);
};

export const handleLogin = async user => {
  return await axios.post('/api/login', user);
};

export const fetchBooks = async () => {
  return await axios.get('/api/books');
};

export const fetchUser = async () => {
  return await axios.get('/api/current_user');
};

export const postBook = async book => {
  return await axios.post('/api/books', book);
};
