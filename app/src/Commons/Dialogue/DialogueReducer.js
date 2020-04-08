import {SET_DIALOGUE} from '../Constants'

const INITIAL_STATE = {
    visible: false,
    message: '',
    positve: undefined,
    negative: undefined,
    negativeButtonPressed: undefined,
  };

export default function dialogueReducer() {
    return function reducer(state = INITIAL_STATE, action) {

      switch (action.type) {
        case SET_DIALOGUE:
            return {
                ...state,
                visible: action.visible,
                message: action.message,
                positve: action.positive,
                negative: action.negative,
                negativeButtonPressed: action.negativeButtonPressed,
              };

        default:
          return state;
      }
    }
  }