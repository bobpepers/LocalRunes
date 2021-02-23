import axios from 'axios';
import {
  FETCH_ADMINPENDINGWITHDRAWALCOUNT_BEGIN,
  FETCH_ADMINPENDINGWITHDRAWALCOUNT_SUCCESS,
  FETCH_ADMINPENDINGWITHDRAWALCOUNT_FAIL,
} from './types/index';

export function getPendingWithdrawalCount() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ADMINPENDINGWITHDRAWALCOUNT_BEGIN,
    });
    axios.get(`${process.env.API_URL}/admin/count/withdrawals/pending`)
      .then((response) => {
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log('/admin/count/withdrawals/pending');
        console.log(response);
        dispatch({
          type: FETCH_ADMINPENDINGWITHDRAWALCOUNT_SUCCESS,
          payload: response.data.count,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_ADMINPENDINGWITHDRAWALCOUNT_FAIL,
          payload: error,
        });
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