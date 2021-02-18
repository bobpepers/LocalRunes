import {
  FETCH_MYPOSTAD_BEGIN,
  FETCH_MYPOSTAD_SUCCESS,
  FETCH_MYPOSTAD_FAIL,
} from '../actions/types/index';

const initialState = {
  data: [],
  isFetching: true, // Default to fetching..
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MYPOSTAD_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_MYPOSTAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_MYPOSTAD_FAIL:
      return {
        ...state,
        error: action.payload.response.data.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
