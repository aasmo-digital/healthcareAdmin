import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Card, CardBody, Container, Form, Input, FormFeedback, Label, Row, Col, Spinner } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import logolight from '../../assets/images/logo-light.png';
import logodark from '../../assets/images/logo-dark.png';
import { loginUser } from '../../Services/auth';
import withRouter from '../../components/Common/withRouter';


const Login = (props) => {
  document.title = "Login | Angel Grace Time";

  const [successMessage, setSuccessMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      setLoading(true); // Set loading state to true when form is submitted
      try {
        // Call the actual login API
        const response = await loginUser(values);

        if (response) {
          // Store the token in localStorage
          localStorage.setItem("token", response.token);
          setSuccessMessage("Login successful!");

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);

          setLoginError(""); // Clear error messages
        } else {
          setSuccessMessage("");
          setLoginError(response.message || "Invalid email or password.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setSuccessMessage("");
        setLoginError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after request completion
      }
    }


  });

  useEffect(() => {
    document.body.className = "bg-pattern";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div>

      <div className="account-pages my-5 pt-5 margin-custom">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={6} md={8} xl={4}>
              <Card>
                <CardBody className="p-4">
                  <h4 className="font-size-18 text-muted text-center mt-2">Login Account</h4>
                  <br />
                  <Form className="form-horizontal" onSubmit={validation.handleSubmit}>
                    {successMessage && (
                      <Alert color="success" style={{ backgroundColor: "#28a745", color: "white", border: "none" }}>
                        <div>{successMessage}</div>
                      </Alert>
                    )}

                    {loginError && (
                      <Alert color="danger">
                        <div>{loginError}</div>
                      </Alert>
                    )}
                    {loading && (
                      <div className="text-center mb-4">
                        <Spinner color="primary" />
                        <p>Loading...</p>
                      </div>
                    )}
                    <Row>
                      <Col md={12}>
                        <div className="mb-4">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={validation.touched.email && validation.errors.email ? true : false}
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={validation.touched.password && validation.errors.password ? true : false}
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <Row>
                          <Col>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-label form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                              {/* <br></br>
                              test@example.com<br></br>
                               password123 */}
                            </div>
                          </Col>
                          {/* <Col className="col-7">
                            <div className="text-md-end mt-3 mt-md-0">
                              <Link to="/auth-recoverpw" className="text-muted">
                                <i className="mdi mdi-lock"></i> Forgot your password?
                              </Link>
                            </div>
                          </Col> */}
                        </Row>
                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                            disabled={loading} // Disable button when loading
                          >
                            {loading ? "Login in..." : "Login In"}
                          </button>
                        </div>
                        <br />
                        {/* <div className="text-center">
                          <p className="text-muted mb-0">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary fw-semibold">Register</Link>
                          </p>
                        </div> */}

                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

Login.propTypes = {
  router: PropTypes.object,
};

export default withRouter(Login);
