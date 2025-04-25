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

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from 'react-router-dom'; // Import useParams to get the user ID from the URL
import { getbyidCity,updateByIDCity } from "../../Services/auth";

const FormEditCity = () => {
  document.title = "Edit City | Health Care";
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await getbyidCity(id); // Await the response
        const CityData = response; // Correct the response handling
        console.log(CityData, "CityData");

        setFormData({
          name: CityData?.name || "", // Update name field
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching City details:", error);
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    try {
      const dataToSend = {
        name: formData.name, // Only sending name for update
      };

      const response = await updateByIDCity(dataToSend, id);  // Await the response

      if (response) {
        setSuccessMessage("City edited successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating City");
      }
    } catch (error) {
      console.error("Error editing City:", error);
      setSuccessMessage("");
      setErrorMessage("Error editing City");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="City" breadcrumbItem="Edit City" />
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
                          type="name"
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
                      {isSubmitting ? "Updating..." : "Update"}
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

export default FormEditCity;
