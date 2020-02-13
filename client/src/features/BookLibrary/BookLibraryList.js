import React from 'react';

const BookLibraryList = props => {
  return (
    <ul>
      {props.bookList.map(book => {
        return (
          <li key={book.id}>
            {
              <div>
                <h3>Title: {book.title}</h3>
                <h4>Author: {book.name}</h4>
                <section>
                  <p>Genre:{book.genre}</p>
                  <p>Notes:{book.notes}</p>
                  <p>Date Added: {book.date_added}</p>
                </section>
              </div>
            }
          </li>
        );
      })}
    </ul>
  );
};

export default BookLibraryList;
