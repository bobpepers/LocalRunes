import {
  FETCH_TRADE_BEGIN,
  FETCH_TRADE_SUCCESS,
  FETCH_TRADE_FAIL,
  ADD_TRADE,
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
    case ADD_TRADE:
      console.log(action.payload);
      return {
        ...state,
        data: [
          {
            ...action.payload,
          },
          ...state.data,
        ],
        isFetching: false,
      };
    default:
      return state;
  }
};
