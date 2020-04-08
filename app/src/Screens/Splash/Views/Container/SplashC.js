import React, { Component } from 'react';
import SplashP from '../Presentational/SplashP'
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { signInUserAction, moveToWelcome1Action, signInSuccessAction, signInFailureAction } from '../../Actions/SignInA';

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
    auth().onAuthStateChanged(this.signInCallBack);
  }

  signInCallBack(user)
  {
    if (user) 
    {
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
      this.props.moveToWelcome1(this.props.navigation);
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
  };
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.signInReducer.authenticated,
    signInAttempted: state.signInReducer.signInAttempted,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashC);