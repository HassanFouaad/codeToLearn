import React, { useState, useEffect, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
const SignUp = ({ history, isAuthenticated, error, register, clearErrors }) => {
  useEffect(() => {
    document.title = "Learning - Sign Up";
    if (error.id === "REGISTER_FAIL") {
      setError(true);
    } else {
      setError(false);
      console.log(erroraya);
    }
  }, [error]);
  const [erroraya, setError] = useState(false);
  console.log(erroraya);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    username,
  } = formData;
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      ToastsStore.error("Passwords Don't Match!");
    } else {
      const newUser = {
        username,
        firstname,
        lastname,
        email,
        password,
      };
      register(newUser);
      /*       signUp(firstname, lastname, password, email).then((error) => {
        if (error) {
          setFormData({ ...formData, error: true, sucess: false });
          console.log(error);
          return ToastsStore.error(error);
        } else {
          ToastsStore.success(`Successfully Signed Up, Now you can SignIn`);
          return history.push("/");
        }
      }); */
    }
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      {erroraya ? ToastsStore.error(error.msg.error) : null}
      <FormGroup className="col-sm text-center"></FormGroup>
      <FormGroup className="col-sm">
        <Input
          type="text"
          placeholder="First Name"
          name="firstname"
          value={firstname}
          onChange={(e) => onChange(e)}
        ></Input>
      </FormGroup>
      <FormGroup className="col-sm">
        <Input
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={lastname}
          onChange={(e) => onChange(e)}
        ></Input>
      </FormGroup>{" "}
      <FormGroup className="col-sm">
        <Input
          type="text"
          placeholder="Last Name"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
        ></Input>
      </FormGroup>
      <FormGroup className="col-sm">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        ></Input>
      </FormGroup>
      <FormGroup className="col-sm">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        ></Input>
      </FormGroup>
      <FormGroup className="col-sm">
        <Input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
        ></Input>
      </FormGroup>
      <FormGroup className="col-sm">
        <Button id="subbtn">Join</Button>
      </FormGroup>{" "}
      <ToastsContainer store={ToastsStore}></ToastsContainer>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { register, clearErrors })(SignUp);
