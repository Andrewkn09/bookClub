import React, { useState } from 'react';

import './_entry.scss';
const BookLibraryEntry = props => {
  const [book, updateBook] = useState(props.initialState || {});

  const handleChange = e => {
    e.persist();

    updateBook(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  //if book has id, it means update. If not it means post
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      book.id
        ? await props.updateBookandUpdate(book)
        : await props.postBookAndUpdate(book);
      //TODO:
      //if bookadded.loaded is true -> close dialog, pass handleCloseDialog
      //if bookadded.err is true -> show error
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='formWrapper'>
      <form onSubmit={handleSubmit} className='entryForm'>
        <label>Title:</label>
        <input
          type='text'
          name='title'
          value={book.title || ''}
          onChange={handleChange}
        />
        <label>
          Author:
          <input
            type='text'
            name='author'
            value={book.author || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Genre:
          <input
            type='text'
            name='genre'
            value={book.genre || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Notes;
          <textarea
            name='notes'
            value={book.notes || ''}
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default BookLibraryEntry;
