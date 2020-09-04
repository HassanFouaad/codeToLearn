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
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
const Login = ({ history, isAuthenticated, error, login, clearErrors }) => {
  const [erroraya, setError] = useState(false);
  console.log(erroraya);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
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

    const newUser = {
      email,
      password,
    };
    login(newUser);
  };
  useEffect(() => {
    // Check for register error
    if (error.id === "LOGIN_FAIL") {
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

  const { email, password } = formData;

  return (
    <Fragment>
      <NavLink
        onClick={handleToggle}
        href="#"
        style={{ color: "var(--mainWhite)" }}
      >
        Login
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
              <Button
                id="subbtn"
                style={{ background: "var(--primaryColor)", border: "none" }}
              >
                Login
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
export default connect(mapStateToProps, { login, clearErrors })(Login);
