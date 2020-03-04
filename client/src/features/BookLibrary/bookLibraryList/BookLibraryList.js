import React, { useState } from 'react';
import Dialog from '../../../shared/dialog/Dialog.js';
import BookLibraryEntry from '../bookLibraryEntry/BookLibraryEntry.js';
import { formatDate } from '../../../shared/helpers.js';

import './list.scss';

const BookLibraryList = props => {
  const [isOpen, toggleDialog] = useState(false);
  const [selectedBook, selectBook] = useState(null);

  const handleOpenDialog = e => {
    selectBook(props.bookList[e.target.id]);
    toggleDialog(true);
  };

  const handleCloseDialog = () => {
    toggleDialog(false);
  };

  const handleDelete = e => {
    props.deleteBookAndUpdate(e.target.id);
  };

  return props.bookList ? (
    <ul className='bookList'>
      {props.bookList.map((book, i) => {
        return (
          <li key={book.id}>
            <div className='bookDescriptions'>
              <h3>Title: {book.title}</h3>
              <h4>Author: {book.author}</h4>
              <section>
                <p>Genre:{book.genre}</p>
                <p>Notes:{book.notes}</p>
                <p>Date Added: {formatDate(book.date_added)}</p>
              </section>
            </div>
            <div className='bookModifiers'>
              <button id={i} onClick={handleOpenDialog}>
                Edit
              </button>
              <button id={book.id} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
      <Dialog isOpen={isOpen} handleClose={handleCloseDialog}>
        <BookLibraryEntry
          initialState={selectedBook}
          updateBookandUpdate={props.updateBookAndUpdate}
        />
      </Dialog>
    </ul>
  ) : (
    <h1>Loading</h1>
  );
};

export default BookLibraryList;
