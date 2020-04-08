import React, { Component } from 'react';
import { connect } from 'react-redux';
import Welcome2P from '../Presentational/Welcome2P'
import { moveToSAStudentAction, moveToSATeaacherAction } from '../../Actions/Welcome2A';

class Welcome2C extends Component {

  constructor(props)
  {
      super(props);

      this.signUpAsTeacher = this.signUpAsTeacher.bind(this);
      this.signUpAsStudent = this.signUpAsStudent.bind(this);
  }

  signUpAsTeacher()
  {
    this.props.signUpAsTeacher(this.props.navigation);
  }

  signUpAsStudent()
  {
    this.props.signUpAsStudent(this.props.navigation);
  }

  render() {
    return (<Welcome2P studentHandler = {this.signUpAsStudent} teacherHandler = {this.signUpAsTeacher}/>);
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    signUpAsStudent: (navigation) => moveToSAStudentAction(navigation),
    signUpAsTeacher: (navigation) => moveToSATeaacherAction(navigation),
  };
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.signInReducer.authenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome2C);