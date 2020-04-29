import {SET_DIALOGUE, SET_STUDENT_FOR_DELIVERY, LOAD_PHOTO, LOAD_SLIDING_IMAGES, LOAD_SCHEDULED_LESSONS, LOAD_PENDING_LESSONS, SET_MENU_VISIBILITY, SET_PROFILE_VISIBILITY, SET_CONFIRMATION_DIALOGUE, DECLINE_STUDENT, CONFIRM_STUDENT} from '../../../Commons/Constants'

export const loadPhotoAction = () => {
    return {
      type:`${LOAD_PHOTO}`,
    }
  };

  export const loadSlidingImagesAction = () => {
    return {
      type:`${LOAD_SLIDING_IMAGES}`,
    }
  };

  export const loadScheduledLessonsAction = () => {
    return {
      type:`${LOAD_SCHEDULED_LESSONS}`,
    }
  };

  export const loadPendingLessonsAction = () => {
    return {
      type:`${LOAD_PENDING_LESSONS}`,
    }
  };

  export const menuPresedAction = (showmenu) => {
    return {
      type:`${SET_MENU_VISIBILITY}`,
      showmenu: showmenu,
    }
  };

  export const profilePressedAction = (showprofile) => {
    return {
      type:`${SET_PROFILE_VISIBILITY}`,
      showprofile: showprofile,
    }
  };

  export const showConfirmationDialogueAction = (negativepressed, positvepressed, student, studentphoto) => {
    return {
      type:`${SET_CONFIRMATION_DIALOGUE}`,
      negativeButtonPressed: negativepressed,
      positivePressed: positvepressed,
      student: student,
      studentPhoto: studentphoto,
      visible: true,
      negative: 'Decline',
      positive: 'Confirm',
    }
  };

  export const resetConfirmationDialogueAction = () => {
    return {
      type:`${SET_CONFIRMATION_DIALOGUE}`,
      negativeButtonPressed: undefined,
      positivePressed: undefined,
      student: undefined,
      studentPhoto: undefined,
      visible: false,
      negative: undefined,
      positive: undefined,
    }
  };

  export const declineStudentAction = (message, student) => {
    return {
      type:`${DECLINE_STUDENT}`,
      student: student,
      declineMessage: message,
    }
  };

  export const confirmStudentAction = (student) => {
    return {
      type:`${CONFIRM_STUDENT}`,
      student: student,
    }
  };

  export const setStudentForDeliveryAction = (student, photo) => {
    return {
      type:`${SET_STUDENT_FOR_DELIVERY}`,
      student: student,
      studentPhoto: photo
    }
  };

  export const negativeAction = () => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: false,
      message: '',
      negative: undefined,     
      positive: undefined,
      negativeButtonPressed: undefined,
    }
  };

  export const errorDialogueAction = (negativeButtonPressed, message) => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: true,
      message: message,
      negative: 'OK',
      negativeButtonPressed: negativeButtonPressed,
    }
  };

  export const showEmailVerificationDialogueAction = (positiveButtonPressed, negativeButtonPressed) => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: true,
      message: "We have sent you an email but Your Email Address is not verified. Kindly verify your email Address and Sign In Again",
      negative: 'Resend Email',
      positive: 'Ok',
      negativeButtonPressed: negativeButtonPressed,
      positivePressed: positiveButtonPressed,
    }
  };

  export const cancelEmailVerificationDialogueAction = () => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: false,
      message: "",
      negative: undefined,
      positive: undefined,
      negativeButtonPressed: undefined,
      positivePressed: undefined,
    }
  };