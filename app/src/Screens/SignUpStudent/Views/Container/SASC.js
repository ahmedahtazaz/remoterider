import React, { Component } from 'react';
import { connect } from 'react-redux';
import SASP from '../Presentational/SASP'
import User from '../../../../Commons/User';
import ImagePicker from 'react-native-image-crop-picker';
import { hideLoaderAction, showLoaderAction, clearSignUpErrorAction, errorDialogueAction, setPhotoAction, negativeAction, tcDialogueActionAction, toggleCheckBoxAction, signUpUserAction } from '../../Actions/SASA';

class SASC extends Component {

  constructor(props)
  {
      super(props);

      this.user = new User();
      this.filePath = {};

      this.userNameHandler = this.userNameHandler.bind(this);
      this.emailHandler = this.emailHandler.bind(this);
      this.passwordHandler = this.passwordHandler.bind(this);
      this.photoHandler = this.photoHandler.bind(this);
      this.signUpButtonHandler = this.signUpButtonHandler.bind(this);
      this.tcCheckBoxHandler = this.tcCheckBoxHandler.bind(this);
      this.negativePressed = this.negativePressed.bind(this);
      this.backButton = this.backButton.bind(this);
      this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
      this.tcClickHandler = this.tcClickHandler.bind(this);
  }

  confirmPasswordHandler(event)
  {
    this.user.confirmPassword = event;
  }

  negativePressed()
  {
    this.props.negativeButtonPressed();
    this.props.clearSignUpError();
  }

  tcCheckBoxHandler(currentState)
  {
      this.props.toggleCheckBox(currentState);
  }

  signUpButtonHandler()
  {
    if(!this.props.isTCChecked)
    {
      this.props.showTCDialogue(this.negativePressed);
    }
    else if(this.user.name !== undefined)
    {
      if(!this.user.password)
      {
        this.props.showErrorDialogue(this.negativePressed, 'Please Enter Password');
      }
      else if(!this.user.email)
      {
        this.props.showErrorDialogue(this.negativePressed, 'Please Enter Email');
      }
      else if(this.user.password !== this.user.confirmPassword)
      {
        this.props.showErrorDialogue(this.negativePressed, 'Passwords do not match.');
      }
      else{
        this.user.isInstructor = false;
        this.user.image = this.props.photo;

        this.props.showLoader();
        
        this.props.signUpUser(this.user);
      }
    }
    else{
      this.props.showErrorDialogue(this.negativePressed, 'Please Enter Your Name');
    }
  }
 
  userNameHandler(event)
  {
    this.user.name = event;
  }

  emailHandler(event)
  {
    this.user.email = event;
  }

  passwordHandler(event)
  {
    this.user.password = event;
  }

  photoHandler()
  {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        this.props.setPhoto(image);
      }).catch((err) => {this.props.showErrorDialogue(this.negativePressed, err.message)}); 
  }

  backButton()
  {
    this.props.navigation.navigate('Sign Up'); 
  }

  tcClickHandler()
  {
    this.props.navigation.navigate('Terms and Conditions Student'); 
  }

  render() {
    if(this.props.signUpError)
    {
      this.props.showErrorDialogue(this.negativePressed, this.props.signUpError);
    }

    return (<SASP tcClickHandler={this.tcClickHandler} confirmPasswordHandler={this.confirmPasswordHandler} backButton={this.backButton} loader={this.props.loader} photoHint={this.props.photo !== undefined ? this.props.photo.filename : 'Tap to Add Photo'} onTCPress={this.tcCheckBoxHandler} signUpButtonHandler={this.signUpButtonHandler} userNameHandler={this.userNameHandler} emailHandler={this.emailHandler} passwordHandler={this.passwordHandler} photoHandler={this.photoHandler}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (user) => dispatch(signUpUserAction(user)),
    toggleCheckBox: (currentState) => dispatch(toggleCheckBoxAction(currentState)),
    showTCDialogue: (negativeButtonPressed) => dispatch(tcDialogueActionAction(negativeButtonPressed)),
    negativeButtonPressed: () => dispatch(negativeAction()),
    setPhoto: (photo) => dispatch(setPhotoAction(photo)),
    showErrorDialogue: (negativeButtonPressed, message) => dispatch(errorDialogueAction(negativeButtonPressed, message)),
    clearSignUpError: () => dispatch(clearSignUpErrorAction()),
    showLoader: () => dispatch(showLoaderAction()),
    hideLoader: () => dispatch(hideLoaderAction()),
  };
};

const mapStateToProps = (state) => {
  return {
    isTCChecked: state.checkboxReducer.checked,
    photo: state.photoReducer.photo,
    signUpError: state.signUpReducer.errMessage,
    loader: state.signUpReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SASC);