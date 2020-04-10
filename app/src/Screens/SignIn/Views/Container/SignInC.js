import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInP from '../Presentational/SignInP'
import User from '../../../../Commons/User';
import { clearforgotPasswordAction, forgotPasswordAction, signInUserAction, negativeAction, errorDialogueAction, clearSignInErrorAction, showLoaderAction, hideLoaderAction } from '../../../Splash/Actions/SignInA';

class SignInC extends Component {

  constructor(props)
  {
      super(props);

      this.user = new User();

      this.emailHandler = this.emailHandler.bind(this);
      this.passwordHandler = this.passwordHandler.bind(this);
      this.signInButtonHandler = this.signInButtonHandler.bind(this);
      this.negativePressed = this.negativePressed.bind(this);
      this.forgotPasswordHandler = this.forgotPasswordHandler.bind(this);
  }

  negativePressed()
  {
    this.props.negativeButtonPressed();
    this.props.clearSignInError();
    this.props.clearForgotPassword();
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

  forgotPasswordHandler()
  {
      console.log('forgot password handler')
      if(this.user.email)
      {
        this.props.forgotPassword(this.user.email);
      }
      else{
        this.props.showErrorDialogue(this.negativePressed, 'Please Enter Your Email First');
      }  
  }

  render() {

    if(this.props.signInError)
    {
      this.props.showErrorDialogue(this.negativePressed, this.props.signInError);
    }
    else if(this.props.forGotPasswordResponse)
    {
        this.props.showErrorDialogue(this.negativePressed, this.props.forGotPasswordResponse);
    }

    return (<SignInP forgotPasswordHandler={this.forgotPasswordHandler} loader={this.props.loader} signInButtonHandler={this.signInButtonHandler} emailHandler={this.emailHandler} passwordHandler={this.passwordHandler} />);
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
    forgotPassword: (email) => dispatch(forgotPasswordAction(email)),
    clearForgotPassword: () => dispatch(clearforgotPasswordAction()),
  };
};

const mapStateToProps = (state) => {
  return {
    signInError: state.signInReducer.errMessage,
    loader: state.signInReducer.loader,
    forGotPasswordResponse: state.signInReducer.forGotPasswordResponse,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInC);