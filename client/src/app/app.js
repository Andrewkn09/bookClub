import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import Books from '../features/BookLibrary/BookLibrary.js';
import Register from '../shared/auth/Register';
import Login from '../shared/auth/Login';
import * as actions from '../shared/auth/authActions';

function App(props) {
  useEffect(() => {
    props.userFetched();
  }, []);

  return (
    <div>
      <h1>Book Clubs</h1>
      <Link to='/books'>books</Link>
      <Link to='/register'>books</Link>
      <Link to='/login'>books</Link>

      <Switch>
        <Route exact path='/' />
        <Route path='/books' component={Books} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

// export default App;
export default connect(null, actions)(App);
