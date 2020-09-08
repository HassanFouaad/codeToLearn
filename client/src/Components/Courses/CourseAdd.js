import React, { useState, useEffect, Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { addCourse } from "../../actions/coursesActions";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { clearErrors } from "../../actions/errorActions";
const CourseAdd = ({ loading, error, addCourse, clearErrors, auth }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    formData: new FormData(),
  });
  const [erroraya, setError] = useState(false);
  const { name, description,formData } = values;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(addCourse);
    addCourse(formData);
  };
  const handleChange = (name) => (event) => {
    setError(false);
    event.preventDefault();
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (error.status !== null) {
      setError(true);
    }
    if (error.status === 200) {
      setError(false);
      ToastsStore.success(error.msg.msg);
    }
  }, [error]);

  return (
    <form className="mb-3 mt-4" onSubmit={handleSubmit}>
      {auth ? (
        <Fragment>
          {loading && <div className="loader"></div>}
          {erroraya ? ToastsStore.error(error.msg.error) : null}
          <FormGroup>
            <Label className="btn btn-secondary col-sm-2">
              <Input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange("photo")}
              ></Input>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label className="text-muted">Name</Label>
            <Input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChange("name")}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label className="text-muted">description</Label>
            <Input
              type="text"
              className="form-control"
              value={description}
              onChange={handleChange("description")}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input type="submit"></Input>
          </FormGroup>
          <ToastsContainer store={ToastsStore}></ToastsContainer>
        </Fragment>
      ) : (
        <h1>Please Log In</h1>
      )}
    </form>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  loading: state.courses.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, { addCourse, clearErrors })(CourseAdd);
