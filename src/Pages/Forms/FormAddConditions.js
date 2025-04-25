import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addConditions, getAllTreatmentsWithoutSearch } from "../../Services/auth";
import { Editor } from '@tinymce/tinymce-react';

const FormAddConditions = () => {
  document.title = "Add Conditions | Health Care";

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    treatments: [],
    overview: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      const treatmentsData = await getAllTreatmentsWithoutSearch();
      setTreatments(treatmentsData);
    };
    fetchTreatments();
  }, []);

  const handleTreatmentsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, treatments: selectedOptions });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("overview", formData.overview);

    // Append each treatment ID individually
    formData.treatments.forEach((treatment) => {
        formDataToSend.append("treatmentsId[]", treatment);
    });

    try {
        const response = await addConditions(formDataToSend);
        if (response) {
            setFormData({
                name: "",
                image: null,
                treatments: [],
                overview: "",
            });
            setSuccessMessage("Condition added successfully");
            setErrorMessage("");
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error adding condition");
    } finally {
        setIsSubmitting(false);
    }
};


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Conditions" breadcrumbItem="Add Conditions" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Name</label>
                      <div className="col-md-12">
                        <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label htmlFor="treatment" className="col-md-2 col-form-label">Treatment</label>
                      <div className="col-md-12">
                        <select className="form-control" id="treatment" name="treatment" multiple value={formData.treatments} onChange={handleTreatmentsChange} required>
                          {treatments.map((treatment) => (
                            <option key={treatment._id} value={treatment._id}>{treatment.name}</option>
                          ))}
                        </select>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Upload Image</label>
                      <div className="col-md-12">
                        <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
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
                          }}
                          value={formData.overview}
                          onEditorChange={(content) => setFormData({ ...formData, overview: content })}
                        />
                      </div>
                    </Row>
                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Condition"}</button>
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

export default FormAddConditions;
