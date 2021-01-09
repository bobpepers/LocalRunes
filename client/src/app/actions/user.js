import axios from 'axios';
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  UPDATE_TRANSACTION,
  INSERT_TRANSACTION,
  UPDATE_WALLET,
  UPDATE_WEBSLOT,
  UPDATE_JACKPOT_TICKETS,
  FETCH_SPECIFICUSER_BEGIN,
  FETCH_SPECIFICUSER_FAIL,
  FETCH_SPECIFICUSER_SUCCESS,
  // UPDATE_PRICE,
} from './types/index';

/**
 * Fetch User Data
 */
export function fetchUserData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_USER_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.get(`${process.env.API_URL}/user`)
      .then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_USER_FAIL,
          payload: error,
        });
      });
  }
}

export function onUpdateTransaction(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: data,
    });
  }
}

export function onInsertTransaction(data) {
  return function (dispatch) {
    dispatch({
      type: INSERT_TRANSACTION,
      payload: data,
    });
  }
}

export function onUpdateJackpotTickets(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_JACKPOT_TICKETS,
      payload: data,
    });
  }
}

export function onUpdateWallet(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_WALLET,
      payload: data,
    });
  }
}
export function onUpdateWebslot(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_WEBSLOT,
      payload: data,
    });
  }
}

export function fetchSpecificUserData(user) {
  return function (dispatch) {
    console.log('START FETCH SPECIFIC USER');
    console.log('START FETCH SPECIFIC USER');

    console.log('START FETCH SPECIFIC USER');
    console.log('START FETCH SPECIFIC USER');
    console.log('START FETCH SPECIFIC USER');
    console.log('START FETCH SPECIFIC USER');
    console.log('START FETCH SPECIFIC USER');
    console.log(user);
    console.log(user);
    dispatch({
      type: FETCH_SPECIFICUSER_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/getuser`, { user })
      .then((response) => {
        console.log('get specific user response');
        console.log('get specific user response');
        console.log('get specific user response');
        console.log('get specific user response');
        console.log('get specific user response');
        console.log('get specific user response');
        console.log('get specific user response');
        console.log('get specific user response');
        console.log(response);
        dispatch({
          type: FETCH_SPECIFICUSER_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        console.log('get specific user error');
        console.log('get specific user error');
        console.log('get specific user error');
        console.log('get specific user error');
        console.log('get specific user error');
        console.log(error);
        dispatch({
          type: FETCH_SPECIFICUSER_FAIL,
          payload: error,
        });
      });
  }
}

// export function onUpdatePrice(data) {
//  return function (dispatch) {
//    dispatch({
//      type: UPDATE_PRICE,
//      payload: data,
//    });
//  }
// }
