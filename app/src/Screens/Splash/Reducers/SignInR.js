import {SIGN_IN_SUCCESS, SIGN_IN_FAILURE, CHECK_USER_SUCCESS, CHECK_USER_FAILURE} from '../../../Commons/Constants'

const INITIAL_STATE = {
    authenticated: false,
    signInAttempted: false,
    isStudent: false,
    isInstructor: false,
  };

export default function signInReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      console.log(action)
      switch (action.type) {

        case SIGN_IN_SUCCESS:
          return {
            ...state,
            authenticated: true,
            signInAttempted: true
          };

          case SIGN_IN_FAILURE:
          return {
            ...state,
            authenticated: false,
            signInAttempted: true
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

        default:
          return state;
      }
    }
  }