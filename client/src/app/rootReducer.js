import { combineReducers } from 'redux';
import {
  booksFetched,
  bookPosted,
  bookUpdated,
  bookDeleted,
  configUpdated,
} from '../features/BookLibrary/bookLibraryReducer.js';
import authReducer from '../shared/auth/authReducer.js';

const rootReducer = combineReducers({
  config: configUpdated,
  books: booksFetched,
  user: authReducer,
  bookPosted: bookPosted,
  bookUpdated: bookUpdated,
  bookDeleted: bookDeleted,
});

export default rootReducer;
