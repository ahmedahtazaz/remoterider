import { DECLINE_STUDENT, SET_DIALOGUE, DECLINE_INSTRUCTOR } from "../../../Commons/Constants";

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

  export const showialogueCancelStudentAction = (positiveButtonPressed, negativeButtonPressed) => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: true,
      message: "Lessons cancelled within 24 hours of the lesson time will be chargeable, unless otherwise agreed with the instructor.   Do you still want to Cancel?",
      negative: 'No',
      positive: 'Yes',
      negativeButtonPressed: negativeButtonPressed,
      positivePressed: positiveButtonPressed,
    }
  };

  export const dialogueCancelAction = () => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: false,
      message: '',
      negative: undefined,
      positive: undefined,
      negativeButtonPressed: undefined,
      positivePressed: undefined,
    }
  };

  export const declineInstructorAction = (instructor) => {
    return {
      type:`${DECLINE_INSTRUCTOR}`,
      instructor: instructor,
    }
  };