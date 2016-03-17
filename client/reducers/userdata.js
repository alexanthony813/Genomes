import * as actionTypes from '../actionTypes/actionTypes';

/** REDUCERS ***
Reducers change state based on the execution of an actionCreator. State is described in an object, which changes
based on user interactions. Reducers should not mutate its' arguments or perform API calls (Those are done in actionCreators)
Using Object.assign(), we are able to create a copy of state, and change the previous 'state' to the new 'spread' state (...state)
**/

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

