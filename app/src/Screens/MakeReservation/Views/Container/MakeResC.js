import React, { Component } from 'react';
import { connect } from 'react-redux';
import MakeResP from '../Presentational/MakeResP';
import { dialogueOKAction, showialogueAction, loadAvailableTimeSlotsAction, clearAvailableTimeSlotsAction, setSelectedTimeSlotAction, resetSelectedTimeSlotAction, makeReservationAction, resetmakeReservationAction } from '../../Actions/MakeResA';

class MakeResC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.onDateChange = this.onDateChange.bind(this);
      this.onTimeSlotClick = this.onTimeSlotClick.bind(this);
      this.onConfirm = this.onConfirm.bind(this);
      this.Cancel = this.Cancel.bind(this);
      this.dialogueButtonPress = this.dialogueButtonPress.bind(this);
  }

  componentWillMount()
  {
    
  }

  componentWillUnmount()
  {
    this.Cancel();
    this.props.clearAvailableTimeSlots();
    this.dialogueButtonPress();
  }

  backButton()
  {
    this.props.navigation.navigate('Search for Instructor'); 
  }

  onDateChange(date)
  {
    this.Cancel();

    let newDate = new Date(Date.UTC(date.year(), date.month(), date.date(), 0, 0, 0));

    this.props.loadAvailableTimeSlots(newDate.getTime(), this.props.instructor.uuid);
  }

  onTimeSlotClick(item, index)
  {
    this.props.setselectedSlot(index);
  }

  onConfirm(slotIndex)
  {
    this.props.makeReservation(Number.parseInt(this.props.availableTimeSlots[slotIndex].date, 10), this.props.instructor);
  }

  Cancel()
  {
    this.props.resetSelectedSlot();
  }

  dialogueButtonPress()
  {
    this.props.dialogueOkPressed();
    this.props.resetMakeReservation();
    this.props.resetSelectedSlot();
  }

  render() {
    if(this.props.makeReservMessage)
    {
        this.props.showDialogue(this.dialogueButtonPress, this.props.makeReservMessage);
    }

    return (<MakeResP Cancel = {this.Cancel} onConfirm = {this.onConfirm} selectedSlot={this.props.selectedSlot} onTimeSlotClick={this.onTimeSlotClick} availableTimeSlots={this.props.availableTimeSlots} onDateChange={this.onDateChange} photo={this.props.photo} instructorPhoto={this.props.instructorPhoto} instructor={this.props.instructor} backButton={this.backButton} loader={this.props.loader}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadAvailableTimeSlots: (date, uuid) => dispatch(loadAvailableTimeSlotsAction(date, uuid)),
    clearAvailableTimeSlots: () => dispatch(clearAvailableTimeSlotsAction()),
    setselectedSlot: (slot) => dispatch(setSelectedTimeSlotAction(slot)),
    resetSelectedSlot: () => dispatch(resetSelectedTimeSlotAction()),
    makeReservation: (date, instructor) => dispatch(makeReservationAction(date, instructor)),
    resetMakeReservation: () => dispatch(resetmakeReservationAction()),
    showDialogue: (negativeButtonPressed, message) => dispatch(showialogueAction(negativeButtonPressed, message)),
    dialogueOkPressed: () => dispatch(dialogueOKAction()),
  };
};

const mapStateToProps = (state) => {
  return {
    photo: state.mscreducer.photo,
    instructor: state.mscreducer.instructor,
    instructorPhoto: state.mscreducer.instructorPhoto,
    availableTimeSlots: state.mscreducer.availableTimeSlots,
    selectedSlot: state.mscreducer.selectedSlot,
    makeReservMessage: state.mscreducer.makeReservMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeResC);