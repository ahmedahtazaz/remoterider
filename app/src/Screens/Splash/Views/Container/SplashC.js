import React, { Component } from 'react';
import SplashP from '../Presentational/SplashP'
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { AppState} from "react-native";
import { signOutUserAction, signInUserAction, moveToWelcome1Action, signInSuccessAction, signInFailureAction, checkUserTypeAction, moveToMSAction, moveToMIAction} from '../../Actions/SignInA';
import { USE_APP_STATE, RESET_RELOAD } from '../../../../Commons/Constants';

class SplashC extends Component {

  constructor(props)
  {
      super(props);

      this.signInUser = this.signInUser.bind(this);
      this.signInSuccess = this.signInSuccess.bind(this);
      this.signInFailure = this.signInFailure.bind(this);
      this.signInCallBack = this.signInCallBack.bind(this);
      this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount()
  {
    AppState.addEventListener("change", this.handleAppStateChange);
    auth().onAuthStateChanged(this.signInCallBack);
  }

  handleAppStateChange(riderState)
  {
    if(this.props.useAppState.toString() === 'true' && riderState === 'background')
      this.props.signOutUser();

    if(riderState === 'active')
    {
      this.props.setUseAppState(true);
      this.props.resetReload();
    }
  }

  signInCallBack(user)
  {
    if (user) 
    {
      this.props.checkUserType();
      this.signInSuccess();
    } 
    else 
    {
      this.signInFailure();
    }
  }

  signInUser()
  {
      this.props.signInUser();
  }

  signInSuccess()
  {
      this.props.signInSuccess();
  }

  signInFailure()
  {
      this.props.signInFailure();
  }

  render() {

    if(this.props.authenticated && this.props.signInAttempted)
    {
      if(this.props.isStudent)
      {
        this.props.moveToMS(this.props.navigation);
      }
      else if(this.props.isInstructor)
      {
        this.props.moveToMI(this.props.navigation);
      }
    }
    else if(!this.props.authenticated && this.props.signInAttempted)
    {
      this.props.moveToWelcome1(this.props.navigation);
    }

    return (<SplashP />);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
      signInUser: () => dispatch(signInUserAction()),
      signInSuccess: () => dispatch(signInSuccessAction()),
      signInFailure: () => dispatch(signInFailureAction()),
      moveToWelcome1: (navigation) => moveToWelcome1Action(navigation),
      checkUserType: () => dispatch(checkUserTypeAction()),
      moveToMS: (navigation) => moveToMSAction(navigation),
      signOutUser: () => dispatch(signOutUserAction()),
      moveToMI: (navigation) => moveToMIAction(navigation),
      setUseAppState: (status) => dispatch({type:`${USE_APP_STATE}`, useAppState: status}),
      resetReload: () => dispatch({"type": RESET_RELOAD}),
  };
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.signInReducer.authenticated,
    signInAttempted: state.signInReducer.signInAttempted,
    isStudent: state.signInReducer.isStudent,
    isInstructor: state.signInReducer.isInstructor,
    useAppState: state.signInReducer.useAppState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashC);