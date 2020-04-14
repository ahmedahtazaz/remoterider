import React, { Component } from 'react';
import MSIP from '../Presentational/MSIP'
import { connect } from 'react-redux';
import {confirmStudentAction, declineStudentAction, resetConfirmationDialogueAction, showConfirmationDialogueAction, profilePressedAction, menuPresedAction, loadPhotoAction, loadSlidingImagesAction, loadScheduledLessonsAction, loadPendingLessonsAction} from '../../Actions/MSIA';
import RNExitApp from 'react-native-exit-app';
import { DECLINE_STUDENT_FAILURE } from '../../../../Commons/Constants';

class MSIC extends Component {

  constructor(props)
  {
      super(props);

      this.backButtonPress = this.backButtonPress.bind(this);
      this.menuPress = this.menuPress.bind(this);
      this.profilePress = this.profilePress.bind(this);
      this.availabilityPress = this.availabilityPress.bind(this);
      this.onPendingClick = this.onPendingClick.bind(this);
      this.negativePressed = this.negativePressed.bind(this);
      this.positivePressed = this.positivePressed.bind(this);
  }

  componentWillUnmount()
  {
    this.props.menuPresed(true);
    this.props.profilePressed(true);
  }

  componentDidMount()
  {
    this.props.loadPhoto();
    this.props.loadSlidingImages();
    this.props.loadScheduledLessons();
    this.props.loadPendingLessons();
  }

  backButtonPress()
  {
    RNExitApp.exitApp();
  }

  onPendingClick(pending, index)
  {
    this.props.showConfirmationDialogue(this.negativePressed, this.positivePressed, pending, this.props.pending.photos[index]);
  }

  negativePressed(pending)
  {
    this.props.declineStudent(pending);
    this.props.resetConfirmationDialogue();
  }

  positivePressed(pending)
  {
    this.props.confirmStudent(pending);
    this.props.resetConfirmationDialogue();
  }

  menuPress()
  {
    this.props.menuPresed(false);
  }

  profilePress()
  {
    this.props.profilePressed(false);
  }

  availabilityPress(item, index)
  {

  }

  onpendingLessonsClick(item, index)
  {

  }

  render() {

    if(this.props.reload)
    {
      this.props.resetReload();
      this.props.loadPhoto();
      this.props.loadSlidingImages();
      this.props.loadScheduledLessons();
      this.props.loadPendingLessons();
    }

    return (<MSIP onPendingClick={this.onPendingClick} pending={this.props.pending} availabilityPress={this.availabilityPress} scheduled={this.props.scheduled} images={this.props.slidingImages} backButton={this.backButtonPress} menuPress = {this.menuPress} photo = {this.props.photo} profilePress={this.profilePress}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadPhoto: () => dispatch(loadPhotoAction()),
    loadSlidingImages: () => dispatch(loadSlidingImagesAction()),
    loadScheduledLessons: () => dispatch(loadScheduledLessonsAction()),
    loadPendingLessons: () => dispatch(loadPendingLessonsAction()),
    menuPresed: (status) => dispatch(menuPresedAction(status)),
    profilePressed: (status) => dispatch(profilePressedAction(status)),
    showConfirmationDialogue: (negativepressed, positvepressed, student, studentphoto) => dispatch(showConfirmationDialogueAction(negativepressed, positvepressed, student, studentphoto)),
    resetConfirmationDialogue: () => dispatch(resetConfirmationDialogueAction()),
    declineStudent: (student) => dispatch(declineStudentAction(student)),
    confirmStudent: (student) => dispatch(confirmStudentAction(student)),
    resetReload: () => dispatch({"type": DECLINE_STUDENT_FAILURE}),
  };
};

const mapStateToProps = (state) => {
  return {
      scheduled: state.mscreducer.scheduled,
      pending: state.mscreducer.pending,
      photo: state.mscreducer.photo,
      slidingImages: state.mscreducer.slidingImages,
      reload: state.mscreducer.reload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MSIC);