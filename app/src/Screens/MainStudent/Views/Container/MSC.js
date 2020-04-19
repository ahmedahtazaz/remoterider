import React, { Component } from 'react';
import MSP from '../Presentational/MSP'
import { connect } from 'react-redux';
import {setInstructorForDeliveryAction, profilePressedAction, menuPresedAction, loadPhotoAction, loadSlidingImagesAction, loadReservationsAction, loadCategoriesAction} from '../../Actions/MSA';
import RNExitApp from 'react-native-exit-app';
import { LOAD_CURRENT_USER } from '../../../../Commons/Constants';

class MSC extends Component {

  constructor(props)
  {
      super(props);

      this.backButtonPress = this.backButtonPress.bind(this);
      this.menuPress = this.menuPress.bind(this);
      this.profilePress = this.profilePress.bind(this);
      this.onReservationClick = this.onReservationClick.bind(this);
      this.makeReservationsHandler = this.makeReservationsHandler.bind(this);
      this.apiCall = this.apiCall.bind(this);
  }

  apiCall()
  {
    this.props.loadPhoto();
    this.props.loadSlidingImages();
    this.props.loadReservations();
    this.props.loadCategories();
    this.props.loadCurrentUser();
  }

  componentWillUnmount()
  {
    this.props.menuPresed(true);
    this.props.profilePressed(true);
  }

  componentDidMount()
  {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.apiCall();
    })
  }

  backButtonPress()
  {
    RNExitApp.exitApp();
  }

  menuPress()
  {
    this.props.menuPresed(false);
  }

  profilePress()
  {
    this.props.profilePressed(false);
  }

  onReservationClick(item, index)
  {
    if(item.confirmed.toString() === 'true')
    {
      this.props.setInstructorForDelivery(item, this.props.reservations.photos[index]);
      this.props.navigation.navigate('Lesson Delivery Student');
    }
  }

  onCategoriesClick(item, index)
  {

  }

  makeReservationsHandler()
  {
    this.props.navigation.navigate('Search for Instructor'); 
  }

  render() {

    return (<MSP currentUser={this.props.currentUser} reservationPress={this.makeReservationsHandler} showmenu={this.props.showmenu} onCategoriesClick={this.onCategoriesClick} categories={this.props.categories} onReservationClick={this.onReservationClick} reservations={this.props.reservations} images={this.props.slidingImages} backButton={this.backButtonPress} menuPress = {this.menuPress} photo = {this.props.photo} profilePress={this.profilePress}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadPhoto: () => dispatch(loadPhotoAction()),
    loadSlidingImages: () => dispatch(loadSlidingImagesAction()),
    loadReservations: () => dispatch(loadReservationsAction()),
    loadCategories: () => dispatch(loadCategoriesAction()),
    menuPresed: (status) => dispatch(menuPresedAction(status)),
    profilePressed: (status) => dispatch(profilePressedAction(status)),
    loadCurrentUser: () => dispatch({"type": LOAD_CURRENT_USER}),
    setInstructorForDelivery: (student, photo) => dispatch(setInstructorForDeliveryAction(student, photo)),
  };
};

const mapStateToProps = (state) => {
  return {
      reservations: state.mscreducer.reservations,
      categories: state.mscreducer.categories,
      photo: state.mscreducer.photo,
      slidingImages: state.mscreducer.slidingImages,
      currentUser: state.mscreducer.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MSC);