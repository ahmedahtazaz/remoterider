import React, { Component } from 'react';
import { connect } from 'react-redux';
import Welcome1P from '../Presentational/Welcome1P'
import { moveToWelcome2Action } from '../../Actions/Welcome1A';
import RNExitApp from 'react-native-exit-app';

class Welcome1C extends Component {

  constructor(props)
  {
      super(props);

      this.signUpPress = this.signUpPress.bind(this);
      this.signInPress = this.signInPress.bind(this);
      this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton(){
    RNExitApp.exitApp();
  }

  signUpPress()
  {
      this.props.signUpPress(this.props.navigation);
  }

  signInPress()
  {

  }

  render() {
    return (<Welcome1P backButton={this.handleBackButton} signInHandler = {this.signInPress} signUpHandler = {this.signUpPress}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    signUpPress: (navigation) => moveToWelcome2Action(navigation),
  };
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.signInReducer.authenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome1C);