import { BOOKS_ADDED } from '../../shared/utils/types.js';
import { fetchBooks } from '../../shared/utils/api.js';

export const booksAdded = () => async dispatch => {
  try {
    let books = await fetchBooks();

    dispatch({
      type: BOOKS_ADDED,
      payload: books.data,
    });
  } catch (err) {
    console.log(err);
  }
};
