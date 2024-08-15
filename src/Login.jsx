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
import { ToastContainer, toast } from "react-toastify";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import KeyTwoToneIcon from "@mui/icons-material/KeyTwoTone";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import Fingerprint from "@mui/icons-material/Fingerprint";
import Tooltip from "@mui/material/Tooltip";

function Login() {
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    mobile: yup.string().required("Mobile is required"),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    toast.success("You have successfully logged in!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/home");
    }, 5000); // Navigate after 5 seconds
  };

  const showErrorAlert = (message) => {
    toast.error(message || "Login Failed !!!", {
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
            <CgProfile />
          </h1>
        </div>
        <Formik
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            const { username, mobile } = values;
            console.log({ username, mobile });
            setIsLoading(true);
            axios
              .post("http://localhost:2001/user/login", values)
              .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                setIsSubmitted(true);
                if (response.data) {
                  showSuccessAlert();
                } else {
                  showErrorAlert(response?.data?.message);
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
          initialValues={{
            username: "",
            mobile: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormikUsername" className="mb-4">
                <InputGroup hasValidation>
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
                            <PersonOutlinedIcon
                              style={{
                                marginBottom: "7px",
                              }}
                              className="text-light"
                            ></PersonOutlinedIcon>
                          </h5>
                        </InputAdornment>
                      }
                      type="text"
                      className="bg-transparent text-white custom-placeholder"
                      placeholder="username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      error={!!errors.username && touched.username}
                    />
                    <FormHelperText
                      error={!!errors.username && touched.username}
                      className="text-danger"
                    >
                      {errors.username}
                    </FormHelperText>
                  </FormControl>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationFormikMobile" className="mb-4">
                <InputGroup hasValidation>
                  <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <Input
                      id="standard-adornment-password"
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
                            <KeyTwoToneIcon
                              style={{
                                marginBottom: "7px",
                              }}
                              className="text-white"
                            ></KeyTwoToneIcon>
                          </h5>
                        </InputAdornment>
                      }
                      type={showPassword ? "text" : "password"}
                      className="bg-transparent text-white custom-placeholder"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            className="text-light"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Password"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      error={!!errors.mobile && touched.mobile}
                    />
                    <FormHelperText
                      error={!!errors.mobile && touched.mobile}
                      className="text-danger"
                    >
                      {errors.mobile}
                    </FormHelperText>
                  </FormControl>
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
                        <p>
                          <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                          Register{" "}
                          <span>
                            (Don`t Have An Account)
                          </span>
                        </p>
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center">
                <Tooltip title="Login" className="">
                  <IconButton
                    aria-label="fingerprint"
                    type="submit"
                    disabled={isLoading}
                    className="hoverSumbit text-primary"
                    sx={{
                      border: "1px solid blue",
                      borderRadius: "50%",
                      padding: "5px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "white",
                      },
                    }}
                  >
                    <Fingerprint style={{ fontSize: "30px" }} />
                  </IconButton>
                </Tooltip>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
}

export default Login;
