import {SIGN_IN_SUCCESS, SIGN_IN_FAILURE, CHECK_USER_SUCCESS, CHECK_USER_FAILURE, CLEAR_SIGN_IN_ERROR, SHOW_SIGN_IN_LOADER, HIDE_SIGN_IN_LOADER} from '../../../Commons/Constants'

const INITIAL_STATE = {
    authenticated: false,
    signInAttempted: false,
    isStudent: false,
    isInstructor: false,
    loader: false,
    errMessage: undefined,
  };

export default function signInReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      console.log(action)
      switch (action.type) {

        case SIGN_IN_SUCCESS:
          return {
            ...state,
            authenticated: true,
            signInAttempted: true,
            loader: false,
            errMessage: undefined,
          };

          case SIGN_IN_FAILURE:
          return {
            ...state,
            authenticated: false,
            signInAttempted: true,
            loader: false,
            errMessage: action.errMessage,
          };

          case CHECK_USER_SUCCESS:
          return {
            ...state,
            isStudent: action.isStudent,
            isInstructor: action.isInstructor,
          };

          case CHECK_USER_FAILURE:
          return {
            ...state,
            isStudent: false,
            isInstructor: false,
          };

          case CLEAR_SIGN_IN_ERROR:
          return {
            ...state,
            errMessage: undefined,
          };

          case SHOW_SIGN_IN_LOADER:
          return {
            ...state,
            loader: true,
          };

          case HIDE_SIGN_IN_LOADER:
          return {
            ...state,
            loader: false,
          };

        default:
          return state;
      }
    }
  }