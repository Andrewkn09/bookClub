import { combineReducers } from 'redux';
import booksAdded from '../features/BookLibrary/bookLibraryReducer.js';

const rootReducer = combineReducers({
  books: booksAdded,
});

export default rootReducer;
