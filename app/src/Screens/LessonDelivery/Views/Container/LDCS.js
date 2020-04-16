import React, { Component } from 'react';
import { connect } from 'react-redux';
import LDPS from '../Presentational/LDPS';
import { declineStudentAction } from '../../Actions/LDA';
import { LDR_RESET, SET_CALLING } from '../../../../Commons/Constants';
import CallP from '../Presentational/CallP';

class LDCS extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.cancelReservation = this.cancelReservation.bind(this);
      this.callnow = this.callnow.bind(this);
      this.endCall = this.endCall.bind(this);
  }

  componentDidMount()
  {

  }

  backButton()
  {
    this.props.navigation.navigate('Main Student Screen'); 
  }

  cancelReservation()
  {
    this.props.declineStudent(this.props.student);
  }

  callnow()
  {
    this.props.setCalling(true);
  }

  endCall()
  {
    this.props.setCalling(false);
  }

  render() {
    if(this.props.ldrback)
    {
        this.props.resetLDR();
        this.backButton();
    }

    if(this.props.calling)
      return(<CallP endCall={this.endCall}></CallP>);
    else
      return (<LDPS callnow={this.callnow} cancelReservation={this.cancelReservation} studentPhoto={this.props.studentPhoto} student={this.props.student} backButton={this.backButton}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    declineStudent: (student) => dispatch(declineStudentAction(student)),
    resetLDR: () => dispatch({"type": LDR_RESET}),
    setCalling: (status) => dispatch({"type": SET_CALLING, "status": status}),
  };
};

const mapStateToProps = (state) => {
  return {
    student: state.ldrReducer.student,
    studentPhoto: state.ldrReducer.studentPhoto,
    ldrback: state.mscreducer.ldrback,
    calling: state.ldrReducer.calling,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LDCS);