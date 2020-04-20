import { DECLINE_STUDENT, SET_DIALOGUE } from "../../../Commons/Constants";

export const declineStudentAction = (message, student) => {
    return {
      type:`${DECLINE_STUDENT}`,
      student: student,
      declineMessage: message,
    }
  };

  export const showialogueAction = (negativeButtonPressed, message) => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: true,
      message: message,
      negative: 'OK',
      negativeButtonPressed: negativeButtonPressed,
    }
  };

  export const dialogueOKAction = () => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: false,
      message: '',
      negative: undefined,     
      positive: undefined,
      negativeButtonPressed: undefined,
    }
  };