import React, { Component } from 'react';
import { connect } from 'react-redux';
import LDP from '../Presentational/LDP';
import { dialogueOKAction, showialogueAction, declineStudentAction } from '../../Actions/LDA';
import { LDR_RESET, SET_CALLING, SHOW_MAIN_LOADER, HIDE_MAIN_LOADER } from '../../../../Commons/Constants';
import CallP from '../Presentational/CallP';

class LDC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.cancelReservation = this.cancelReservation.bind(this);
      this.callnow = this.callnow.bind(this);
      this.endCall = this.endCall.bind(this);
      this.declineMessageHandler = this.declineMessageHandler.bind(this);
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
    if(!this.declineMessage || this.declineMessage === '')
    {
      this.props.showDialogue(() => {this.props.dialogueOkPressed()}, 'Please add a reason to Decline.');
    }
    else
    {
      this.props.showLoader();
      this.props.declineStudent(this.declineMessage, this.props.student);
    }
  }

  callnow()
  {
    this.props.setCalling(true);
  }

  endCall()
  {
    this.props.setCalling(false);
  }

  declineMessageHandler(message)
  {
      this.declineMessage = message;
  }

  render() {
    if(this.props.ldrback)
    {
        this.props.hideLoader();
        this.props.resetLDR();
        this.backButton();
    }

    if(this.props.calling)
    {
      let channelName = this.props.student.uuid+'_'+this.props.student.date;

      return(<CallP isInstructor={true} channelName={channelName} endCall={this.endCall}></CallP>);
    }
    else
      return (<LDP loader={this.props.loader} declineMessageHandler={this.declineMessageHandler} callnow={this.callnow} cancelReservation={this.cancelReservation} studentPhoto={this.props.studentPhoto} student={this.props.student} backButton={this.backButton}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    declineStudent: (message, student) => dispatch(declineStudentAction(message, student)),
    resetLDR: () => dispatch({"type": LDR_RESET}),
    setCalling: (status) => dispatch({"type": SET_CALLING, "status": status}),
    showDialogue: (negativeButtonPressed, message) => dispatch(showialogueAction(negativeButtonPressed, message)),
    dialogueOkPressed: () => dispatch(dialogueOKAction()),
    showLoader: () => dispatch({"type": SHOW_MAIN_LOADER}),
    hideLoader: () => dispatch({"type": HIDE_MAIN_LOADER}),
  };
};

const mapStateToProps = (state) => {
  return {
    student: state.ldrReducer.student,
    studentPhoto: state.ldrReducer.studentPhoto,
    ldrback: state.mscreducer.ldrback,
    calling: state.ldrReducer.calling,
    loader: state.mscreducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LDC);