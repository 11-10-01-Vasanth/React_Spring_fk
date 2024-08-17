import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobileAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiUsersThree } from "react-icons/pi";
import { LiaUserSecretSolid } from "react-icons/lia";
import {
  FormControl,
  Input,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isLogin = false;

  function navigateLogin() {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const showSuccessAlert = () => {
    toast.success("You have successfully Registered!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorAlert = (message) => {
    toast.error(message || "Something went wrong. Please try again later.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="text-center mb-5">
          <h1 className="text-primary">
            <PiUsersThree />
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
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            axios
              .post("http://localhost:2001/user/register", values)
              .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                setIsSubmitted(true);
                if (typeof response?.data === "string") {
                  showErrorAlert(response.data);
                } else {
                  showSuccessAlert();
                  setTimeout(() => {
                    navigate("/");
                  }, 5000);
                }
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false);
                showErrorAlert(
                  error.response?.data?.message || "An error occurred"
                );
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldTouched }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{
                        padding: "13px",
                        marginRight: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <h5>
                        <LiaUserSecretSolid
                          style={{
                            marginBottom: "7px",
                          }}
                          className="text-light"
                        />
                      </h5>
                    </InputAdornment>
                  }
                  type="text"
                  className="bg-transparent text-white custom-placeholder"
                  placeholder="First Name"
                  name="firstname"
                  value={values.firstname}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("firstname", true, false);
                  }}
                />
                <FormHelperText
                  error={!!errors.firstname && touched.firstname}
                  className="text-danger"
                >
                  {errors.firstname}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{
                        padding: "13px",
                        marginRight: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <h5>
                        <LiaUserSecretSolid
                          style={{
                            marginBottom: "7px",
                          }}
                          className="text-light"
                        />
                      </h5>
                    </InputAdornment>
                  }
                  type="text"
                  className="bg-transparent text-white custom-placeholder"
                  placeholder="Last Name"
                  name="lastname"
                  value={values.lastname}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("lastname", true, false);
                  }}
                />
                <FormHelperText
                  error={!!errors.lastname && touched.lastname}
                  className="text-danger"
                >
                  {errors.lastname}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{
                        padding: "13px",
                        marginRight: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <h5>
                        <FontAwesomeIcon className="text-light" icon={faUser} />
                      </h5>
                    </InputAdornment>
                  }
                  type="text"
                  className="bg-transparent text-white custom-placeholder"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("username", true, false);
                  }}
                />
                <FormHelperText
                  error={!!errors.username && touched.username}
                  className="text-danger"
                >
                  {errors.username}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{
                        padding: "13px",
                        marginRight: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <h5>
                        <FontAwesomeIcon
                          className="text-light"
                          icon={faMobileAlt}
                        />
                      </h5>
                    </InputAdornment>
                  }
                  type="text"
                  className="bg-transparent text-white custom-placeholder"
                  placeholder="Mobile"
                  name="mobile"
                  value={values.mobile}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("mobile", true, false);
                  }}
                />
                <FormHelperText
                  error={!!errors.mobile && touched.mobile}
                  className="text-danger"
                >
                  {errors.mobile}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{
                        padding: "13px",
                        marginRight: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <h5>
                        <FontAwesomeIcon
                          className="text-light"
                          icon={faEnvelope}
                        />
                      </h5>
                    </InputAdornment>
                  }
                  type="email"
                  className="bg-transparent text-white custom-placeholder"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("email", true, false);
                  }}
                />
                <FormHelperText
                  error={!!errors.email && touched.email}
                  className="text-danger"
                >
                  {errors.email}
                </FormHelperText>
              </FormControl>

              <div className="text-center mt-4">
                <Button
                  variant="outline-light text-primary"
                  disabled={isLoading || isSubmitted}
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </form>
          )}
        </Formik>
        <div className="text-center mt-3">
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
