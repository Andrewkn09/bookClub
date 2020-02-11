import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {hot} from 'react-hot-loader/root';
import Register from '../shared/auth/Register'
import Login from '../shared/auth/Login'

function App() {
  return (
    <div>
      <h1>Book Clubs</h1>

      <Switch>
        <Route exact path='/' />
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  )
}

export default hot(App)
