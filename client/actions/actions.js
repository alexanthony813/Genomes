import * as actionTypes from '../actionTypes/actionTypes';
import 'whatwg-fetch';

export const getUser = () => {

  return dispatch => {
    dispatch({
      type: actionTypes.USER_DATA
    })

    return fetch('/get_info/', {
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
