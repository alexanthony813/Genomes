import * as actionTypes from '../actionTypes/actionTypes';
import 'whatwg-fetch';

/** ACTIONS ***
Actions define the action type, and do something based on the value of 'type' (i.e. receiveUserData)
Action creators will send information to the 'store', by going through reducers, which will change
 state based on the action type. Action creators (i.e. getUserData) are executable in containers
that use Redux's 'connect' helper. 'bindActionCreators()' binds action creators to dispatch */

export const requestUserData = (data) => {
  return {
    type: actionTypes.GET_USER,
    data,
  }
}


/**
  * Receive data from fetch
**/
export const receiveUserData = (data) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    results: data,
  }
}

/**
  * Fetch current user's information
**/
export const getUserData = () => {
  console.log('INSIDE GET USER DATA FUNCTION');
  return (dispatch) => {
    dispatch(requestUserData)

    return fetch('/get_info/', {
      method: 'get',
      mode: 'no-cors',
    }).then(res => res.json())
    .then(json => dispatch(receiveUserData(json)))
    .catch(err => dispatch({
      type: actionTypes.GET_USER_FAILURE,
      results: err,
    }))

  }
}