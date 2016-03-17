import { combineReducers } from 'redux';
import userdata from './userdata';

/** REDUCERS ***
Reducers change state based on the execution of an actionCreator. State is described in an object, which changes
based on user interactions. Reducers should not mutate its' arguments or perform API calls (Those are done in actionCreators)
Using Object.assign(), we are able to create a copy of state, and change the previous 'state' to the new 'spread' state (...state)*/

const reducers = combineReducers({
  userdata
});

export default reducers;