import React, { useState, Fragment } from "react";
import styled from "styled-components";
import {
  NavItem,
  Nav,
  NavbarToggler,
  NavLink,
  Collapse,
  Navbar as NavbarI,
} from "reactstrap";
import { connect } from "react-redux";
import RegisterModal from "../modals/Signup";
import LoginModal from "../modals/Login";
import Logout from "../modals/Logout";
import { Link } from "react-router-dom";

export function Navbar({ auth, history }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {auth && auth.isAuthenticated && auth.user
              ? `Welcome ${auth.user.firstname}`
              : ""}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
      <NavItem>
        <Link
          to={() => {
            return auth &&
              auth.isAuthenticated &&
              auth.user &&
              auth.user.role === 1
              ? `/instructor/dashboard`
              : "/student/dashboard";
          }}
        >
          <NavLink>Dashboard</NavLink>
        </Link>
      </NavItem>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <NavWrapper>
      <NavbarI dark expand="sm">
        <div className="container">
          <Link to="/" className="nav-brand" style={{ color: "white" }}>
            CodeToLearn
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {auth && auth.isAuthenticated ? authLinks : guestLinks}
              <NavItem>
                <Link to="/courses">
                  <NavLink>Courses</NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </NavbarI>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  background: var(--primaryColor);
  color: var(--mainWhite) !important;
  .toggler {
    color: var(--mainWhite) !important;
  }
  .nav-link {
    background: var(--primaryColor);
    color: var(--mainWhite) !important;
  }
`;
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Navbar);
