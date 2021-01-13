import {
  FETCH_ADMINCURRENCIES_BEGIN,
  FETCH_ADMINCURRENCIES_SUCCESS,
  FETCH_ADMINCURRENCIES_FAIL,
  UPDATE_ADMIN_CURRENCIES,
  ADD_ADMINCURRENCY,
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
    case FETCH_ADMINCURRENCIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ADMINCURRENCIES_SUCCESS:
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_ADMINCURRENCIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    case UPDATE_ADMIN_CURRENCIES:
      return {
        ...state,
        loading: false,
        data: [
          ...state.data.map(
            (publisher) => (publisher.id === action.payload.id
              ? action.payload
              : publisher),
          ),
        ],
      };
    case ADD_ADMINCURRENCY:
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      console.log('FETCH_ADMINPUBLISHERS_SUCCESS');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: [
          action.payload,
          ...state.data,
        ],
      };

    default:
      return state;
  }
}
