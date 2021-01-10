import {
  FETCH_SPECIFICUSER_BEGIN,
  FETCH_SPECIFICUSER_SUCCESS,
  FETCH_SPECIFICUSER_FAIL,
  ADD_TRUST,
  DELETE_TRUST,
  ADD_BLOCK,
  DELETE_BLOCK,
} from '../actions/types/index';

const initialState = {
  loading: false,
  error: null,
};

export default function specificUserReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_SPECIFICUSER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SPECIFICUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ADD_TRUST:
      return {
        ...state,
        data: {
          ...state.data,
          trustedUsers: [].concat(action.payload, state.data.trustedUsers.filter((val) => val.username == action.payload.username)),

        },
        loading: false,
        error: null,
      };

    case DELETE_TRUST:
      return {
        ...state,
        data: {
          ...state.data,
          trustedUsers: state.data.trustedUsers.filter((item) => item.username !== action.payload.username),
        },
        loading: false,
        error: null,
      };

    case ADD_BLOCK:
      return {
        ...state,
        data: {
          ...state.data,
          blockedUsers: [].concat(action.payload, state.data.blockedUsers.filter((val) => val.username == action.payload.username)),

        },
        loading: false,
        error: null,
      };

    case DELETE_BLOCK:
      return {
        ...state,
        data: {
          ...state.data,
          blockedUsers: state.data.blockedUsers.filter((item) => item.username !== action.payload.username),
        },
        loading: false,
        error: null,
      };

    case FETCH_SPECIFICUSER_FAIL:
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
