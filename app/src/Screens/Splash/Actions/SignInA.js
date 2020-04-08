import { SIGN_IN_USER, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "../../../Commons/Constants";

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