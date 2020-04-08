import {SIGN_UP_SUCCESS, SIGN_UP_FAILURE, CLEAR_SIGN_UP_ERROR} from './Constants'
const INITIAL_STATE = {
    errMessage: undefined,

  };

export default function signUpReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {

        case SIGN_UP_SUCCESS:
          return {
            ...state,
            errMessage: undefined,
          };

          case SIGN_UP_FAILURE:
          return {
            ...state,
            errMessage: action.errorMessage,
          };

          case CLEAR_SIGN_UP_ERROR:
          return {
            ...state,
            errMessage: undefined,
          };

        default:
          return state;
      }
    }
  }