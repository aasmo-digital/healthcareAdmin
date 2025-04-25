import React, { useEffect, useState } from "react";
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
import { getAllCityWithoutSearch, registerUser } from "../../Services/auth";

const FormAddUser = () => {
  document.title = "Add User | Health Care";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",  // Store city ID
    email: ""
  });

  const [cities, setCities] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      const cityData = await getAllCityWithoutSearch();
      setCities(cityData);
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await registerUser(formData);
      console.log("API Response:", response);

      if (response) {
        setFormData({
          fullName: "",
          phone: "",
          city: "",
          email: ""
        });

        setSuccessMessage(response.message || "User added successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Unexpected response format");
      }
    } catch (error) {
      console.error("Error adding User:", error);
      setErrorMessage(error.response?.data?.message || "Error adding User");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="User" breadcrumbItem="Add User" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label htmlFor="fullName" className="col-md-2 col-form-label">
                        Full Name
                      </label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="phone" className="col-md-2 col-form-label">
                        Phone
                      </label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="city" className="col-md-2 col-form-label">
                        City
                      </label>
                      <div className="col-md-12">
                        <select
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleCityChange}
                          required
                        >
                          <option value="">Select a city</option>
                          {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="email" className="col-md-2 col-form-label">
                        Email
                      </label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
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

export default FormAddUser;
