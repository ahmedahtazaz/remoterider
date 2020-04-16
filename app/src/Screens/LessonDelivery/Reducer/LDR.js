import { SET_STUDENT_FOR_DELIVERY } from "../../../Commons/Constants";

const INITIAL_STATE = {
    student: undefined,
    studentPhoto: undefined
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

        default:
          return state;
      }
    }
  }