import axios from 'axios';

export const registerUser =  async (user) => {
  console.log(user)
  try {
    const response = await axios.post('/register', user)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const handleLogin =  async (user) => {
  try {
    const response = await axios.post('/login', user)
    console.log(response.locals)
    return response
  } catch (err) {
    console.log(err)
  }
}






