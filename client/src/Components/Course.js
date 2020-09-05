import React, { Fragment, useEffect, useCallback } from "react";
import { Card, CardHeader, CardBody, Row, CardFooter } from "reactstrap";
import { connect } from "react-redux";
import { enrollToCourse, unenrollToCourse } from "../actions/coursesActions";
import { Link } from "react-router-dom";
const Course = ({ course, auth, enrollToCourse, unenrollToCourse }) => {
  const handleEnroll = useCallback(
    (id) => {
      unenrollToCourse(id);
    },
    [auth]
  );

  const EditCourse = () => {
    console.log(auth.user);

    return auth && auth.user && auth.user.Courses.includes(course._id) ? (
      <Link>
        <div className="site-btn" onClick={() => enrollToCourse(course._id)}>
          Edit Course
        </div>
      </Link>
    ) : (
      <div>Not Your Course</div>
    );
  };
  return (
    <Card key={course._id} className="my-3 text-center">
      <CardHeader>{course.name}</CardHeader>
      <CardBody>
        {course.description}
        {course.teacher ? (
          <div>
            Teacher: {course.teacher.firstname + " " + course.teacher.lastname}
          </div>
        ) : (
          <div></div>
        )}
      </CardBody>
      {auth && auth.user && auth.user.role !== 1 ? (
        <Fragment>
          <CardFooter>
            {auth && auth.user && auth.user.enrollments.includes(course._id) ? (
              <Fragment>
                <Row>
                  <div className="site-btn col">Go To Course</div>
                  <div
                    className="site-btn col"
                    onClick={() => handleEnroll(course._id)}
                  >
                    UnEnroll Now
                  </div>
                </Row>
              </Fragment>
            ) : (
              <Fragment>
                <div
                  className="site-btn"
                  onClick={() => enrollToCourse(course._id)}
                >
                  Enroll Now
                </div>
              </Fragment>
            )}
          </CardFooter>
        </Fragment>
      ) : (
        <EditCourse></EditCourse>
      )}
    </Card>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses,
});
export default connect(mapStateToProps, { enrollToCourse, unenrollToCourse })(
  Course
);
