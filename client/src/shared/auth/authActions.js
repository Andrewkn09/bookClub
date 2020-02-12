const { USER_FETCHED } = require('../utils/types.js');
const { fetchUser } = require('../utils/api.js');

export const userFetched = () => async dispatch => {
  const user;
  
  try {
    user = await fetchUser();
  } catch (err) {
    user = false;
  }

  dispatch({
    type: USER_FETCHED,
    payload: user,
  });
};
