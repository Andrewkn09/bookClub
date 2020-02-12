import { BOOKS_FETCHED } from '../../shared/utils/types.js';
import { fetchBooks } from '../../shared/utils/api.js';

export const booksFetched = () => async dispatch => {
  try {
    let { data } = await fetchBooks();

    dispatch({
      type: BOOKS_FETCHED,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
