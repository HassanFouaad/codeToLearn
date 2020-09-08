import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Fragment>
      <Fragment>
        <Route
          {...rest}
          render={(props) =>
            auth &&
            auth.isAuthenticated &&
            auth.user &&
            auth.user.role === 1 ? (
              <Component {...props}></Component>
            ) : (
              <Redirect to="/"></Redirect>
            )
          }
        ></Route>
      </Fragment>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
