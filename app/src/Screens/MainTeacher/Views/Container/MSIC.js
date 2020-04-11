import React, { Component } from 'react';
import MSIP from '../Presentational/MSIP'
import { connect } from 'react-redux';
import {loadPhotoAction, loadSlidingImagesAction, loadScheduledLessonsAction, loadPendingLessonsAction} from '../../Actions/MSIA';
import RNExitApp from 'react-native-exit-app';

class MSIC extends Component {

  constructor(props)
  {
      super(props);

      this.backButtonPress = this.backButtonPress.bind(this);
      this.menuPress = this.menuPress.bind(this);
      this.profilePress = this.profilePress.bind(this);
      this.availabilityPress = this.availabilityPress.bind(this);
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

  menuPress()
  {

  }

  profilePress()
  {

  }

  availabilityPress(item, index)
  {

  }

  onpendingLessonsClick(item, index)
  {

  }

  render() {
        return (<MSIP onpendingLessonsClick={this.onpendingLessonsClick} pending={this.props.pending} availabilityPress={this.availabilityPress} scheduled={this.props.scheduled} images={this.props.slidingImages} backButton={this.backButtonPress} menuPress = {this.menuPress} photo = {this.props.photo} profilePress={this.profilePress}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadPhoto: () => dispatch(loadPhotoAction()),
    loadSlidingImages: () => dispatch(loadSlidingImagesAction()),
    loadScheduledLessons: () => dispatch(loadScheduledLessonsAction()),
    loadPendingLessons: () => dispatch(loadPendingLessonsAction()),
  };
};

const mapStateToProps = (state) => {
  return {
      scheduled: state.mscreducer.scheduled,
      pending: state.mscreducer.pending,
      photo: state.mscreducer.photo,
      slidingImages: state.mscreducer.slidingImages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MSIC);