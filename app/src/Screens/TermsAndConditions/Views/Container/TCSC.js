import React, { Component } from 'react';
import { connect } from 'react-redux';
import TCP from '../Presentational/TCP';
import { RESET_TC_TEXT, LOAD_TC_TEXT } from '../../../../Commons/Constants';

class TCSC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
  }

  componentDidMount()
  {
      this.props.loadTCText();
  }

  componentWillUnmount()
  {
    this.props.resetTCText();
  }

  backButton()
  {
    this.props.navigation.navigate('Student Sign Up'); 
  }

  render() {
    return (<TCP tcText={this.props.tcText} backButton={this.backButton}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadTCText: () => dispatch({"type": LOAD_TC_TEXT}),
    resetTCText: () => dispatch({"type": RESET_TC_TEXT}),
  };
};

const mapStateToProps = (state) => {
  return {
    tcText: state.tcReducer.tcText,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TCSC);