import { CLEAR_SIGN_UP_ERROR, SET_DIALOGUE, TOGGLE_CHECKBOX, SIGN_UP_USER, SET_PHOTO } from "../../../Commons/Constants";

export const signUpUserAction = (user) => {
    return {
      type:`${SIGN_UP_USER}`,
      user: user,
    }
  };

  export const toggleCheckBoxAction = (currentState) => {
    return {
      type:`${TOGGLE_CHECKBOX}`,
      currentState: currentState,
    }
  };

  export const tcDialogueActionAction = (negativeButtonPressed) => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: true,
      message: 'Please Accept the Terms & Conditions.',
      negative: 'OK',
      negativeButtonPressed: negativeButtonPressed,
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

  export const setPhotoAction = (photo) => {
    return {
      type:`${SET_PHOTO}`,
      photo: photo,
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

  export const clearSignUpErrorAction = () => {
    return {
      type:`${CLEAR_SIGN_UP_ERROR}`
    }
  };