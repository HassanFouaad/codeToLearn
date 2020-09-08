import React, { Fragment } from "react";
import { connect } from "react-redux";
import Course from "../Course";

export const InstructorCourses = ({ auth }) => {
  return <Fragment></Fragment>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses,
});
export default connect(mapStateToProps)(InstructorCourses);
