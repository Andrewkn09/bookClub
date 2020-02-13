import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './bookLibraryActions.js';
import { postBook } from '../../shared/utils/api.js';
import BookLibraryList from './BookLibraryList.js';
import PrimaryButton from '../../shared/buttons/PrimaryButton.js';
import Dialog from '../../shared/dialog/Dialog.js';
import BookLibraryEntry from './BookLibraryEntry.js';

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
    } catch (err) {
      return err;
    }
  };

  return user ? (
    <div>
      <h1>Books</h1>
      <PrimaryButton description='Add Book' handleClick={handleOpenDialog} />
      <Dialog isOpen={isOpen} handleClose={handleCloseDialog}>
        <BookLibraryEntry postBookAndUpdate={postBookAndUpdate} />
      </Dialog>
      <BookLibraryList bookList={books} />
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
