import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Books from '../features/BookLibrary/BookLibrary.js';
import Register from '../shared/auth/Register';
import Login from '../shared/auth/Login';
import * as actions from '../features/BookLibrary/bookLibraryActions';

function App(props) {
  useEffect(() => {
    props.booksAdded();
  }, []);

  return (
    <div>
      <h1>Book Clubs</h1>

      <Switch>
        <Route exact path='/' component={Books} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </div>
  );
}

// export default App;
export default connect(null, actions)(App);
