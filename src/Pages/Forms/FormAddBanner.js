import React, { useState } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addBanner } from "../../Services/auth";

const FormAddBanner = () => {
    document.title = "Add Banners | Health Care";

    const [formData, setFormData] = useState({
        name: "",
        image: null,
        url: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes for text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setErrorMessage("Please select an image.");
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width === 680 && img.height === 280) {
                setErrorMessage("");
                setFormData({ ...formData, image: file });
            } else {
                setErrorMessage("Image should be exactly 680x280 pixels.");
                setFormData({ ...formData, image: null });
            }
        };

        img.onerror = () => {
            setErrorMessage("Invalid image file.");
        };
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            setErrorMessage("Please upload a valid image.");
            return;
        }

        setIsSubmitting(true);
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("url", formData.url);

        try {
            const response = await addBanner(formDataToSend);
            if (response) {
                setFormData({
                    name: "",
                    image: null,
                    url: "",
                });
                setSuccessMessage("Banner added successfully");
                setErrorMessage("");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error adding Banner");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Banners" breadcrumbItem="Add Banners" />
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        {/* Name Field */}
                                        <Row className="mb-3">
                                            <label className="col-md-2 col-form-label">Name</label>
                                            <div className="col-md-12">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Row>

                                        {/* Image Upload Field */}
                                        <Row className="mb-3">
                                            <label className="col-md-2 col-form-label">Upload Image (680x280 Pixels)</label>
                                            <div className="col-md-12">
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                                            </div>
                                        </Row>

                                        {/* URL Field */}
                                        <Row className="mb-3">
                                            <label className="col-md-2 col-form-label">URL</label>
                                            <div className="col-md-12">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="url"
                                                    value={formData.url}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Row>

                                        {/* Success & Error Messages */}
                                        {successMessage && <Alert color="success">{successMessage}</Alert>}
                                        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                                        {/* Submit Button */}
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {isSubmitting ? "Adding..." : "Add Banner"}
                                        </button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormAddBanner;
