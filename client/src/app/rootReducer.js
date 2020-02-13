import { combineReducers } from 'redux';
import {
  booksFetched,
  bookPosted,
} from '../features/BookLibrary/bookLibraryReducer.js';
import authReducer from '../shared/auth/authReducer.js';

const rootReducer = combineReducers({
  books: booksFetched,
  user: authReducer,
  bookAdded: bookPosted,
});

export default rootReducer;
