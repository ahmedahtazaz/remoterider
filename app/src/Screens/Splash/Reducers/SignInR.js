import {SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from '../../../Commons/Constants'
const INITIAL_STATE = {
    authenticated: false,
    signInAttempted: false,
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

        default:
          return state;
      }
    }
  }