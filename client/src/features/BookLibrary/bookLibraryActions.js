import {
  BOOKS_FETCHED,
  BOOK_POSTED_REQUEST,
  BOOK_POSTED_SUCCESS,
  BOOK_POSTED_FAILURE,
  BOOK_UPDATED_REQUEST,
  BOOK_UPDATED_SUCCESS,
  BOOK_UPDATED_FAILURE,
  BOOK_DELETED_REQUEST,
  BOOK_DELETED_SUCCESS,
  BOOK_DELETED_FAILURE,
} from '../../shared/utils/types.js';
import {
  fetchBooks,
  postBook,
  updateBook,
  deleteBook,
} from '../../shared/utils/api.js';

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

const bookRequest = (book, type) => ({
  type: type,
  payload: book,
});

const bookRequestSuccess = (book, type) => ({
  type: type,
  payload: book,
  loading: false,
  loaded: true,
  lastUpdated: Date.now(),
});

const bookRequestFailure = (book, type, err) => ({
  type: type,
  payload: book,
  error: err,
});

export const bookPosted = book => async dispatch => {
  dispatch(bookRequest(book));

  try {
    await postBook(book, BOOK_POSTED_REQUEST);
    dispatch(bookRequestSuccess(book, BOOK_POSTED_SUCCESS));
  } catch (err) {
    dispatch(bookRequestFailure(book, BOOK_POSTED_FAILURE, err));
  }
};

export const bookUpdated = book => async dispatch => {
  dispatch(bookRequest(book, BOOK_UPDATED_REQUEST));
  try {
    await updateBook(book);
    dispatch(bookRequestSuccess(book, BOOK_UPDATED_SUCCESS));
  } catch (err) {
    dispatch(bookRequestFailure(book, err, BOOK_UPDATED_FAILURE));
  }
};

export const bookDeleted = bookId => async dispatch => {
  const book = { bookId };
  dispatch(bookRequest(book, BOOK_DELETED_REQUEST));
  try {
    await deleteBook(book);
    dispatch(bookRequestSuccess(book, BOOK_DELETED_SUCCESS));
  } catch (err) {
    dispatch(bookRequestFailure(book, err, BOOK_DELETED_FAILURE));
  }
};
