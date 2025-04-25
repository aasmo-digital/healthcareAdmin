import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/auth"; // Adjust the import path as needed

const Register = () => {
    document.title = "Register | Health Care";

    const [registrationError, setRegistrationError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false); // State for checkbox
    const navigate = useNavigate();

    // Extract referral data from URL
    const queryParams = new URLSearchParams(window.location.search);
    const referralId = queryParams.get("referralId");
    const username = queryParams.get("username");
    const position = queryParams.get("position");

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            role: '', // Role field
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().required("Password is required").min(6, "Password should be at least 6 characters"),
            role: Yup.string().required("Role is required"), // Validation for role
        }),
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values);
            try {
                const response = await registerUser(values);
                setSuccessMessage("User Registered Successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
                setRegistrationError("");
            } catch (error) {
                setSuccessMessage("");
                setRegistrationError(error.message || "An unexpected error occurred. Please try again.");
            }
        },
        validateOnBlur: false,
    });

    useEffect(() => {
        setRegistrationError("");
    }, []);

    return (
        <div className="bg-pattern" style={{ height: "100vh" }}>
            <div className="bg-overlay"></div>
         
            <div className="account-pages pt-5 margin-custom">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6} md={8} xl={6}>
                            <Card className='mt-5'>
                                <CardBody className="p-4">
                                    <h4 className="font-size-18 text-muted text-center mt-2">Create Account</h4>
                                    <br />
                                    <Form className="form-horizontal" onSubmit={validation.handleSubmit}>
                                        {successMessage && <Alert color="success">{successMessage}</Alert>}
                                        {registrationError && <Alert color="danger">{registrationError}</Alert>}
                                        <Row>
                                            <Col md={12}>
                                                <div className="mb-4">
                                                    <Label className="form-label">Email Address</Label>
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter Email Address"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email}
                                                        invalid={validation.touched.email && !!validation.errors.email}
                                                    />
                                                    {validation.touched.email && validation.errors.email && (
                                                        <FormFeedback>{validation.errors.email}</FormFeedback>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <div className="mb-4">
                                                    <Label className="form-label">Role</Label>
                                                    <Input
                                                        type="select"
                                                        name="role"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.role}
                                                        invalid={validation.touched.role && !!validation.errors.role}
                                                    >
                                                        <option value="">Select Role</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="user">User</option>
                                                    </Input>
                                                    {validation.touched.role && validation.errors.role && (
                                                        <FormFeedback>{validation.errors.role}</FormFeedback>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <div className="mb-4">
                                                    <Label className="form-label">Password</Label>
                                                    <Input
                                                        name="password"
                                                        type="password"
                                                        placeholder="Enter Password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.password}
                                                        invalid={validation.touched.password && !!validation.errors.password}
                                                    />
                                                    {validation.touched.password && validation.errors.password && (
                                                        <FormFeedback>{validation.errors.password}</FormFeedback>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="form-check mb-4">
                                            <Input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="terms"
                                                onChange={() => setAgreedToTerms(!agreedToTerms)}
                                                checked={agreedToTerms}
                                            />
                                            <Label className="form-check-label" htmlFor="terms">
                                                I agree to the <Link to="/terms">terms and conditions</Link>
                                            </Label>
                                        </div>

                                        <div className="mb-3">
                                            <button type="submit" className="btn btn-primary w-100" disabled={!agreedToTerms}>
                                                Register
                                            </button>
                                        </div>
                                        <p className="mb-0 text-muted text-center">
                                            Already have an account? <Link to="/login" className="text-primary">Login</Link>
                                        </p>
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

export default Register;
