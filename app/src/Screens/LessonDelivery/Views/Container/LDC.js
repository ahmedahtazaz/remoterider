import React, { Component } from 'react';
import { connect } from 'react-redux';
import LDP from '../Presentational/LDP';
import { declineStudentAction } from '../../Actions/LDA';
import { LDR_RESET } from '../../../../Commons/Constants';

class LDC extends Component {

  constructor(props)
  {
      super(props);

      this.backButton = this.backButton.bind(this);
      this.cancelReservation = this.cancelReservation.bind(this);
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

  render() {
    if(this.props.ldrback)
    {
        this.props.resetLDR();
        this.backButton();
    }
    return (<LDP cancelReservation={this.cancelReservation} studentPhoto={this.props.studentPhoto} student={this.props.student} backButton={this.backButton}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    declineStudent: (student) => dispatch(declineStudentAction(student)),
    resetLDR: () => dispatch({"type": LDR_RESET}),
  };
};

const mapStateToProps = (state) => {
  return {
    student: state.ldrReducer.student,
    studentPhoto: state.ldrReducer.studentPhoto,
    ldrback: state.mscreducer.ldrback,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LDC);