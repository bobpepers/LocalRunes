import axios from 'axios';
import {
  FETCH_REFERRALCONTESTS_BEGIN,
  FETCH_REFERRALCONTESTS_SUCCESS,
  FETCH_REFERRALCONTESTS_FAIL,
  UPDATE_REFERRALCONTESTS,
} from './types/index';

export function fetchReferralContests() {
  return function (dispatch) {
    dispatch({
      type: FETCH_REFERRALCONTESTS_BEGIN,
    });
    axios.get(`${process.env.API_URL}/referral/contests`)
      .then((response) => {
        dispatch({
          type: FETCH_REFERRALCONTESTS_SUCCESS,
          payload: response,
        })
      }).catch((error) => {
        dispatch({
          type: FETCH_REFERRALCONTESTS_FAIL,
          payload: error,
        });
      });
  }
}

export function onUpdateReferralContests(payload) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_REFERRALCONTESTS,
      payload,
    });
  }
}
