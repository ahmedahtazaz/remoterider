import React, { Component } from 'react';
import MSP from '../Presentational/MSP'
import { connect } from 'react-redux';
import {setInstructorForDeliveryAction, profilePressedAction, menuPresedAction, loadPhotoAction, loadSlidingImagesAction, loadReservationsAction, loadCategoriesAction} from '../../Actions/MSA';
import RNExitApp from 'react-native-exit-app';

class MSC extends Component {

  constructor(props)
  {
      super(props);

      this.backButtonPress = this.backButtonPress.bind(this);
      this.menuPress = this.menuPress.bind(this);
      this.profilePress = this.profilePress.bind(this);
      this.onReservationClick = this.onReservationClick.bind(this);
      this.makeReservationsHandler = this.makeReservationsHandler.bind(this);
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
    this.props.loadReservations();
    this.props.loadCategories();
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
    this.props.setInstructorForDelivery(item, this.props.reservations.photos[index]);
    this.props.navigation.navigate('Lesson Delivery Student');
  }

  onCategoriesClick(item, index)
  {

  }

  makeReservationsHandler()
  {
    this.props.navigation.navigate('Search for Instructor'); 
  }

  render() {
        return (<MSP reservationPress={this.makeReservationsHandler} showmenu={this.props.showmenu} onCategoriesClick={this.onCategoriesClick} categories={this.props.categories} onReservationClick={this.onReservationClick} reservations={this.props.reservations} images={this.props.slidingImages} backButton={this.backButtonPress} menuPress = {this.menuPress} photo = {this.props.photo} profilePress={this.profilePress}/>);
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
    setInstructorForDelivery: (student, photo) => dispatch(setInstructorForDeliveryAction(student, photo)),
  };
};

const mapStateToProps = (state) => {
  return {
      reservations: state.mscreducer.reservations,
      categories: state.mscreducer.categories,
      photo: state.mscreducer.photo,
      slidingImages: state.mscreducer.slidingImages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MSC);