import * as actionTypes from '../actionTypes/login';
import 'whatwg-fetch';

export const logIn = () => {

  return dispatch => {
    dispatch({
      type: actionTypes.USER_LOGIN
    })

    return fetch('/receive_code/', {
      method: 'get',
      headers: {
        'Accept': application/json,
        'Content-Type': application/json
      },
      credentials: 'same-origin'
    })

    .then(res => res.json())
      .then(json => dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        json
      }))
    .catch(err => dispatch({
      type: actionTypes.USER_LOGIN_FAILURE,
      err
    }))
  }
}
