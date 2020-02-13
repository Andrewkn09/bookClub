import {
  BOOKS_FETCHED,
  BOOK_POSTED_REQUEST,
  BOOK_POSTED_SUCCESS,
  BOOK_POSTED_FAILURE,
  BOOK_UPDATED_REQUEST,
  BOOK_UPDATED_SUCCESS,
  BOOK_UPDATED_FAILURE,
} from '../../shared/utils/types.js';
import { fetchBooks, postBook, updateBook } from '../../shared/utils/api.js';

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

const bookRequest = (book, request, success, failure) => ({
  type: request,
  payload: book,
});

const bookRequestSuccess = book => ({
  type: success,
  payload: book,
  loading: false,
  loaded: true,
  lastUpdated: Date.now(),
});

const bookRequestFailure = (book, err) => ({
  type: failure,
  payload: book,
  error: err,
});

export const bookUpdated = book => async dispatch => {
  dispatch(bookRequest(book, BOOK_UPDATED_REQUEST));
  try {
    await updateBook(book);
    dispatch(bookRequestSuccess(book, BOOK_UPDATED_SUCCESS));
  } catch (err) {
    dispatch(bookRequestFailure(err, BOOK_UPDATED_FAILURE));
  }
};
