const { USER_FETCHED, USER_LOGOUT } = require('../utils/types.js');

const authReducer = (state = null, { type, payload }) => {
  switch (type) {
    case USER_FETCHED:
      return payload;
    case USER_LOGOUT:
      return false;
    default:
      return state;
  }
};

export default authReducer;
