import React, { useState, useEffect, useCallback, Fragment } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
} from "reactstrap";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
const SignUp = ({ history, isAuthenticated, error, register, clearErrors }) => {
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
  const [modal, setModal] = useState(false);

  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  const onChange = (e) => {
    clearErrors();
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
    }
  };
  useEffect(() => {
    // Check for register error
    if (error.id === "REGISTER_FAIL") {
      setError(true);
    } else {
      setError(false);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    username,
  } = formData;

  return (
    <Fragment>
      <NavLink
        onClick={handleToggle}
        href="#"
        style={{ color: "var(--mainWhite)" }}
      >
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Registesr</ModalHeader>

        <ModalBody>
          {" "}
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
                placeholder="UserName"
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
              <Button
                id="subbtn"
                style={{ background: "var(--primaryColor)", border: "none" }}
              >
                Join
              </Button>
            </FormGroup>
            <ToastsContainer store={ToastsStore}></ToastsContainer>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { register, clearErrors })(SignUp);
