import React, { Component } from 'react';
import { connect } from 'react-redux';
import SAIP from '../Presentational/SAIP'
import User from '../../../../Commons/User';
import ImagePicker from 'react-native-image-crop-picker';
import { hideLoaderAction, showLoaderAction, clearSignUpErrorAction, errorDialogueAction, setPhotoAction, negativeAction, tcDialogueActionAction, toggleCheckBoxAction, signUpUserAction } from '../../Actions/SAIA';

class SAIC extends Component {

  constructor(props)
  {
      super(props);

      this.user = new User();
      this.filePath = {};

      this.userNameHandler = this.userNameHandler.bind(this);
      this.profileandler = this.profileandler.bind(this);
      this.emailHandler = this.emailHandler.bind(this);
      this.passwordHandler = this.passwordHandler.bind(this);
      this.photoHandler = this.photoHandler.bind(this);
      this.signUpButtonHandler = this.signUpButtonHandler.bind(this);
      this.tcCheckBoxHandler = this.tcCheckBoxHandler.bind(this);
      this.negativePressed = this.negativePressed.bind(this);
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
        this.user.isInstructor = true;
        this.user.image = this.props.photo;

        this.props.showLoader();

        this.props.signUpUser(this.user);
    }
    else{
      this.props.showErrorDialogue(this.negativePressed, 'Please Enter Your Name First');
    }
  }
 
  userNameHandler(event)
  {
    this.user.name = event;
  }

  profileandler(event)
  {
    this.user.profile = event;
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

  render() {
    if(this.props.signUpError)
    {
      this.props.showErrorDialogue(this.negativePressed, this.props.signUpError);
    }

    return (<SAIP loader={this.props.loader} photoHint={this.props.photo !== undefined ? this.props.photo.filename : 'Tap to Add Photo'} profileandler={this.profileandler} onTCPress={this.tcCheckBoxHandler} signUpButtonHandler={this.signUpButtonHandler} userNameHandler={this.userNameHandler} emailHandler={this.emailHandler} passwordHandler={this.passwordHandler} photoHandler={this.photoHandler}/>);
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

export default connect(mapStateToProps, mapDispatchToProps)(SAIC);