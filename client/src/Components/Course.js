import React, { Fragment } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";

const Course = ({ course, auth }) => {
  return (
    <Card key={course._id} className="my-3 text-center">
      <CardHeader>{course.name}</CardHeader>
      <CardBody>{course.description}</CardBody>

      {auth && auth.user && auth.user.enrollments.includes(course._id) ? (
        <div className="site-btn">Go To Course</div>
      ) : (
        <Fragment>
          <div className="site-btn">Enroll Now</div>
        </Fragment>
      )}
    </Card>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses,
});
export default connect(mapStateToProps)(Course);
