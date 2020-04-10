import { SIGN_IN_USER, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, CHECK_USER_TYPE, SIGN_OUT_USER} from "../../../Commons/Constants";

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