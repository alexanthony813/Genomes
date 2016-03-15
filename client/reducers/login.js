import * as actionTypes from '../actionTypes/login';

const DEFAULT_STATE = [];

const addUser = (state, action) => ([
  ...state,
  action.user
]);

export default function users (state = DEFAULT_STATE, action) {
  return ({
    [actionTypes.USER_LOGIN_SUCCESS]: addUser,
    [actionTypes.USER_LOGIN_FAILURE]: addUser
  }[action.type] || ( s => s ))(state, action);
}

