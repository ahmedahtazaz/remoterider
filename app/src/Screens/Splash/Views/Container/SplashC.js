import React, { Component } from 'react';
import SplashP from '../Presentational/SplashP'
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { signOutUserAction, signInUserAction, moveToWelcome1Action, signInSuccessAction, signInFailureAction, checkUserTypeAction, moveToMSAction } from '../../Actions/SignInA';

class SplashC extends Component {

  constructor(props)
  {
      super(props);

      this.signInUser = this.signInUser.bind(this);
      this.signInSuccess = this.signInSuccess.bind(this);
      this.signInFailure = this.signInFailure.bind(this);
      this.signInCallBack = this.signInCallBack.bind(this);
  }

  componentDidMount()
  {
    this.props.signOutUser();
    auth().onAuthStateChanged(this.signInCallBack);
  }

  signInCallBack(user)
  {
    if (user) 
    {
      //this.props.checkUserType();
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
  };
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.signInReducer.authenticated,
    signInAttempted: state.signInReducer.signInAttempted,
    isStudent: state.signInReducer.isStudent,
    isInstructor: state.signInReducer.isInstructor,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashC);