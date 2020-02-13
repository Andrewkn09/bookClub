import {
  BOOKS_FETCHED,
  BOOK_POSTED_REQUEST,
  BOOK_POSTED_SUCCESS,
  BOOK_POSTED_FAILURE,
  BOOK_UPDATED_REQUEST,
  BOOK_UPDATED_SUCCESS,
  BOOK_UPDATED_FAILURE,
} from '../../shared/utils/types.js';

export const booksFetched = (state = [], { type, payload }) => {
  switch (type) {
    case BOOKS_FETCHED:
      return payload;
    default:
      return state;
  }
};

const initialState = {
  payload: null,
  loading: false,
  loaded: false,
  error: null,
};

export const bookPosted = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_POSTED_REQUEST:
      return Object.assign({}, state, {
        payload: action.payload,
        loading: true,
        loaded: false,
      });

    case BOOK_POSTED_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        lastUpdated: Date.now(),
      });

    case BOOK_POSTED_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.err,
      });

    default:
      return state;
  }
};

export const bookUpdated = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_UPDATED_REQUEST:
      return Object.assign({}, state, {
        payload: action.payload,
        loading: true,
        loaded: false,
      });

    case BOOK_UPDATED_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        lastUpdated: Date.now(),
      });

    case BOOK_UPDATED_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.err,
      });

    default:
      return state;
  }
};
