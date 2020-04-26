import React, { Component } from 'react';
import MSP from '../Presentational/MSP'
import { connect } from 'react-redux';
import {setInstructorForDeliveryAction, profilePressedAction, menuPresedAction, loadPhotoAction, loadSlidingImagesAction, loadReservationsAction, loadCategoriesAction} from '../../Actions/MSA';
import RNExitApp from 'react-native-exit-app';
import { LOAD_CURRENT_USER } from '../../../../Commons/Constants';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

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
      this.subscribeReservations = this.subscribeReservations.bind(this);
      this.unSubscribeReservations = this.unSubscribeReservations.bind(this);
      this.onAdLoaded = this.onAdLoaded.bind(this);
      this.loadInterstitialAd = this.loadInterstitialAd.bind(this);
  }

  apiCall()
  {
    this.props.loadPhoto();
    this.props.loadSlidingImages();
    this.props.loadReservations();
    this.props.loadCategories();
    this.props.loadCurrentUser();
  }

  loadInterstitialAd()
  {
    interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) 
      {
        this.onAdLoaded(true);
      }
      else if(type === AdEventType.CLOSED)
      {
        interstitial.onAdEvent(() => {});
      }
    });

    interstitial.load();
  }

  onAdLoaded(status)
  {
    if(status)
      interstitial.show();
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

  componentWillUnmount()
  {
    interstitial.onAdEvent(() => {});
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
    this.loadInterstitialAd();
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