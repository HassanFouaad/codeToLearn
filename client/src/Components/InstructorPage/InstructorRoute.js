import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AddCoursePage from "../../Pages/AddCoursePage";
const InstructorRoute = ({ auth }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Your Courses
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Add Course
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ListGroup>
                  {auth.user.Courses.map((course, i) => (
                    <ListGroupItem key={i}>
                      <Row>
                        <Col sm>
                          <Link to={`/courses/${course._id}`}>
                            {course.name}
                          </Link>
                        </Col>
                        <Col sm>
                          <div>
                            Enrollers: {JSON.stringify(course.enrollers.length)}
                          </div>
                          <div>
                            Lessons: {JSON.stringify(course.lessons.length)}
                          </div>
                        </Col>
                        <Col>
                          <Link
                            to={`/courses/${course._id}/lessons`}
                            className="ml-5"
                          >
                            <div
                              className="btn"
                              style={{
                                background: "var(--hoverColor)",
                                color: "white",
                              }}
                            >
                              Lessons
                            </div>
                          </Link>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <AddCoursePage></AddCoursePage>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(InstructorRoute);
