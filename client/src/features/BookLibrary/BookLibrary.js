import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './bookLibraryActions.js';
import { postBook } from '../../shared/utils/api.js';

const BookLibrary = props => {
  const { user, books, booksFetched } = props;

  useEffect(() => {
    if (user) {
      booksFetched().catch(err => {
        console.log(err);
      });
    }
  }, []);

  const postBookAndUpdate = async book => {
    try {
      await postBook(book);
      await booksFetched();
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
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

export default connect(mapStateToProps, actions)(BookLibrary);
