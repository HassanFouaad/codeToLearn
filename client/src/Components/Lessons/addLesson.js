import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { addLesson } from "../../actions/lessonsActions";
import { FormGroup, Label, Input, Container, Col } from "reactstrap";
export function AddLesson({ match, loading, error, addLesson, auth }) {
  const [values, setValues] = useState({
    number: "",
    title: "",
    text: "",
    video: "",
    formData: new FormData(),
  });
  const [erroraya, setError] = useState(false);
  const { number, title, text, video, formData } = values;

  const handleSubmit = (event) => {
    event.preventDefault();
    addLesson(formData, match.params.courseId);
    if (error == true) {
      setValues({...values});
    }
  };
  useEffect(() => {
    console.log(match.params.courseId);
  }, []);
  const handleChange = (name) => (event) => {
    setError(false);
    event.preventDefault();
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  return (
    <Container>
      <Col sm="12">
        <form className="mb-3 mt-4" onSubmit={handleSubmit}>
          {auth ? (
            <Fragment>
              {loading && <div className="loader"></div>}
              <FormGroup>
                <Label className="text-muted">Lesson Video</Label>
                <Input
                  type="text"
                  className="form-control"
                  value={video}
                  onChange={handleChange("video")}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label className="text-muted">Lesson Number</Label>
                <Input
                  type="number"
                  className="form-control"
                  value={number}
                  onChange={handleChange("number")}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label className="text-muted">Lesson Title</Label>
                <Input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleChange("title")}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label className="text-muted">Lesson Text</Label>
                <Input
                  type="textarea"
                  className="form-control"
                  value={text}
                  onChange={handleChange("text")}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Input type="submit"></Input>
              </FormGroup>
            </Fragment>
          ) : (
            <h1>Please Log In</h1>
          )}
        </form>
      </Col>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  lessons: state.lessons.lessons,
  error: state.lessons.error,
  auth: state.auth,
});
export default connect(mapStateToProps, { addLesson })(AddLesson);
