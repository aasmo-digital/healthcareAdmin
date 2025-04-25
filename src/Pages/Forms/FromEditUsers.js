import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { getAllCityWithoutSearch, getbyidUser, updateByIDUser } from "../../Services/auth";

const FromEditUsers = () => {
  document.title = "Edit User | Health Care";
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
    const fetchUser = async () => {
      try {
        const response = await getbyidUser(id);
        const userData = response;

        setFormData({
          fullName: userData?.fullName || "",
          phone: userData?.phone || "",
          cityId: userData?.city?._id || "",
          email: userData?.email || "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
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

    fetchUser();
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

      const response = await updateByIDUser(dataToSend, id);

      if (response) {
        setSuccessMessage("User edited successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating user");
      }
    } catch (error) {
      console.error("Error editing user:", error);
      setSuccessMessage("");
      setErrorMessage("Error editing user");
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
          <Breadcrumbs title="User" breadcrumbItem="Edit User" />
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

export default FromEditUsers;
