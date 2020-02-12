import { BOOKS_FETCHED } from '../../shared/utils/types.js';

const booksAdded = (state = [], { type, payload }) => {
  switch (type) {
    case BOOKS_FETCHED:
      return payload;
    default:
      return state;
  }
};

export default booksAdded;
