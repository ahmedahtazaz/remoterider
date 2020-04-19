import React, { Component } from 'react';
import { connect } from 'react-redux';
import PVSP from '../Presentational/PVSP';
import { SHOW_PROFILE_VIEW } from '../../../../Commons/Constants';

class PVSC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
  }

  backButton()
  {
    this.props.hideProfileView();
    this.props.navigation.navigate('Main Student Screen'); 
  }

  render() {

    return (<PVSP currentUser={this.props.currentUser} backButton={this.backButton} loader={this.props.loader} photoHint={this.props.photo !== undefined ? this.props.photo.filename : 'Tap to Add Photo'} profileandler={this.profileandler} onTCPress={this.tcCheckBoxHandler} signUpButtonHandler={this.signUpButtonHandler} userNameHandler={this.userNameHandler} emailHandler={this.emailHandler} passwordHandler={this.passwordHandler} photoHandler={this.photoHandler}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    hideProfileView: () => dispatch({type:`${SHOW_PROFILE_VIEW}`, showProfileView: false}),
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.mscreducer.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PVSC);