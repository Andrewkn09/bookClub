import { BOOKS_ADDED } from '../../shared/types.js';
import { fetchBooks } from '../../shared/utils/api.js';

export const booksAdded = () => async dispatch => {
  let books = await fetchBooks();

  dispatch({
    type: BOOKS_ADDED,
    payload: books.data,
  });
};
