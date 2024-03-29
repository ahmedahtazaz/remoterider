import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResSearchP from '../Presentational/ResSearchP';
import { setInstructorAction, loadFeaturedAction, loadSearchAction } from '../../Actions/ResSearchA';
import { CLEAR_SEARCH_DATA } from '../../../../Commons/Constants';

class ResSearchC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.searchHandler = this.searchHandler.bind(this);
      this.onInstructorClick = this.onInstructorClick.bind(this);
      this.onInstructorClickFeatured = this.onInstructorClickFeatured.bind(this);
      this.searchButton = this.searchButton.bind(this);
  }

  componentWillUnmount()
  {
    this.props.clearSearch();
  }

  backButton()
  {
    this.props.navigation.navigate('Main Student Screen'); 
  }

  searchHandler(querry)
  {
    this.searchQuerry = querry;
  }

  searchButton()
  {
    if(this.searchQuerry && this.searchQuerry !== '')
    {
      this.props.loadSearch(this.searchQuerry );
    }
  }

  onInstructorClick(instructor, index)
  {
    this.props.setInstructor(instructor, this.props.searchResults.photos[index]);
    this.props.navigation.navigate('Make Reservation with Instructor'); 
  }

  onInstructorClickFeatured(instructor, index)
  {
    this.props.setInstructor(instructor, this.props.featured.photos[index]);
    this.props.navigation.navigate('Make Reservation with Instructor'); 
  }

  render() {

    return (<ResSearchP searchQuerry={this.props.searchQuerry} searchButton={this.searchButton} onInstructorClickFeatured={this.onInstructorClickFeatured} onInstructorClick={this.onInstructorClick} searchResults={this.props.searchResults} searchHandler={this.searchHandler} featured={this.props.featured} backButton={this.backButton} loader={this.props.loader}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadFeatured: () => dispatch(loadFeaturedAction()),
    loadSearch: (querry) => dispatch(loadSearchAction(querry)),
    setInstructor: (instructor, instructorPhoto) => dispatch(setInstructorAction(instructor, instructorPhoto)),
    clearSearch: () => dispatch({"type": CLEAR_SEARCH_DATA}),
  };
};

const mapStateToProps = (state) => {
  return {
      featured: state.mscreducer.featured,
      searchResults: state.mscreducer.searchResults,
      searchQuerry: state.mscreducer.searchQuerry,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResSearchC);