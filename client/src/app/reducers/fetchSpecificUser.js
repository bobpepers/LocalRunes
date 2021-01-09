import {
  FETCH_SPECIFICUSER_BEGIN,
  FETCH_SPECIFICUSER_SUCCESS,
  FETCH_SPECIFICUSER_FAIL,
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
      console.log(action.payload);
      console.log('FETCH SPECIFIC USER')
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      console.log('action.payload');
      return {
        ...state,
        loading: false,
        data: action.payload,
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
