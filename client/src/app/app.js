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
      <ul>
        <li>
          <Link to='/books'>books</Link>
        </li>
        <li>
          <Link to='/register'>register</Link>
        </li>
        <li>
          <Link to='/login'>login</Link>
        </li>
      </ul>

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
