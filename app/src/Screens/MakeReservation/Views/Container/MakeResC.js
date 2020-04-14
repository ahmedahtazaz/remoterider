import React, { Component } from 'react';
import { connect } from 'react-redux';
import MakeResP from '../Presentational/MakeResP';
import { loadAvailableTimeSlotsAction, clearAvailableTimeSlotsAction } from '../../Actions/MakeResA';

class MakeResC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillMount()
  {
    
  }

  componentWillUnmount()
  {
    this.props.clearAvailableTimeSlots();
  }

  backButton()
  {
    this.props.navigation.navigate('Search for Instructor'); 
  }

  onDateChange(date)
  {
    let newDate = new Date(Date.UTC(date.year(), date.month(), date.date(), 0, 0, 0));

    this.props.loadAvailableTimeSlots(newDate.getTime(), this.props.instructor.uuid);
  }

  render() {

    return (<MakeResP availableTimeSlots={this.props.availableTimeSlots} onDateChange={this.onDateChange} photo={this.props.photo} instructorPhoto={this.props.instructorPhoto} instructor={this.props.instructor} backButton={this.backButton} loader={this.props.loader}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadAvailableTimeSlots: (date, uuid) => dispatch(loadAvailableTimeSlotsAction(date, uuid)),
    clearAvailableTimeSlots: () => dispatch(clearAvailableTimeSlotsAction()),
  };
};

const mapStateToProps = (state) => {
  return {
    photo: state.mscreducer.photo,
    instructor: state.mscreducer.instructor,
    instructorPhoto: state.mscreducer.instructorPhoto,
    availableTimeSlots: state.mscreducer.availableTimeSlots,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeResC);