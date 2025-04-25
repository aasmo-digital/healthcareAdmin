import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addTreatments } from "../../Services/auth";
import { Editor } from '@tinymce/tinymce-react';
const FormAddTreatments = () => {
  document.title = "Add Treatments | Health Care";


  const [formData, setFormData] = useState({
    name: "",
    image: null, // Updated for file upload
    overview: "",
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
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle array field updates
  const handleArrayChange = (index, field, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare FormData
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image); // File upload
    formDataToSend.append("overview", formData.overview);

  

    try {
      const response = await addTreatments(formDataToSend);
      if (response) {
        setFormData({
          name: "",
          image: null,
          overview: "",
        });
        setSuccessMessage("Treatment added successfully");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error adding treatment");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Treatments" breadcrumbItem="Add Treatments" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
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
                      <label className="col-md-2 col-form-label">Upload Image</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    </Row>

                    

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Overview</label>
                      <div className="col-md-12">
                        <Editor
                          apiKey="ccepeb25t2k5rlhnio6638k3drnkjg74miqm2lkzuyzm1x6r"
                          init={{
                            plugins: [
                              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link',
                              'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            // Other settings...
                          }}
                          value={formData.overview}
                          onEditorChange={(content) => setFormData({ ...formData, overview: content })}
                        />



                        {/* <textarea
                          className="form-control"
                          name="overview"
                          value={formData.overview}
                          onChange={handleChange}
                        /> */}
                      </div>
                    </Row>

                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Treatment"}
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

export default FormAddTreatments;
