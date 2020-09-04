import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

const Logout = ({ logout }) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#" style={{ color: "var(--mainWhite)" }}>
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
