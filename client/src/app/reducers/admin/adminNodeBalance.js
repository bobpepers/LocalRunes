import {
  FETCH_ADMINNODEBALANCE_BEGIN,
  FETCH_ADMINNODEBALANCE_SUCCESS,
  FETCH_ADMINNODEBALANCE_FAIL,
} from '../../actions/types/index';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function adminPublishersReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_ADMINNODEBALANCE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINNODEBALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINNODEBALANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    default:
      return state;
  }
}
