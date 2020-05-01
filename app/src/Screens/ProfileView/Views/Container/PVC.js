import React, { Component } from 'react';
import { connect } from 'react-redux';
import PVP from '../Presentational/PVP';
import { USE_APP_STATE, SHOW_PROFILE_VIEW } from '../../../../Commons/Constants';
import {Linking} from 'react-native';

class PVC extends Component {

    constructor(props)
    {
        super(props);
  
        this.backButton = this.backButton.bind(this);
        this.creditHandler = this.creditHandler.bind(this);
        this.openCredit = this.openCredit.bind(this);
    }
  
    backButton()
    {
      this.props.hideProfileView();
      this.props.navigation.navigate('Main Instructor Screen'); 
    }

    creditHandler()
    {
      this.openCredit();   
      this.backButton();
    }

    openCredit()
    {
        Linking.openURL(this.props.lessonCreditUrl ? this.props.lessonCreditUrl+"?email="+this.props.currentUser.email : 'https://www.google.com');
    }
  
    render() {
  
      return (<PVP creditHandler={this.creditHandler} currentUser={this.props.currentUser} backButton={this.backButton} loader={this.props.loader} photoHint={this.props.photo !== undefined ? this.props.photo.filename : 'Tap to Add Photo'} profileandler={this.profileandler} onTCPress={this.tcCheckBoxHandler} signUpButtonHandler={this.signUpButtonHandler} userNameHandler={this.userNameHandler} emailHandler={this.emailHandler} passwordHandler={this.passwordHandler} photoHandler={this.photoHandler}/>);
    }
  }
  
  
  const mapDispatchToProps = (dispatch) => {
    return {
      hideProfileView: () => dispatch({type:`${SHOW_PROFILE_VIEW}`, showProfileView: false}),
      setUseAppState: (status) => dispatch({type:`${USE_APP_STATE}`, useAppState: status}),
    };
  };
  
  const mapStateToProps = (state) => {
    return {
      currentUser: state.mscreducer.currentUser,
      lessonCreditUrl: state.mscreducer.lessonCreditUrl,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(PVC);