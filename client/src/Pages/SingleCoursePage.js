import React, { useEffect, Fragment } from "react";
import { Row, Col, Container, ListGroup, ListGroupItem } from "reactstrap";
import { getLessons } from "../actions/lessonsActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleCourse } from "../actions/coursesActions";
import Course from "../Components/Course";
import Collapsible from "react-collapsible";
import "./style.css";
export function SingleCoursePage(props) {
  useEffect(() => {
    props.getLessons(props.match.params.courseId);
    props.getSingleCourse(props.match.params.courseId);
  }, [getLessons]);

  const courseName = props.singleCourse.name;
  return (
    <Fragment>
      <Container>
        <h1 className="text-center">{courseName}</h1>
        {props.singleCourse.teacher && (
              <Course
                course={props.singleCourse}
                showGotoCourse={false}
              ></Course>
            )}
        <Row>
          <Col sm="12">
            {props.auth && props.auth.isAuthenticated && props.auth.user ? (
              <Fragment>
                <ListGroup>
                  {props.lessons.map((lesson) => (
                    <Collapsible
                      key={lesson._id}
                      trigger={lesson.title}
                      accordionPosition
                      lazyRender="true"
                    >
                      <ListGroupItem>
                        <Row>
                          <Col
                            md="8"
                            sm
                            className="text-md-left text-center my-3"
                          >
                            <div>
                              <iframe
                                src={`${lesson.video}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </Col>
                          <Col sm>
                            <div>
                              <h4>{lesson.title}</h4>
                            </div>
                            <div>
                              <p className="text-break text-wrap">
                                {lesson.text}
                              </p>
                            </div>
                            <div className="my-4">
                              {props.auth.user.Courses.find(
                                (course) =>
                                  course._id === props.match.params.courseId
                              ) ? (
                                <Link
                                  className="site-btn"
                                  to={`/instructor/${props.match.params.courseId}/addlesson`}
                                >
                                  Add new Lesson
                                </Link>
                              ) : (
                                <Fragment>
                                  {props.auth.user.enrollments.find(
                                    (course) =>
                                      course === props.match.params.courseId
                                  ) ? (
                                    <button className="btn btn-sm btn-primary">
                                      Mark as compelete
                                    </button>
                                  ) : (
                                    <Course
                                      course={props.singleCourse}
                                    ></Course>
                                  )}
                                </Fragment>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </Collapsible>
                  ))}
                </ListGroup>
              </Fragment>
            ) : (
              <Fragment>
                {props.singleCourse.teacher ? (
                  <Course course={props.singleCourse}></Course>
                ) : (
                  <div className="loader"></div>
                )}
              </Fragment>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses,
  lessons: state.lessons.lessons,
  singleCourse: state.singleCourse,
});
export default connect(mapStateToProps, { getLessons, getSingleCourse })(
  SingleCoursePage
);
