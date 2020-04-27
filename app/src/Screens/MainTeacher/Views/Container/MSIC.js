import React, { Component } from 'react';
import MSIP from '../Presentational/MSIP';
import MSIPP from '../Presentational/MSIPP';

import { connect } from 'react-redux';
import {negativeAction, errorDialogueAction, setStudentForDeliveryAction, confirmStudentAction, declineStudentAction, resetConfirmationDialogueAction, showConfirmationDialogueAction, profilePressedAction, menuPresedAction, loadPhotoAction, loadSlidingImagesAction, loadScheduledLessonsAction, loadPendingLessonsAction} from '../../Actions/MSIA';
import RNExitApp from 'react-native-exit-app';
import { LOAD_LESSON_CREDIT_URL, DECLINE_STUDENT_FAILURE, LOAD_CURRENT_USER, SHOW_MAIN_LOADER, HIDE_MAIN_LOADER } from '../../../../Commons/Constants';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
      this.onScheduledLessonsClick = this.onScheduledLessonsClick.bind(this);
      this.apiCall = this.apiCall.bind(this);
      this.updateCredit = this.updateCredit.bind(this);
      this.canConfirm = this.canConfirm.bind(this);
      this.picturePress = this.picturePress.bind(this);
      this.subscribeReservations = this.subscribeReservations.bind(this);
      this.unSubscribeReservations = this.unSubscribeReservations.bind(this);
  }

  subscribeReservations()
  {
    var currentUser = auth().currentUser;

    let doc = firestore().collection('Reservations').doc(currentUser.uid);

    doc.onSnapshot(docSnapshot => {
      this.apiCall();
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  unSubscribeReservations()
  {
    firestore().collection('Reservations').onSnapshot(() => {});
  }

  apiCall()
  {
    this.props.loadPhoto();
    this.props.loadSlidingImages();
    this.props.loadScheduledLessons();
    this.props.loadPendingLessons();
    this.props.loadCurrentUser();
    this.props.loadUpdateLessonCreditURL();
  }

  componentWillUnmount()
  {
    this.unSubscribeReservations();
    this.props.menuPresed(true);
    this.props.profilePressed(true);
  }

  componentDidMount()
  {
    this.subscribeReservations();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.apiCall();
    })
  }

  backButtonPress()
  {
    RNExitApp.exitApp();
  }

  onPendingClick(pending, index)
  {
    this.props.showConfirmationDialogue(this.negativePressed, this.positivePressed, pending, this.props.pending.photos[index]);
  }

  negativePressed(message, pending)
  {
    this.props.resetConfirmationDialogue();

    if(!message || message === '')
    {
      this.props.showErrorDialogue(() => {this.props.negativeButtonPressed()}, 'Please add a reason to Decline.');
    }
    else
    {
      this.props.showLoader();
      this.props.declineStudent(message, pending);
    }
  }

  positivePressed(pending)
  {
    this.props.resetConfirmationDialogue();

    if(this.canConfirm())
    {
      this.props.showLoader();
      this.props.confirmStudent(pending);
    }
    else
      this.props.showErrorDialogue(() => {this.props.negativeButtonPressed()}, 'You need to update your Lesson Credits to confirm.');
  }

  canConfirm()
  {
    return Number.parseInt(this.props.currentUser.lessonCredit, 10) > 0;
  }

  menuPress()
  {
    this.props.menuPresed(false);
  }

  profilePress()
  {
    this.props.profilePressed(false);
  }

  availabilityPress()
  {
    this.props.navigation.navigate('Manage Availability'); 
  }

  onScheduledLessonsClick(item, index)
  {
    this.props.setStudentForDelivery(item, this.props.scheduled.photos[index]);
    this.props.navigation.navigate('Lesson Delivery Instructor'); 
  }

  updateCredit()
  {
    this.props.navigation.navigate('Profile View Instructor'); 
  }

  picturePress()
  {
    //this.props.navigation.navigate('Update Teacher View'); 
  }

  render() {

    if(this.props.reload)
    {
      this.props.hideLoader();
      this.props.resetReload();
      this.props.loadPhoto();
      this.props.loadSlidingImages();
      this.props.loadScheduledLessons();
      this.props.loadPendingLessons();
      this.props.loadCurrentUser();
      this.props.loadUpdateLessonCreditURL();
    }

    if(this.props.currentUser && this.props.currentUser.verified && this.props.currentUser.verified.toString() === 'true')
      return (<MSIP picturePress={this.picturePress} loader={this.props.loader} updateCredit={this.updateCredit} currentUser={this.props.currentUser} onScheduledLessonsClick={this.onScheduledLessonsClick} onPendingClick={this.onPendingClick} pending={this.props.pending} availabilityPress={this.availabilityPress} scheduled={this.props.scheduled} images={this.props.slidingImages} backButton={this.backButtonPress} menuPress = {this.menuPress} photo = {this.props.photo} profilePress={this.profilePress}/>);
    else
      return (<MSIPP loader={this.props.loader} currentUser={this.props.currentUser} onScheduledLessonsClick={this.onScheduledLessonsClick} onPendingClick={this.onPendingClick} pending={this.props.pending} availabilityPress={this.availabilityPress} scheduled={this.props.scheduled} images={this.props.slidingImages} backButton={this.backButtonPress} menuPress = {this.menuPress} photo = {this.props.photo} profilePress={this.profilePress}/>);
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
    declineStudent: (message, student) => dispatch(declineStudentAction(message, student)),
    confirmStudent: (student) => dispatch(confirmStudentAction(student)),
    resetReload: () => dispatch({"type": DECLINE_STUDENT_FAILURE}),
    loadCurrentUser: () => dispatch({"type": LOAD_CURRENT_USER}),
    setStudentForDelivery: (student, photo) => dispatch(setStudentForDeliveryAction(student, photo)),
    showErrorDialogue: (negativeButtonPressed, message) => dispatch(errorDialogueAction(negativeButtonPressed, message)),
    negativeButtonPressed: () => dispatch(negativeAction()),
    loadUpdateLessonCreditURL: () => dispatch({"type": LOAD_LESSON_CREDIT_URL}),
    showLoader: () => dispatch({"type": SHOW_MAIN_LOADER}),
    hideLoader: () => dispatch({"type": HIDE_MAIN_LOADER}),
  };
};

const mapStateToProps = (state) => {
  return {
      scheduled: state.mscreducer.scheduled,
      pending: state.mscreducer.pending,
      photo: state.mscreducer.photo,
      slidingImages: state.mscreducer.slidingImages,
      reload: state.mscreducer.reload,
      currentUser: state.mscreducer.currentUser,
      loader: state.mscreducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MSIC);