import React, { Component } from 'react';
import { connect } from 'react-redux';
import UTVP from '../Presentational/UTVP';
import { USE_APP_STATE, SHOW_PROFILE_VIEW } from '../../../../Commons/Constants';

class UTVC extends Component {

    constructor(props)
    {
        super(props);
  
        this.backButton = this.backButton.bind(this);
    }
  
    backButton()
    {
      this.props.navigation.navigate('Main Instructor Screen'); 
    }
  
    render() {
  
      return (<UTVP currentUser={this.props.currentUser} backButton={this.backButton}/>);
    }
  }
  
  
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  
  const mapStateToProps = (state) => {
    return {
      currentUser: state.mscreducer.currentUser,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(UTVC);