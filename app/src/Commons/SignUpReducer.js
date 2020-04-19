import {SIGN_UP_SUCCESS, SIGN_UP_FAILURE, CLEAR_SIGN_UP_ERROR, HIDE_SIGN_UP_LOADER, SHOW_SIGNUP_LOADER, RESET_REDUCERS} from './Constants'
const INITIAL_STATE = {
    errMessage: undefined,
    loader: false,
  };

export default function signUpReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {

        case SIGN_UP_SUCCESS:
          return {
            ...state,
            errMessage: undefined,
            loader: false,
          };

          case SIGN_UP_FAILURE:
          return {
            ...state,
            errMessage: action.errorMessage,
            loader: false,
          };

          case CLEAR_SIGN_UP_ERROR:
          return {
            ...state,
            errMessage: undefined,
          };

          case SHOW_SIGNUP_LOADER:
          return {
            ...state,
            loader: true,
          };

          case HIDE_SIGN_UP_LOADER:
          return {
            ...state,
            loader: false,
          };

          case RESET_REDUCERS:
          return {
            ...state,
            errMessage: undefined,
    loader: false,
          };

        default:
          return state;
      }
    }
  }