import * as actionTypes from '../actionTypes/login';
import { get, post, del } from '../utils/api.js';


export const logIn = () => {
  console.log('in log in level 1');
  return dispatch => {
    console.log('in log in level 2');
    dispatch({
      type: actionTypes.USER_LOGIN
    });

    try {
      const result = get('/receive_code/');
      console.log('in log in level 3');
      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        userInfo: result
      });
    } catch (err) {
      console.log('in log in level 4');
      dispatch({
        type: actionTypes.USER_LOGIN_FAILURE
      });
    }
  }
}