import React, { Component } from 'react';
import MSP from '../Presentational/MSP'
import { connect } from 'react-redux';
import {loadDataAction} from '../../Actions/MSA'

class MSC extends Component {

  constructor(props)
  {
      super(props);
  }

  componentDidMount()
  {
    this.props.loadData();
  }

  render() {
    return (<MSP />);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(loadDataAction()),
  };
};

const mapStateToProps = (state) => {
  return {
      reservations: state.mscreducer.reservations,
      categories: state.mscreducer.categories,
      photo: state.mscreducer.photo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MSC);