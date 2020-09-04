import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import { NavItem, Nav, NavbarToggler, NavLink } from "reactstrap";
import { connect } from "react-redux";
import RegisterModal from "../modals/Signup";
import LoginModal from "../modals/Login";
import Logout from "../modals/Logout";
import { Link } from "react-router-dom";

export function Navbar({ auth }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {}, [auth]);
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {auth && auth.user ? `Welcome ${auth.user.firstname}` : ""}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
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
    <NavWrapper className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand" style={{ color: "white" }}>
          CodeToLearn
        </Link>
        <NavbarToggler onClick={handleToggle} />
        <Nav>
          {auth && auth.isAuthenticated ? authLinks : guestLinks}
          <NavItem>
            <Link to="/courses">
              <NavLink>Courses</NavLink>
            </Link>
          </NavItem>
        </Nav>
      </div>
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
