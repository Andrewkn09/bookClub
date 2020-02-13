import {
  BOOKS_FETCHED,
  BOOK_POSTED_REQUEST,
  BOOK_POSTED_SUCCESS,
  BOOK_POSTED_FAILURE,
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
  loading: false,
  loaded: false,
  error: null,
};

export const bookPosted = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_POSTED_REQUEST:
      return Object.assign({}, state, {
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
        error: action.payload,
      });

    default:
      return state;
  }
};
