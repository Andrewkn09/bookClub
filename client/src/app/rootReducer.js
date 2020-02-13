import { combineReducers } from 'redux';
import {
  booksFetched,
  bookPosted,
  bookUpdated,
} from '../features/BookLibrary/bookLibraryReducer.js';
import authReducer from '../shared/auth/authReducer.js';

const rootReducer = combineReducers({
  books: booksFetched,
  user: authReducer,
  bookPosted: bookPosted,
  bookUpdated: bookUpdated,
});

export default rootReducer;
