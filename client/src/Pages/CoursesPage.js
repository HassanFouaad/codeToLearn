import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCourses } from "../actions/coursesActions";
import { Container } from "reactstrap";
import Course from "../Components/Course";
export const CoursesPage = ({ courses, getCourses, auth }) => {
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Fragment>
      <Container>
        <div className="row">
          {courses.map((course) => {
            return (
              <div className="col-3">
                <Course course={course}></Course>
              </div>
            );
          })}
        </div>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses,
});
export default connect(mapStateToProps, { getCourses })(CoursesPage);
