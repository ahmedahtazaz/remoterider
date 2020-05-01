import React, { Component } from 'react';
import MSP from '../Presentational/MSP'
import { connect } from 'react-redux';
import {setInstructorForDeliveryAction, profilePressedAction, menuPresedAction, loadPhotoAction, loadSlidingImagesAction, loadReservationsAction, loadCategoriesAction, showEmailVerificationDialogueAction, cancelEmailVerificationDialogueAction} from '../../Actions/MSA';
import RNExitApp from 'react-native-exit-app';
import { LOAD_CURRENT_USER, SIGN_OUT_USER, RESET_REDUCERS, RESEND_EMAIL_VERIFICATION_MAIL, LOAD_ADMOB_ID } from '../../../../Commons/Constants';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

let interstitial = undefined;

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
      this.initInterstitialAd = this.initInterstitialAd.bind(this);
      this.subscribeAdmob = this.subscribeAdmob.bind(this);
      this.unSubscribeAdmob = this.unSubscribeAdmob.bind(this);
  }

  initInterstitialAd()
  {
    let adUnit = this.props.admobId ? (this.props.admobId.toString() === 'TestId' ? TestIds.INTERSTITIAL : this.props.admobId) : TestIds.INTERSTITIAL;
    
    if(interstitial)
    {
      interstitial.onAdEvent(() => {});
      interstitial = undefined;
    }

    interstitial = InterstitialAd.createForAdRequest(adUnit, {
      requestNonPersonalizedAdsOnly: true,
    });
     
  }

  apiCall()
  {
    this.props.loadPhoto();
    this.props.loadSlidingImages();
    this.props.loadReservations();
    this.props.loadCategories();
    this.props.loadCurrentUser();
    this.props.loadAdmobId();
  }

  loadInterstitialAd()
  {
    this.initInterstitialAd();

    if(interstitial)
    {
      interstitial.onAdEvent(type => {
        if (type === AdEventType.LOADED) 
        {
          this.onAdLoaded(true);
        }
        else if(type === AdEventType.CLOSED)
        {
          if(interstitial)
            interstitial.onAdEvent(() => {});
        }
      });
  
      interstitial.load();
    }
  }

  onAdLoaded(status)
  {
    if(status && interstitial)
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

  subscribeAdmob()
  {
    let doc = firestore().collection('Admob').doc('Admob');

    doc.onSnapshot(docSnapshot => {
      interstitial = undefined;
      this.apiCall();
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  unSubscribeAdmob()
  {
    firestore().collection('Admob').onSnapshot(() => {});
  }

  componentWillUnmount()
  {
    if(interstitial)
    {
      interstitial.onAdEvent(() => {});
      interstitial = undefined;
    }
    
    this.unSubscribeAdmob();
    this.unSubscribeReservations();
    this.props.menuPresed(true);
    this.props.profilePressed(true);
  }

  componentDidMount()
  {
    this.subscribeAdmob();
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

    if( this.props.emailVerified !== undefined && this.props.emailVerified.toString() === 'false')
    {
      this.props.showEmailVerificationDialogue(() => {this.props.cancelEmailVerificationDialogue(), this.props.signOut(), this.props.resetReducers()}, () => {this.props.cancelEmailVerificationDialogue(), this.props.resendVerificationLink(), this.props.signOut(), this.props.resetReducers()});
    }

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
    showEmailVerificationDialogue: (positiveButtonPressed, negativeButtonPressed) => dispatch(showEmailVerificationDialogueAction(positiveButtonPressed, negativeButtonPressed)),
    cancelEmailVerificationDialogue: () => dispatch(cancelEmailVerificationDialogueAction()),
    signOut: () => dispatch({type:`${SIGN_OUT_USER}`}),
    resetReducers: () => dispatch({"type": RESET_REDUCERS}),
    resendVerificationLink: () => dispatch({"type": RESEND_EMAIL_VERIFICATION_MAIL}),
    loadAdmobId: () => dispatch({"type": LOAD_ADMOB_ID}),
  };
};

const mapStateToProps = (state) => {
  return {
      reservations: state.mscreducer.reservations,
      categories: state.mscreducer.categories,
      photo: state.mscreducer.photo,
      slidingImages: state.mscreducer.slidingImages,
      currentUser: state.mscreducer.currentUser,
      emailVerified: state.signInReducer.emailVerified,
      admobId: state.mscreducer.admobId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MSC);