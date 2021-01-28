import {
  FETCH_TRADE_BEGIN,
  FETCH_TRADE_SUCCESS,
  FETCH_TRADE_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRADE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_TRADE_SUCCESS:
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log('trade success post');
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_TRADE_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
