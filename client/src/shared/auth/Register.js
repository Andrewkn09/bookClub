import React, {useState} from 'react'
import {hot} from 'react-hot-loader/root';

import {handleRegister} from '../utils/api'

function Register(props) {
  const [form, setForm] = useState({name: '', email: '', password: ''})
  const [error, updateError] = useState('')
 
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
      await handleRegister(form)
      window.location.assign('/login')
    } catch (err) {
      console.log(err.response.data)
      updateError(err.response.data.message)
    }
  }

  const {name, email, password} = form
  return(
    <form onSubmit={handleSubmit}>
      {error}
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

