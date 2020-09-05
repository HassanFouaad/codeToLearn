import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCourses } from "../actions/coursesActions";
import { Container, Jumbotron } from "reactstrap";
import Course from "../Components/Course";
import styled from "styled-components";
import hero from "../images/1.jpg";
import { Link } from "react-router-dom";
export const CoursesPage = ({ courses, getCourses, loading, error }) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <Fragment>
      <JumboWrapper>
        <Jumbotron className="jumbos">
          <div className="hs-item">
            <div className="hs-text">
              <div className="container">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="hs-subtitle">CODE TO LEARN</div>
                    <h2 className="hs-title">Coding Courses</h2>
                    <p className="hs-des">
                      Explore more than 1200+ Programming and coding courses
                      available in our enviroment
                      <br />
                      knowledge and absorbing the truth about life. Knowledge is
                      power.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Jumbotron>
      </JumboWrapper>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <Container>
          {error ? (
            <h1>Failed To Load Courses</h1>
          ) : (
            <div className="row">
              {courses.map((course) => {
                return (
                  <div className="col-sm-3">
                    <Course course={course}></Course>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      )}
    </Fragment>
  );
};

const JumboWrapper = styled.div`
  .jumbos {
    background-image: url(${hero});
    background-size: cover;
    background-position: center;
    height: 50vh;
  }
  .hs-subtitle {
    color: var(--hoverColor);
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 30px;
    position: relative;
  }
  .hs-title {
    color: #fff;
    font-size: 48px;
    margin-bottom: 25px;
    position: relative;
    text-transform: uppercase;
  }
  .hs-item .hs-des {
    color: #fff;
    font-size: 16px;
    line-height: 2;
    position: relative;
  }
  .hs-item .site-btn {
    margin-top: 30px;
  }
`;
const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses.courses,
  loading: state.courses.loading,
  error: state.courses.error,
});
export default connect(mapStateToProps, { getCourses })(CoursesPage);
