import {
  BOOKS_FETCHED,
  BOOK_POSTED_REQUEST,
  BOOK_POSTED_SUCCESS,
  BOOK_POSTED_FAILURE,
} from '../../shared/utils/types.js';
import { fetchBooks, postBook } from '../../shared/utils/api.js';

export const booksFetched = () => async dispatch => {
  try {
    let { data } = await fetchBooks();

    dispatch({
      type: BOOKS_FETCHED,
      payload: data.favorites,
    });
  } catch (err) {
    console.log(err);
  }
};

export const bookPosted = book => async dispatch => {
  dispatch({
    type: BOOK_POSTED_REQUEST,
    payload: book,
  });

  try {
    await postBook(book);

    dispatch({
      type: BOOK_POSTED_SUCCESS,
      loading: false,
      loaded: true,
      lastUpdated: Date.now(),
    });
  } catch (err) {
    dispatch({
      type: BOOK_POSTED_FAILURE,
      payload: err,
    });
  }
};
