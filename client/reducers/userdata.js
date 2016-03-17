import * as actionTypes from '../actionTypes/actionTypes';

const DEFAULT_STATE = [];

const addUser = (state, action) => ([
  ...state,
  action.user
]);

export default function users (state = DEFAULT_STATE, action) {
  return ({
    [actionTypes.USER_DATA_SUCCESS]: addUser
  }[action.type] || ( s => s ))(state, action);
}

