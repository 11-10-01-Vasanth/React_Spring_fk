import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  faUser,
  faEnvelope,
  faMobileAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const schema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    username: yup.string().required("Username is required"),
    mobile: yup
      .string()
      .matches(/^\d{10}$/, "Mobile must be exactly 10 digits")
      .required("Mobile is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isLogin = false;

  function navigateLogin() {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Registered Successful!",
      text: "You have successfully Registered.",
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="text-center mb-5">
          <h1 className="text-primary">
            <FaUsers />
          </h1>
        </div>
        <Formik
          validationSchema={schema}
          initialValues={{
            firstname: "",
            lastname: "",
            username: "",
            mobile: "",
            email: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            axios
              .post("http://localhost:2001/user/register", values)
              .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                setIsSubmitted(true); // Set form as submitted
                showSuccessAlert();
                navigate("/login");
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormik01" className="mb-4">
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-transparent text-light">
                    <CgProfile />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className="bg-transparent text-white custom-placeholder"
                    placeholder="First Name"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    isInvalid={!!errors.firstname && touched.firstname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstname}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationFormik02" className="mb-4">
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-transparent text-light">
                    <CgProfile />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className="bg-transparent text-white custom-placeholder"
                    placeholder="Last Name"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    isInvalid={!!errors.lastname && touched.lastname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastname}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

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

              <Form.Group controlId="validationFormik03" className="mb-4">
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

              <Form.Group controlId="validationFormik04" className="mb-4">
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-transparent text-light">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    className="bg-transparent text-white custom-placeholder"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email && touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <div className="text-center mb-3">
                {!isLogin && (
                  <Button
                    variant="link"
                    onClick={navigateLogin}
                    className="text-primary"
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        Already have an account? Login
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center">
                <Button variant="outline-light text-primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
