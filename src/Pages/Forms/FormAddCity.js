import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Card,
    CardBody,
    Col,
    Row,
    Container,
    Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addCity } from "../../Services/auth";

const FormAddCity = () => {
    document.title = "Add City | Health Care";

    const [formData, setFormData] = useState({
        name: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setIsSubmitting(true);
   
     try {
       const response = await addCity(formData);
       console.log("API Response:", response);
   
       if (response) {
         setFormData({
           name: "",
         });
   
         setSuccessMessage(response.message || "City added successfully");
         setErrorMessage(""); 
       } else {
         setErrorMessage("Unexpected response format");
       }
     } catch (error) {
       console.error("Error adding City:", error);
       setErrorMessage(error.response?.message || "Error adding City");
     } finally {
       setIsSubmitting(false);
     }
   };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="City" breadcrumbItem="Add City" />
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <label htmlFor="name" className="col-md-2 col-form-label">
                                               City Name
                                            </label>
                                            <div className="col-md-12">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Row>

                                        {successMessage && <Alert color="success">{successMessage}</Alert>}
                                        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {isSubmitting ? "Adding..." : "Add"}
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

export default FormAddCity;
