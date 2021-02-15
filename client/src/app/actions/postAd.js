import axios from 'axios';
import {
  ENQUEUE_SNACKBAR,
  ADD_POSTAD_BEGIN,
  ADD_POSTAD,
  FETCH_POSTAD_FAIL,
  FETCH_POSTAD_SUCCESS,
  FETCH_POSTAD_BEGIN,
} from './types/index';

export function addPostAdAction(obj) {
  console.log('2222222222222222222222');
  return function (dispatch) {
    dispatch({
      type: ADD_POSTAD_BEGIN,
    });
    // axios.get(`${API_URL}/user`, { headers: { authorization: user.token } })
    axios.post(`${process.env.API_URL}/postad/add`, obj)
      .then((response) => {
        console.log('response.data.postAd');
        console.log(response.data.postAd);
        dispatch({
          type: ADD_POSTAD,
          payload: response.data.postAd,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Ad Created',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}

export function fetchPostAdData(type) {
  return function (dispatch) {
    dispatch({
      type: FETCH_POSTAD_BEGIN,
    });
    axios.post(`${process.env.API_URL}/postad`, { type })
      .then((response) => {
        console.log('FETCH_POSTAD_SUCCESS');
        console.log(response);
        dispatch({
          type: FETCH_POSTAD_SUCCESS,
          payload: response.data,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_POSTAD_FAIL,
          payload: error,
        })
      });
  }
}