import {
  CANCEL_TRADE_BEGIN,
  CANCEL_TRADE_SUCCESS,
  CANCEL_TRADE_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_TRADE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case CANCEL_TRADE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case CANCEL_TRADE_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
