import React, { useState } from 'react';

const BookLibraryEntry = props => {
  const [book, updateBook] = useState(props.initialState || {});
  console.log('initial', props.initialState);

  const handleChange = e => {
    e.persist();
    updateBook(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await props.postBookAndUpdate(book);
      //TODO:
      //if bookadded.loaded is true -> close dialog, pass handleCloseDialog
      //if bookadded.err is true -> show error
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={book.title || ''}
        onChange={handleChange}
      />
      <input
        type='text'
        name='author'
        value={book.author || ''}
        onChange={handleChange}
      />
      <input
        type='text'
        name='genre'
        value={book.genre || ''}
        onChange={handleChange}
      />
      <textarea name='notes' value={book.notes || ''} onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
};

export default BookLibraryEntry;
