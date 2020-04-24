import {SET_DIALOGUE, SET_CONFIRMATION_DIALOGUE} from '../Constants'

const INITIAL_STATE = {
    visible: false,
    message: '',
    positve: undefined,
    negative: undefined,
    negativeButtonPressed: undefined,
    student: undefined,
    studentPhoto: undefined,
    positivePressed: undefined,
    pictureDialogueVisible: false,
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
                positivePressed: action.positivePressed,
                negativeButtonPressed: action.negativeButtonPressed,
              };

          case SET_CONFIRMATION_DIALOGUE:
            return {
                ...state,
                pictureDialogueVisible: action.visible,
                message: action.message,
                positve: action.positive,
                negative: action.negative,
                negativeButtonPressed: action.negativeButtonPressed,
                student: action.student,
                studentPhoto: action.studentPhoto,
                positivePressed: action.positivePressed
              };

        default:
          return state;
      }
    }
  }