import {SIGN_IN_SUCCESS, SIGN_IN_FAILURE, CHECK_USER_SUCCESS, CHECK_USER_FAILURE, CLEAR_SIGN_IN_ERROR, SHOW_SIGN_IN_LOADER, HIDE_SIGN_IN_LOADER, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, CLEAR_FORGOT_PASSWORD_MESSAGE, USE_APP_STATE, RESET_REDUCERS, SET_EMAIL_VERIFICATION } from '../../../Commons/Constants'

const INITIAL_STATE = {
    authenticated: false,
    signInAttempted: false,
    isStudent: false,
    isInstructor: false,
    loader: false,
    errMessage: undefined,
    forGotPasswordResponse: undefined,
    useAppState: true,
    emailVerified: undefined,
  };

export default function signInReducer() {
    return function reducer(state = INITIAL_STATE, action) {
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
            emailVerified: undefined,
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

          case FORGOT_PASSWORD_SUCCESS:
          case FORGOT_PASSWORD_FAILURE:
          return {
            ...state,
            forGotPasswordResponse: action.forGotPasswordResponse,
          };

          case CLEAR_FORGOT_PASSWORD_MESSAGE:
          return {
            ...state,
            forGotPasswordResponse: undefined,
          };

          case USE_APP_STATE:
          return {
            ...state,
            useAppState: action.useAppState,
          };

          case RESET_REDUCERS:
          return {
            ...state,
            authenticated: false,
            signInAttempted: false,
            isStudent: false,
            isInstructor: false,
            loader: false,
            errMessage: undefined,
            forGotPasswordResponse: undefined,
            useAppState: true,
            emailVerified: undefined,
          };

          case SET_EMAIL_VERIFICATION:
          return {
            ...state,
            emailVerified: action.emailVerified,
          };

        default:
          return state;
      }
    }
  }