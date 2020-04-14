import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResSearchP from '../Presentational/ResSearchP';
import { setInstructorAction, loadFeaturedAction, loadSearchAction } from '../../Actions/ResSearchA';

class ResSearchC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.searchHandler = this.searchHandler.bind(this);
      this.onInstructorClick = this.onInstructorClick.bind(this);
      this.onInstructorClickFeatured = this.onInstructorClickFeatured.bind(this);
  }

  componentWillMount()
  {
      this.props.loadSearch('?');
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

    return (<ResSearchP onInstructorClickFeatured={this.onInstructorClickFeatured} onInstructorClick={this.onInstructorClick} searchResults={this.props.searchResults} searchHandler={this.searchHandler} featured={this.props.featured} backButton={this.backButton} loader={this.props.loader}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadFeatured: () => dispatch(loadFeaturedAction()),
    loadSearch: (querry) => dispatch(loadSearchAction(querry)),
    setInstructor: (instructor, instructorPhoto) => dispatch(setInstructorAction(instructor, instructorPhoto)),
  };
};

const mapStateToProps = (state) => {
  return {
      featured: state.mscreducer.featured,
      searchResults: state.mscreducer.searchResults,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResSearchC);