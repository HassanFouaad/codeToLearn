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
import Search from "./Search";

export function Navbar({ auth, history }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const authLinks = (
    <Fragment>
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
          className="nav-link"
        >
          Dashboard
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
          <NavItem style={{ color: "black" }} className="mt-1 ml-auto">
            <Search></Search>
          </NavItem>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/courses" className="nav-link">
                  Explore
                </Link>
              </NavItem>
              {auth && auth.isAuthenticated ? authLinks : guestLinks}
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
