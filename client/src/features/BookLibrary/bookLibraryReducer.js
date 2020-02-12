import { BOOKS_ADDED } from '../../shared/types.js';

const booksAdded = (state = [], { type, payload }) => {
  switch (type) {
    case BOOKS_ADDED:
      return payload;
    default:
      return state;
  }
};

export default booksAdded;
