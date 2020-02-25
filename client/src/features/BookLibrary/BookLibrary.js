import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './bookLibraryActions.js';
import BookLibraryList from './bookLibraryList/BookLibraryList.js';
import Dialog from '../../shared/dialog/Dialog.js';
import BookLibraryEntry from './bookLibraryEntry/BookLibraryEntry.js';
import BookLibraryHeader from './bookLibraryHeader/BookLibraryHeader.js';
import BookPagination from './bookPagination/BookPagination.js';

const BookLibrary = props => {
  const { user, books, booksFetched, bookPosted } = props;
  const [isOpen, toggleDialog] = useState(false);

  useEffect(() => {
    if (user) {
      booksFetched().catch(err => {
        console.log(err);
      });
    }
  }, []);

  const handleOpenDialog = () => {
    toggleDialog(true);
  };

  const handleCloseDialog = () => {
    toggleDialog(false);
  };

  const postBookAndUpdate = async book => {
    try {
      await bookPosted(book);
      await booksFetched();
    } catch (err) {
      console.log(err);
    }
  };

  const updateBookAndUpdate = async book => {
    try {
      await props.bookUpdated(book);
      await booksFetched();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBookAndUpdate = async bookId => {
    try {
      await props.bookDeleted(bookId);
      await booksFetched();
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
    <div>
      <BookLibraryHeader
        config={props.config}
        updateConfig={props.configUpdated}
        handleAddBook={handleOpenDialog}
        updateList={props.booksFetched}
      />
      <Dialog isOpen={isOpen} handleClose={handleCloseDialog}>
        <BookLibraryEntry postBookAndUpdate={postBookAndUpdate} />
      </Dialog>
      <BookLibraryList
        bookList={books}
        updateBookAndUpdate={updateBookAndUpdate}
        deleteBookAndUpdate={deleteBookAndUpdate}
      />
      <BookPagination
        config={props.config}
        updateConfig={props.configUpdated}
      />
    </div>
  ) : (
    <h1> Please Log in </h1>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  books: state.books,
  config: state.config,
});

export default connect(mapStateToProps, actions)(BookLibrary);
