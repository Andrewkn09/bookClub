import { combineReducers } from 'redux';
import {
  booksFetched,
  bookAdded,
} from '../features/BookLibrary/bookLibraryReducer.js';
import authReducer from '../shared/auth/authReducer.js';

const rootReducer = combineReducers({
  books: booksFetched,
  user: authReducer,
  bookAdded: bookAdded,
});

export default rootReducer;
