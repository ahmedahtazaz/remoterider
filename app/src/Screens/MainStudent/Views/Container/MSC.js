import React, { Component } from 'react';
import MSP from '../Presentational/MSP'
import { connect } from 'react-redux';
import {loadDataAction, loadSlidingImagesAction} from '../../Actions/MSA'

class MSC extends Component {

  constructor(props)
  {
      super(props);
  }

  componentDidMount()
  {
    console.log('msc')
    this.props.loadData();
    this.props.loadSlidingImages();
  }

  render() {
        return (<MSP images={this.props.slidingImages}/>);
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