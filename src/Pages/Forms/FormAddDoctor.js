import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Col, Row, Container, Button, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addDoctor, getAllWithoutSearchHospitals } from "../../Services/auth";
import { Editor } from '@tinymce/tinymce-react';

const FormAddDoctor = () => {
  document.title = "Add Doctor | Health Care";

  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "",
    images: [],
    hospitals: [],
    overview: "",
  });

  const [hospitalsList, setHospitalsList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      const data = await getAllWithoutSearchHospitals();
      setHospitalsList(data?.hospitals);
    };
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formDataToSend = new FormData();

    // Append form fields
    formDataToSend.append("doctorName", formData.doctorName);
    formDataToSend.append("specialization", formData.specialization);
    formDataToSend.append("overview", formData.overview);

    // Append hospital IDs as an array
    formData.hospitals.forEach((hospitalId) => {
        formDataToSend.append("hospitals[]", hospitalId);
    });

    // Append images
    formData.images.forEach((image) => formDataToSend.append("images", image));

    try {
        const response = await addDoctor(formDataToSend);
        if (response) {
            setFormData({
                doctorName: "",
                specialization: "",
                images: [],
                hospitals: [],
                overview: ""
            });
            setSuccessMessage("Doctor added successfully");
            setErrorMessage("");
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error adding doctor");
    } finally {
        setIsSubmitting(false);
    }
};


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Doctor" breadcrumbItem="Add Doctor" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Doctor Name</label>
                      <div className="col-md-12">
                        <input className="form-control" type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Specialization</label>
                      <div className="col-md-12">
                        <input className="form-control" type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Hospitals</label>
                      <div className="col-md-12">
                        <select
                          className="form-control"
                          name="hospitals"
                          value={formData.hospitals}
                          onChange={(e) =>
                            setFormData({ ...formData, hospitals: Array.from(e.target.selectedOptions, (option) => option.value) })
                          }
                          multiple
                          required
                        >
                          <option value="" disabled>Select Hospitals</option>
                          {hospitalsList.map((hospital) => (
                            <option key={hospital._id} value={hospital._id}>
                              {hospital?.hospitalName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>


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

                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Doctor"}</button>
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

export default FormAddDoctor;