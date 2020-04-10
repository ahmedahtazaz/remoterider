import { SIGN_IN_USER, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, CHECK_USER_TYPE, SIGN_OUT_USER, SET_DIALOGUE, CLEAR_SIGN_IN_ERROR, SHOW_SIGN_IN_LOADER, HIDE_SIGN_IN_LOADER } from "../../../Commons/Constants";

export const signInUserAction = (email, password) => {
    return {
      type:`${SIGN_IN_USER}`,
      email: email,
      password: password
    }
  };

  export const moveToWelcome1Action = (navigation) => {
    return navigation.navigate('Welcome'); 
  };

  export const signInSuccessAction = () => {
    return {
      type:`${SIGN_IN_SUCCESS}`
    }
  };

  export const signInFailureAction = () => {
    return {
      type:`${SIGN_IN_FAILURE}`
    }
  };

  export const checkUserTypeAction = () => {
    return {
      type:`${CHECK_USER_TYPE}`,
    }
  };

  export const moveToMSAction = (navigation) => {
    return navigation.navigate('Main Student Screen'); 
  };

  export const signOutUserAction = () => {
    return {
      type:`${SIGN_OUT_USER}`,
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

  export const clearSignInErrorAction = () => {
    return {
      type:`${CLEAR_SIGN_IN_ERROR}`
    }
  };

  export const showLoaderAction = () => {
    return {
      type:`${SHOW_SIGN_IN_LOADER}`
    }
  };

  export const hideLoaderAction = () => {
    return {
      type:`${HIDE_SIGN_IN_LOADER}`,
    }
  };