import { RESET_REDUCERS, SET_STUDENT_FOR_DELIVERY, SET_CALLING } from "../../../Commons/Constants";

const INITIAL_STATE = {
    student: undefined,
    studentPhoto: undefined,
    calling: false,
  };

export default function ldrReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {

        case SET_STUDENT_FOR_DELIVERY:
          return {
            ...state,
            student: action.student,
            studentPhoto: action.studentPhoto
          };

          case SET_CALLING:
          return {
            ...state,
            calling: action.status,
          };

          case RESET_REDUCERS:
          return {
            ...state,
            student: undefined,
            studentPhoto: undefined,
            calling: false,
          };

        default:
          return state;
      }
    }
  }