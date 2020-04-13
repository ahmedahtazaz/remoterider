import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResSearchP from '../Presentational/ResSearchP';
import { loadFeaturedAction, loadSearchAction } from '../../Actions/ResSearchA';

class ResSearchC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.searchHandler = this.searchHandler.bind(this);
  }

  componentWillMount()
  {
      this.props.loadFeatured();
  }

  backButton()
  {
    this.props.navigation.navigate('Main Student Screen'); 
  }

  searchHandler(querry)
  {
      this.props.loadSearch(querry);
  }

  render() {

    return (<ResSearchP searchResults={this.props.searchResults} searchHandler={this.searchHandler} featured={this.props.featured} backButton={this.backButton} loader={this.props.loader}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadFeatured: () => dispatch(loadFeaturedAction()),
    loadSearch: (querry) => dispatch(loadSearchAction(querry)),
  };
};

const mapStateToProps = (state) => {
  return {
      featured: state.mscreducer.featured,
      searchResults: state.mscreducer.searchResults,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResSearchC);