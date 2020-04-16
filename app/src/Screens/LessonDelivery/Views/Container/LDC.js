import React, { Component } from 'react';
import { connect } from 'react-redux';
import LDP from '../Presentational/LDP';
import { declineStudentAction } from '../../Actions/LDA';
import { LDR_RESET, SET_CALLING } from '../../../../Commons/Constants';
import CallP from '../Presentational/CallP';

class LDC extends Component {

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
    this.props.navigation.navigate('Main Instructor Screen'); 
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

    console.log('calling', this.props.calling);
    if(this.props.calling)
      return(<CallP endCall={this.endCall}></CallP>);
    else
      return (<LDP callnow={this.callnow} cancelReservation={this.cancelReservation} studentPhoto={this.props.studentPhoto} student={this.props.student} backButton={this.backButton}/>);
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

export default connect(mapStateToProps, mapDispatchToProps)(LDC);