import React, { Fragment } from "react";
import LoginModal from "../modals/Login";
import { connect } from "react-redux";
import { enrollToCourse, unenrollToCourse } from "../actions/coursesActions";
import { Link } from "react-router-dom";
import { ButtonGroup } from "reactstrap";
const Course = ({ course, i, auth, enrollToCourse, unenrollToCourse }) => {
  const EditCourse = () => {
    return auth && auth.user && auth.user._id === course.teacher._id ? (
      <Link>
        <div className="site-btn" onClick={() => enrollToCourse(course._id)}>
          Edit Course
        </div>
        <Link to="/instructor/addcourse">
          <div className="site-btn">Add New Course</div>
        </Link>
      </Link>
    ) : (
      <Fragment>
        This course is created by
        {course.teacher.firstname + " " + course.teacher.lastname}
      </Fragment>
    );
  };

  const EnrollMents = () => {
    return (
      <Fragment>
        <Fragment>
          {auth && auth.user && auth.user.enrollments.includes(course._id) ? (
            <Fragment>
              <ButtonGroup>
                <Link to={`courses/${course._id}`}>
                  <div className="site-btn ml-2">Go To Course</div>
                </Link>
                <div
                  className="site-btn"
                  onClick={() => unenrollToCourse(course._id)}
                >
                  UnEnroll Now
                </div>
              </ButtonGroup>
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
        </Fragment>
      </Fragment>
    );
  };
  return (
    <div className="col-md" key={i}>
      <div className="card flex-md-row mb-4 box-shadow h-md-250">
        <div className="card-body d-flex flex-column align-items-start">
          <strong className="d-inline-block mb-2 text-primary">New</strong>
          <h3 className="mb-0">
            <Link className="text-dark" to={`/courses/${course._id}`}>
              {course.name}
            </Link>
          </h3>
          <div className="mb-1 text-muted">
            {course.teacher.firstname + " " + course.teacher.lastname}
          </div>
          <p className="card-text mb-auto">{course.description}</p>
          {auth && auth.user ? (
            <Fragment>
              {auth && auth.user && auth.user.role !== 1 ? (
                <EnrollMents></EnrollMents>
              ) : (
                <EditCourse></EditCourse>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <div className="site-btn">
                <LoginModal></LoginModal>
              </div>
            </Fragment>
          )}
        </div>
        <img
          className="card-img-right flex-auto  d-md-block"
          data-src="holder.js/200x250?theme=thumb"
          alt={course.name}
          style={{ width: "200px", height: "250px" }}
          src={`/api/course/photo/${course._id}`}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses,
});
export default connect(mapStateToProps, { enrollToCourse, unenrollToCourse })(
  Course
);
