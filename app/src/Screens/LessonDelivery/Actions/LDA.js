import { DECLINE_STUDENT } from "../../../Commons/Constants";

export const declineStudentAction = (student) => {
    return {
      type:`${DECLINE_STUDENT}`,
      student: student,
    }
  };