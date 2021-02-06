import axios from 'axios';
import {
  POST_TRADE_BEGIN,
  POST_TRADE_SUCCESS,
  POST_TRADE_FAIL,
  ADD_TRADE,
  DELETE_TRADE,
  ENQUEUE_SNACKBAR,
  FETCH_TRADE_BEGIN,
  FETCH_TRADE_SUCCESS,
  FETCH_TRADE_FAIL,
  POST_TRADE_SECOND_BEGIN,
  POST_TRADE_SECOND_SUCCESS,
  POST_TRADE_SECOND_FAIL,
  FETCH_CURRENT_TRADE_BEGIN,
  FETCH_CURRENT_TRADE_SUCCESS,
  FETCH_CURRENT_TRADE_FAIL,
  CANCEL_TRADE_BEGIN,
  CANCEL_TRADE_SUCCESS,
  CANCEL_TRADE_FAIL,
  ACCEPT_TRADE_BEGIN,
  ACCEPT_TRADE_SUCCESS,
  ACCEPT_TRADE_FAIL,
} from './types/index';

export function startTrade(id) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_TRADE_BEGIN,
      });
      axios.post(`${process.env.API_URL}/trade/start`, { id })
        .then((response) => {
          if (response.data.trade) {
            dispatch({
              type: DELETE_TRADE,
              payload: response.data.trade,
            });
          }
          dispatch({
            type: POST_TRADE_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Surf Started',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'success',
              },
            },
          });
          resolve();
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: POST_TRADE_FAIL,
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
          resolve();
        });
    });
  }
}

export function fetchTradeData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade`)
      .then((response) => {
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log('FETCH_TRADE_SUCCESS');
        console.log(response.data.trade);
        dispatch({
          type: FETCH_TRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_TRADE_FAIL,
          payload: error,
        })
      });
  }
}

export function tradeSecondStepAction(obj, id) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_TRADE_SECOND_BEGIN,
      });
      axios.post(`${process.env.API_URL}/trade/second`, { obj, id })
        .then((response) => {
          if (response.data.trade) {
            dispatch({
              type: DELETE_TRADE,
              payload: response.data.trade,
            });
          }
          dispatch({
            type: POST_TRADE_SECOND_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Success: Trade Requested',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'success',
              },
            },
          });
          resolve();
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: POST_TRADE_SECOND_FAIL,
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
          resolve();
        });
    });
  }
}

export function fetchSingleTradeData(id) {
  return function (dispatch) {
    dispatch({
      type: FETCH_CURRENT_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/current`, { id })
      .then((response) => {
        console.log(response.data.trade);
        dispatch({
          type: FETCH_CURRENT_TRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_CURRENT_TRADE_FAIL,
          payload: error,
        })
      });
  }
}

export function cancelTradeAction(id) {
  return function (dispatch) {
    dispatch({
      type: CANCEL_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/cancel`, { id })
      .then((response) => {
        console.log(response.data.trade);
        dispatch({
          type: CANCEL_TRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: CANCEL_TRADE_FAIL,
          payload: error,
        })
      });
  }
}

export function acceptTradeAction(id) {
  return function (dispatch) {
    dispatch({
      type: ACCEPT_TRADE_BEGIN,
    });
    axios.post(`${process.env.API_URL}/trade/accept`, { id })
      .then((response) => {
        console.log(response.data.trade);
        dispatch({
          type: ACCEPT_TRADE_SUCCESS,
          payload: response.data.trade,
        })
      }).catch((error) => {
        dispatch({
          type: ACCEPT_TRADE_FAIL,
          payload: error,
        })
      });
  }
}
