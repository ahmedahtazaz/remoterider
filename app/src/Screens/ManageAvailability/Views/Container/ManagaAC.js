import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onAvailabilityConfirmAction, setCostAction, dialogueOKAction, showialogueAction, loadTimeSlotsAction, clearTimeSlotsAction, setSelectedTimeSlotAction, resetSelectedTimeSlotAction} from '../../Actions/ManageA';
import ManageAP from '../Presentational/ManageAP';
import { SET_COST_FAILURE, LOAD_CURRENT_USER } from '../../../../Commons/Constants';

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

  render() {

    if(this.props.reload)
    {
        this.props.resetReload();
        this.props.loadCurrentUser();
    }
    return (<ManageAP onAvailabilityConfirm={this.onAvailabilityConfirm} onCostConfirm={this.onCostConfirm} costHandler = {this.costHandler} currencyHandler = {this.currencyHandler} Cancel = {this.Cancel} onConfirm = {this.onConfirm} selectedSlot={this.props.selectedSlot} onTimeSlotClick={this.onTimeSlotClick} availableTimeSlots={this.props.availableTimeSlots} onDateChange={this.onDateChange} photo={this.props.photo} instructorPhoto={this.props.instructorPhoto} instructor={this.props.currentUser} backButton={this.backButton} loader={this.props.loader}/>);
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
  };
};

const mapStateToProps = (state) => {
  return {
    photo: state.mscreducer.photo,
    currentUser: state.mscreducer.currentUser,
    availableTimeSlots: state.mscreducer.timeSlots,
    selectedSlot: state.mscreducer.selectedSlot,
    reload: state.mscreducer.reloadaAvailability,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAC);