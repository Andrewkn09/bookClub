import React, { useState } from 'react';
import { handleLogin } from '../utils/api';

function Login() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, updateError] = useState('');

  const handleChange = e => {
    e.persist();
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      e.preventDefault();
      await handleLogin(form);
      window.location.assign('/');
    } catch (err) {
      console.log(err.response.data);
      updateError(err.response.data.message);
    }
  };

  const { name, email, password } = form;
  return (
    <form onSubmit={handleSubmit}>
      {error}
      <label>name</label>
      <input
        type='text'
        name='name'
        value={name}
        onChange={handleChange}
        required
      />
      <label>email</label>
      <input
        type='text'
        name='email'
        value={email}
        onChange={handleChange}
        required
      />
      <label>password</label>
      <input
        type='text'
        name='password'
        value={password}
        onChange={handleChange}
        required
      />
      <button>Submit</button>
    </form>
  );
}

export default Login;
