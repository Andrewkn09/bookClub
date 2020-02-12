import React from 'react';
import { connect } from 'react-redux';

const BookLibrary = props => {
  return props.user ? (
    <div>
      <h1>Books</h1>
    </div>
  ) : (
    <h1> Please Log in </h1>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  books: state.books,
});

export default connect(mapStateToProps, null)(BookLibrary);
