import * as actionTypes from '../actionTypes/actionTypes';
import 'whatwg-fetch';

export const logIn = () => {

  return dispatch => {
    dispatch({
      type: actionTypes.USER_LOGIN
    })

    return fetch('/login/', {
      method: 'get',
      mode: 'no-cors'
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

export const getUser = () => {

  return dispatch => {
    dispatch({
      type: actionTypes.USER_DATA
    })

    return fetch('/login/', {
      method: 'get',
      mode: 'no-cors'
    })

    .then(res => res.json())
      .then(json => dispatch({
        type: actionTypes.USER_DATA_SUCCESS,
        json
      }))
    .catch(err => dispatch({
      type: actionTypes.USER_DATA_FAILURE,
      err
    }))
  }
}