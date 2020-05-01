import {LOAD_PHOTO, LOAD_SLIDING_IMAGES, LOAD_RESERVATIONS, LOAD_CATEGORIES, SET_MENU_VISIBILITY, SET_PROFILE_VISIBILITY, SET_STUDENT_FOR_DELIVERY, SET_DIALOGUE} from '../../../Commons/Constants'

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

  export const loadReservationsAction = () => {
    return {
      type:`${LOAD_RESERVATIONS}`,
    }
  };

  export const loadCategoriesAction = () => {
    return {
      type:`${LOAD_CATEGORIES}`,
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

  export const setInstructorForDeliveryAction = (student, photo) => {
    return {
      type:`${SET_STUDENT_FOR_DELIVERY}`,
      student: student,
      studentPhoto: photo
    }
  };

  export const showEmailVerificationDialogueAction = (positiveButtonPressed, negativeButtonPressed) => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: true,
      message: "We have sent you an email to confirm your Remote Rider registration. To complete your registration please open the email and follow the instructions",
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