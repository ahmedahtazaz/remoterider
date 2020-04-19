import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetConfirmationDialogueAction, declineStudentAction, confirmStudentAction, showConfirmationDialogueAction, loadPendingSlotDataAction, onAvailabilityConfirmAction, setCostAction, dialogueOKAction, showialogueAction, loadTimeSlotsAction, clearTimeSlotsAction, setSelectedTimeSlotAction, resetSelectedTimeSlotAction} from '../../Actions/ManageA';
import ManageAP from '../Presentational/ManageAP';
import { SET_COST_FAILURE, LOAD_CURRENT_USER, LOAD_PENDING_SLOT_DATA_FAILURE } from '../../../../Commons/Constants';

class ManageAC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.onDateChange = this.onDateChange.bind(this);
      this.onTimeSlotClick = this.onTimeSlotClick.bind(this);
      this.Cancel = this.Cancel.bind(this);
      this.dialogueButtonPress = this.dialogueButtonPress.bind(this);
      this.costHandler = this.costHandler.bind(this);
      this.currencyHandler = this.currencyHandler.bind(this);
      this.onCostConfirm = this.onCostConfirm.bind(this);
      this.onAvailabilityConfirm = this.onAvailabilityConfirm.bind(this);
      this.onPendingTimeSlotClick = this.onPendingTimeSlotClick.bind(this);
      this.confirmStudent = this.confirmStudent.bind(this);
      this.canConfirm = this.canConfirm.bind(this);
  }

  componentWillMount()
  {
    
  }

  componentWillUnmount()
  {
    this.Cancel();
    this.props.clearTimeSlots();
    this.dialogueButtonPress();
  }

  backButton()
  {
    this.props.navigation.navigate('Main Instructor Screen'); 
  }

  onAvailabilityConfirm()
  {
    this.props.availabilityConfirm(this.props.availableTimeSlots);
  }

  onDateChange(date)
  {
    this.Cancel();
    this.props.clearTimeSlots();

    let newDate = new Date(Date.UTC(date.year(), date.month(), date.date(), 0, 0, 0));

    this.props.loadTimeSlots(newDate.getTime());
  }

  onTimeSlotClick(item, index)
  {
    if(item.status === 'available')
    {
        item.status = 'unavailable';
    }
    else if(item.status === 'unavailable')
    {
        item.status = 'available';
    }

    this.props.resetSelectedSlot();
    this.props.setselectedSlot(index);
  }

  Cancel()
  {
    this.props.clearTimeSlots();
    this.props.resetSelectedSlot();
  }

  dialogueButtonPress()
  {
    this.props.dialogueOkPressed();
    this.props.resetSelectedSlot();
  }

  costHandler(cost)
  {
    this.cost = cost;
  }

  currencyHandler(currency)
  {
    this.currency = currency;
  }

  onCostConfirm()
  {
    if(this.cost && this.currency)
    {
        this.props.setCost(this.props.currentUser, this.cost, this.currency);
    }
    else{
        this.props.showDialogue(() => {this.props.dialogueOkPressed()}, 'Please add Cost and Currency');
    }
  }

  onPendingTimeSlotClick(slot, index)
  {
    this.props.loadPendingSlotData(slot);
  }

  confirmStudent(pending)
  {
    this.props.resetConfirmationDialogue();
    this.Cancel();

    if(this.canConfirm())
      this.props.confirmStudent(pending);
    else
      this.props.showDialogue(() => {this.props.dialogueOkPressed()}, 'You need to update your Lesson Credits to confirm.');
  }

  canConfirm()
  {
    if(!this.props.scheduled)
      return true;
    else return this.props.scheduled.length < this.props.currentUser.lessonCredit;
  }

  render() {

    if(this.props.reload)
    {
        this.props.resetReload();
        this.props.loadCurrentUser();
        this.Cancel();
    }


    if(this.props.student)
    {
      this.props.showConfirmationDialogue((message, student) => {this.props.declineStudent(message, student), this.props.resetConfirmationDialogue(), this.Cancel()}, (student) => {this.confirmStudent(student)}, this.props.student, this.props.studentPhoto);
      this.props.resetPendingSlotData();
    }

    return (<ManageAP onPendingTimeSlotClick={this.onPendingTimeSlotClick} onAvailabilityConfirm={this.onAvailabilityConfirm} onCostConfirm={this.onCostConfirm} costHandler = {this.costHandler} currencyHandler = {this.currencyHandler} Cancel = {this.Cancel} onConfirm = {this.onConfirm} selectedSlot={this.props.selectedSlot} onTimeSlotClick={this.onTimeSlotClick} availableTimeSlots={this.props.availableTimeSlots} onDateChange={this.onDateChange} photo={this.props.photo} instructorPhoto={this.props.instructorPhoto} instructor={this.props.currentUser} backButton={this.backButton} loader={this.props.loader}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadTimeSlots: (date) => dispatch(loadTimeSlotsAction(date)),
    clearTimeSlots: () => dispatch(clearTimeSlotsAction()),
    setselectedSlot: (slot) => dispatch(setSelectedTimeSlotAction(slot)),
    resetSelectedSlot: () => dispatch(resetSelectedTimeSlotAction()),
    showDialogue: (negativeButtonPressed, message) => dispatch(showialogueAction(negativeButtonPressed, message)),
    dialogueOkPressed: () => dispatch(dialogueOKAction()),
    setCost: (user, cost, currency) => dispatch(setCostAction(user, cost, currency)),
    dialogueOkPressed: () => dispatch(dialogueOKAction()),
    resetReload: () => dispatch({"type": SET_COST_FAILURE}),
    loadCurrentUser: () => dispatch({"type": LOAD_CURRENT_USER}),
    availabilityConfirm: (slots) => dispatch(onAvailabilityConfirmAction(slots)),
    loadPendingSlotData: (slots) => dispatch(loadPendingSlotDataAction(slots)),
    resetPendingSlotData: () => dispatch({"type": LOAD_PENDING_SLOT_DATA_FAILURE}),
    showConfirmationDialogue: (negativepressed, positvepressed, student, studentphoto) => dispatch(showConfirmationDialogueAction(negativepressed, positvepressed, student, studentphoto)),
    resetConfirmationDialogue: () => dispatch(resetConfirmationDialogueAction()),
    declineStudent: (message, student) => dispatch(declineStudentAction(message, student)),
    confirmStudent: (student) => dispatch(confirmStudentAction(student)),
  };
};

const mapStateToProps = (state) => {
  return {
    photo: state.mscreducer.photo,
    currentUser: state.mscreducer.currentUser,
    availableTimeSlots: state.mscreducer.timeSlots,
    selectedSlot: state.mscreducer.selectedSlot,
    reload: state.mscreducer.reloadaAvailability,
    student: state.mscreducer.student,
    studentPhoto: state.mscreducer.studentPhoto,
    scheduled: state.mscreducer.scheduled,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAC);