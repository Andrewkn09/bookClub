import React, {useState} from 'react'
import {hot} from 'react-hot-loader/root';

import {registerUser} from '../utils/api'

function Register() {
  const [form, setForm] = useState({name: '', email: '', password: ''})

  const handleChange = e => {
    e.persist();
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form)
      console.log('success')

    } catch (err) {
      console.log(err)
    }
  }

  const {name, email, password} = form
  return(
    <form onSubmit={handleSubmit}>
      <label>name</label>
      <input type='text' name='name' value={name} onChange={handleChange} required/>
      <label>email</label>
      <input type='text' name='email' value={email} onChange={handleChange} required/>
      <label>password</label>
      <input type='text' name='password' value={password} onChange={handleChange}required/>
      <button>Submit</button>
    </form>
  ) 

  
}

export default hot(Register)

