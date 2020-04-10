import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInP from '../Presentational/SignInP'
import User from '../../../../Commons/User';
import { signInUserAction, negativeAction, errorDialogueAction, clearSignInErrorAction, showLoaderAction, hideLoaderAction } from '../../../Splash/Actions/SignInA';

class SignInC extends Component {

  constructor(props)
  {
      super(props);

      this.user = new User();

      this.emailHandler = this.emailHandler.bind(this);
      this.passwordHandler = this.passwordHandler.bind(this);
      this.signInButtonHandler = this.signInButtonHandler.bind(this);
      this.negativePressed = this.negativePressed.bind(this);
  }

  negativePressed()
  {
    this.props.negativeButtonPressed();
    this.props.clearSignInError();
  }

  signInButtonHandler()
  {
      if(this.user.email && this.user.password)
      {
        this.props.showLoader();
    
        this.props.signInUser(this.user.email, this.user.password);
      }
      else
        this.props.showErrorDialogue(this.negativePressed, 'Please Enter Email and Password First');
  }

  emailHandler(event)
  {
    this.user.email = event;
  }

  passwordHandler(event)
  {
    this.user.password = event;
  }

  render() {

    if(this.props.signInError)
    {
      this.props.showErrorDialogue(this.negativePressed, this.props.signInError);
    }

    return (<SignInP loader={this.props.loader} signInButtonHandler={this.signInButtonHandler} emailHandler={this.emailHandler} passwordHandler={this.passwordHandler} />);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (email, password) => dispatch(signInUserAction(email, password)),
    negativeButtonPressed: () => dispatch(negativeAction()),
    showErrorDialogue: (negativeButtonPressed, message) => dispatch(errorDialogueAction(negativeButtonPressed, message)),
    clearSignInError: () => dispatch(clearSignInErrorAction()),
    showLoader: () => dispatch(showLoaderAction()),
    hideLoader: () => dispatch(hideLoaderAction()),
  };
};

const mapStateToProps = (state) => {
  return {
    signInError: state.signInReducer.errMessage,
    loader: state.signInReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInC);