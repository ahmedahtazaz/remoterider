import {RESET_REDUCERS, SET_PROFILE_VISIBILITY} from '../Constants'

const INITIAL_STATE = {
    showprofile: false,
  };

export default function menudialogueReducer() {
    return function reducer(state = INITIAL_STATE, action) {

      switch (action.type) {
        case SET_PROFILE_VISIBILITY:
            return {
                ...state,
                showprofile: !action.showprofile,
              };

          case RESET_REDUCERS:
          return {
            ...state,
            showprofile: false,
          };

        default:
          return state;
      }
    }
  }