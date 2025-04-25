import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Col, Row, Container, Alert, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addHospitals, getAllConditionsWithoutSearch, getAllTreatmentsWithoutSearch } from "../../Services/auth";
import { Editor } from '@tinymce/tinymce-react';

const FormAddHospital = () => {
  document.title = "Add Hospitals | Health Care";

  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    images: [],
    conditions: [],
    overview: "",
    // timings: "",
    // specialitiesTreatments: [{ websiteURL: "", phoneNumber: "" }],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conditionsList, setConditionsList] = useState([]);

  useEffect(() => {
    const fetchConditions = async () => {
      const conditionsData = await getAllConditionsWithoutSearch();
      setConditionsList(conditionsData);
    };
    fetchConditions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  // const handleSpecialitiesChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedSpecialities = [...formData.specialitiesTreatments];
  //   updatedSpecialities[index][name] = value;
  //   setFormData({ ...formData, specialitiesTreatments: updatedSpecialities });
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("hospitalName", formData.hospitalName);
    formDataToSend.append("address", formData.address);
    formData.conditions.forEach((condition) => formDataToSend.append("conditions", condition));
    formDataToSend.append("overview", formData.overview);
    // formDataToSend.append("timings", formData.timings);
    formData.images.forEach((image) => formDataToSend.append("images", image));

    // formDataToSend.append("specialitiesTreatments", JSON.stringify(formData.specialitiesTreatments));

    try {
      const response = await addHospitals(formDataToSend);
      if (response) {
        setFormData({
          hospitalName: "",
          address: "",
          images: [],
          conditions: [],
          overview: "",
          // timings: "",
          // specialitiesTreatments: [{ websiteURL: "", phoneNumber: "" }],
        });
        setSuccessMessage("Hospital added successfully");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error adding hospital");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Hospitals" breadcrumbItem="Add Hospitals" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    {/* Hospital Name */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Hospital Name</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          name="hospitalName"
                          value={formData.hospitalName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Row>

                    {/* Address */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Address</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Row>

                    {/* Condition Selection */}
                    {/* Condition Selection */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Conditions</label>
                      <div className="col-md-12">
                        <select
                          className="form-control"
                          name="conditions"
                          value={formData.conditions}
                          onChange={(e) =>
                            setFormData({ ...formData, conditions: Array.from(e.target.selectedOptions, (option) => option.value) })
                          }
                          multiple
                          required
                        >
                          <option value="" disabled>Select Conditions</option>
                          {conditionsList.map((condition) => (
                            <option key={condition._id} value={condition._id}>
                              {condition.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>


                    {/* Image Upload */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Upload Images</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    </Row>

                    {/* Overview */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Overview</label>
                      <div className="col-md-12">
                        <Editor
                          apiKey="ccepeb25t2k5rlhnio6638k3drnkjg74miqm2lkzuyzm1x6r"
                          value={formData.overview}
                          onEditorChange={(content) => setFormData({ ...formData, overview: content })}
                        />
                      </div>
                    </Row>

                    {/* Timings */}
                    {/* <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Timings</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          name="timings"
                          value={formData.timings}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Row> */}

                    {/* Specialities & Treatments */}
                    {/* {formData.specialitiesTreatments.map((speciality, index) => (
                      <Row key={index} className="mb-3">
                        <Col md="5">
                          <input
                            className="form-control"
                            type="text"
                            name="websiteURL"
                            placeholder="Website URL"
                            value={speciality.websiteURL}
                            onChange={(e) => handleSpecialitiesChange(index, e)}
                          />
                        </Col>
                        <Col md="5">
                          <input
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={speciality.phoneNumber}
                            onChange={(e) => handleSpecialitiesChange(index, e)}
                          />
                        </Col>
                       
                      </Row>
                    ))} */}
                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                    &nbsp;
                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Hospital"}
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

export default FormAddHospital;
