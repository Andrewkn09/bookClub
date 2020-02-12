const { USER_FETCHED } = require('../utils/types.js');
const { fetchUser } = require('../utils/api.js');

export const userFetched = () => async dispatch => {
  let user = null;

  try {
    user = await fetchUser();
  } catch (err) {
    console.log('Must be logged in');
  }

  dispatch({
    type: USER_FETCHED,
    payload: user,
  });
};
