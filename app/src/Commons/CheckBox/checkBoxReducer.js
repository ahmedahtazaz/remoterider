import {TOGGLE_CHECKBOX} from '../Constants'

const INITIAL_STATE = {
    checked: false,
  };

export default function scheckBoxReducer() {
    return function reducer(state = INITIAL_STATE, action) {

      switch (action.type) {
        case TOGGLE_CHECKBOX:
            return {
                ...state,
                checked: !action.currentState,
              };

        default:
          return state;
      }
    }
  }