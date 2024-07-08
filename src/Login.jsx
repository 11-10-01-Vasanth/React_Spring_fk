import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMobileAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    mobile: yup.string().required("Mobile is required"),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isRegistered = false;
  const navigate = useNavigate();

  function navigateRegister() {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  }

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "You have successfully logged in.",
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: message || "Something went wrong. Please try again later.",
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="text-center mb-5">
          <h1 className="text-primary">
            <CgProfile />
          </h1>
        </div>
        <Formik
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            const { username, mobile } = values;
            console.log({ username, mobile });
            axios
              .post("http://localhost:2001/user/login", values)
              .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                setIsSubmitted(true);
                if (response.data) {
                  showSuccessAlert();
                }
                showErrorAlert(response?.data?.message);
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false);
                // Display error message from API response
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
          initialValues={{
            username: "",
            mobile: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormikUsername" className="mb-4">
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-transparent text-light">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className="bg-transparent text-white custom-placeholder"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username && touched.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationFormikMobile" className="mb-4">
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-transparent text-light">
                    <FontAwesomeIcon icon={faMobileAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className="bg-transparent text-white custom-placeholder"
                    placeholder="Mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    isInvalid={!!errors.mobile && touched.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <div className="text-center mb-3">
                {!isRegistered && (
                  <Button
                    variant="link"
                    onClick={navigateRegister}
                    className="text-primary"
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        Register
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center">
                <Button variant="outline-light text-primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
