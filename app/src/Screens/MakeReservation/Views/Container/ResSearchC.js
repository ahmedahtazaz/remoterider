import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResSearchP from '../Presentational/ResSearchP';
import { loadFeaturedAction } from '../../Actions/ResSearchA';

class ResSearchC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
  }

  componentWillMount()
  {
      this.props.loadFeatured();
  }

  backButton()
  {
    this.props.navigation.navigate('Main Student Screen'); 
  }

  render() {

    return (<ResSearchP featured={this.props.featured} backButton={this.backButton} loader={this.props.loader}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadFeatured: () => dispatch(loadFeaturedAction()),
  };
};

const mapStateToProps = (state) => {
  return {
      featured: state.mscreducer.featured,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResSearchC);