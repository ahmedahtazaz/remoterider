import React, { Component } from 'react';
import MSP from '../Presentational/MSP'
import { connect } from 'react-redux';
import {loadDataAction, loadSlidingImagesAction} from '../../Actions/MSA';
import RNExitApp from 'react-native-exit-app';

class MSC extends Component {

  constructor(props)
  {
      super(props);

      this.backButtonPress = this.backButtonPress.bind(this);
  }

  componentDidMount()
  {
    this.props.loadData();
    this.props.loadSlidingImages();
  }

  backButtonPress()
  {
    RNExitApp.exitApp();
  }

  render() {
        return (<MSP images={this.props.slidingImages} backButton={this.backButtonPress}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(loadDataAction()),
    loadSlidingImages: () => dispatch(loadSlidingImagesAction()),
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