import * as actionTypes from '../actionTypes/login';
import { get, post, del } from '../utils/api.js';


export const logIn = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_LOGIN
    });

    try {
      const result = get('/receive_code/');

      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        userInfo: result
      });
    } catch (err) {
      dispatch({
        type: actionTypes.USER_LOGIN_FAILURE
      });
    }
  }
}