import React, { Component } from 'react';
import { connect } from 'react-redux';
import Welcome1P from '../Presentational/Welcome1P'
import { moveToSignUpAction, moveToSignInAction } from '../../Actions/Welcome1A';
import RNExitApp from 'react-native-exit-app';
import { Platform, BackHandler } from 'react-native';

let backListener = undefined;

class Welcome1C extends Component {

  constructor(props)
  {
      super(props);

      this.signUpPress = this.signUpPress.bind(this);
      this.signInPress = this.signInPress.bind(this);
      this.handleBackButton = this.handleBackButton.bind(this);
  }
  
  componentDidMount()
  {
    this.props.navigation.addListener('focus', () => {
        backListener =  BackHandler.addEventListener("hardwareBackPress", () =>{this.handleBackButton()});
    });

    this.props.navigation.addListener('blur', () => {
      
      if(backListener)
        backListener.remove();
    });
  }

  componentWillUnmount()
  {
    if(backListener)
      backListener.remove();
  }

  handleBackButton(){
    
    if(this.props.route.name === 'Welcome')
    {
      RNExitApp.exitApp();
      return true;
    }

    return false;
  }

  signUpPress()
  {
      this.props.signUpPress(this.props.navigation);
  }

  signInPress()
  {
    this.props.signInPress(this.props.navigation);
  }

  render() {
    return (<Welcome1P backButton={this.handleBackButton} signInHandler = {this.signInPress} signUpHandler = {this.signUpPress}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    signUpPress: (navigation) => moveToSignUpAction(navigation),
    signInPress: (navigation) => moveToSignInAction(navigation),
  };
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome1C);