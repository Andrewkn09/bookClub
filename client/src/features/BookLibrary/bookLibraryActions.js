import { BOOKS_ADDED } from '../../shared/types.js';
import { fetchBooks } from '../../shared/utils/api.js';

export const booksAdded = books => async dispatch => {
  let books = await fetchBooks();
  console.log(books);

  dispatch({
    type: BOOKS_ADDED,
    payload: books,
  });
};
