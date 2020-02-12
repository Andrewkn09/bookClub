import { combineReducers } from 'redux';
import booksAdded from '../features/BookLibrary/bookLibraryReducer.js';
import authReducer from '../shared/auth/authReducer.js';

const rootReducer = combineReducers({
  books: booksAdded,
  user: authReducer,
});

export default rootReducer;
