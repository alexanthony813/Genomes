import * as actionTypes from '../actionTypes/actionTypes.js';

const DEFAULT_STATE = {
  results: [],
};
export const getData = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case actionTypes.GET_USER:
    return state;
  case actionTypes.GET_USER_SUCCESS:
    return Object.assign({}, state, {
      ...state,
      results: action.results,
    });
  case actionTypes.GET_USER_FAILURE:
    return Object.assign({}, state, {
      ...state,
      results: action.results,
    });
  default:
    return state;
  }
};
