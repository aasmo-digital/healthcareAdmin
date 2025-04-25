import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { getAllCityWithoutSearch, getbyidPartner, updateByIDPartner } from "../../Services/auth";

const FormEditPartner = () => {
  document.title = "Edit Partner | Health Care";
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    cityId: "",
    email: "",
  });

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await getbyidPartner(id);
        const PartnerData = response;

        setFormData({
          fullName: PartnerData?.fullName || "",
          phone: PartnerData?.phone || "",
          cityId: PartnerData?.city?._id || "",
          email: PartnerData?.email || "",
        });
      } catch (error) {
        console.error("Error fetching Partner details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const res = await getAllCityWithoutSearch();
        setCities(res);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchPartner();
    fetchCities();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      cityId: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = {
        fullName: formData.fullName,
        phone: formData.phone,
        city: formData.cityId,
        email: formData.email,
      };

      const response = await updateByIDPartner(dataToSend, id);

      if (response) {
        setSuccessMessage("Partner edited successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating Partner");
      }
    } catch (error) {
      console.error("Error editing Partner:", error);
      setSuccessMessage("");
      setErrorMessage("Error editing Partner");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Partner" breadcrumbItem="Edit Partner" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Full Name</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Phone</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">City</label>
                      <div className="col-md-12">
                        <select
                          className="form-control"
                          name="cityId"
                          value={formData.cityId}
                          onChange={handleCityChange}
                          required
                        >
                          <option value="">Select City</option>
                          {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Email</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="email"
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

export default FormEditPartner;
