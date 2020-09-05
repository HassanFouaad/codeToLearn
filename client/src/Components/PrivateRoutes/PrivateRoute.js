import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../Loader";
const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Fragment>
      {!auth.isAuthenticated ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          {console.log(auth.user.role)}
          <Route
            {...rest}
            render={(props) =>
              auth.user.role === 1 ? (
                <Component {...props}></Component>
              ) : (
                <Redirect
                  to={{ pathname: "/", state: { from: props.location } }}
                ></Redirect>
              )
            }
          ></Route>
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
