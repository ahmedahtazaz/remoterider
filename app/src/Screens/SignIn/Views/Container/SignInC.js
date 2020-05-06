import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInP from '../Presentational/SignInP'
import User from '../../../../Commons/User';
import { clearforgotPasswordAction, forgotPasswordAction, signInUserAction, negativeAction, errorDialogueAction, clearSignInErrorAction, showLoaderAction, hideLoaderAction } from '../../../Splash/Actions/SignInA';
import { CHECK_FINGERPRINT_ENROLLED, SETUP_FINGERPRINT_ENROLLMENT, LOGIN_VIA_FINGERPRINT } from '../../../../Commons/Constants';

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
      this.backButton = this.backButton.bind(this);
      this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
      this.setFingerPrintHandler = this.setFingerPrintHandler.bind(this);
      this.checkFingerPrintEnrollment = this.checkFingerPrintEnrollment.bind(this);
      this.loginFingerPrintHandler = this.loginFingerPrintHandler.bind(this);
  }

  componentDidMount()
  {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.checkFingerPrintEnrollment();
    });
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
        this.props.showErrorDialogue(this.negativePressed, 'Please Enter Email and Password.');
  }

  emailHandler(event)
  {
    this.user.email = event;
  }

  passwordHandler(event)
  {
    this.user.password = event;
  }

  confirmPasswordHandler(event)
  {
    this.user.confirmPassword = event;
  }

  forgotPasswordHandler()
  {
      if(this.user.email)
      {
        this.props.forgotPassword(this.user.email);
      }
      else{
        this.props.showErrorDialogue(this.negativePressed, 'Please Enter Your Email');
      }  
  }

  setFingerPrintHandler()
  {
      if(this.user.email && this.user.password)
      { 
        this.props.showLoader();
        this.props.setUpFingerPrintEnrolled(this.user.email, this.user.password);
      }
      else
        this.props.showErrorDialogue(this.negativePressed, 'Please Enter Email and Password.');    
  }

  backButton()
  {
    this.props.navigation.navigate('Welcome'); 
  }

  checkFingerPrintEnrollment()
  {
    this.props.showLoader();
    this.props.checkFingerPrintEnrolled();
  }

  loginFingerPrintHandler()
  {
    this.props.showLoader();
    this.props.loginViaFingerPrint();
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

    return (<SignInP loginFingerPrintHandler={this.loginFingerPrintHandler} isFingerPrintEnrolled={this.props.isFingerPrintEnrolled} setFingerPrintHandler={this.setFingerPrintHandler} confirmPasswordHandler={this.confirmPasswordHandler} backButton={this.backButton} forgotPasswordHandler={this.forgotPasswordHandler} loader={this.props.loader} signInButtonHandler={this.signInButtonHandler} emailHandler={this.emailHandler} passwordHandler={this.passwordHandler} />);
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
    setUpFingerPrintEnrolled: (user, pass) => dispatch({'type': SETUP_FINGERPRINT_ENROLLMENT, 'username': user, 'password': pass}),
    checkFingerPrintEnrolled: () => dispatch({'type': CHECK_FINGERPRINT_ENROLLED}),
    loginViaFingerPrint: () => dispatch({'type': LOGIN_VIA_FINGERPRINT}),
  };
};

const mapStateToProps = (state) => {
  return {
    signInError: state.signInReducer.errMessage,
    loader: state.signInReducer.loader,
    forGotPasswordResponse: state.signInReducer.forGotPasswordResponse,
    isFingerPrintEnrolled: state.signInReducer.isFingerPrintEnrolled,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInC);