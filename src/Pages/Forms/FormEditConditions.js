import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { getAllTreatmentsWithoutSearch, getbyidConditions, updateByIDConditions } from "../../Services/auth";
import { Editor } from '@tinymce/tinymce-react';

const FormEditConditions = () => {
  document.title = "Edit Conditions | Health Care";
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    treatmentsId: [],
    overview: "",
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await getbyidConditions(id);
        const treatmentData = response;

        setFormData({
          name: treatmentData?.name || "",
          image: null,
          treatmentsId: Array.isArray(treatmentData?.treatments)
            ? treatmentData.treatments.map((treatment) => treatment._id)
            : [],
          overview: treatmentData?.overview || "",
        });
      } catch (error) {
        console.error("Error fetching treatment details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTreatments = async () => {
      const treatmentsData = await getAllTreatmentsWithoutSearch();
      setTreatments(treatmentsData);
    };

    fetchTreatment();
    fetchTreatments();
  }, [id]);

  // Handle multiple treatment selection
  const handleTreatmentsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      treatmentsId: selectedOptions,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);

      if (formData.image) {
        dataToSend.append("image", formData.image);
      }

      // Append multiple treatment IDs correctly
      formData.treatmentsId.forEach((id) => dataToSend.append("treatmentsId[]", id));

      dataToSend.append("overview", formData.overview);

      const response = await updateByIDConditions(dataToSend, id);
      if (response) {
        setSuccessMessage("Treatment edited successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating treatment");
      }
    } catch (error) {
      console.error("Error editing treatment:", error);
      setSuccessMessage("");
      setErrorMessage("Error editing treatment");
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
          <Breadcrumbs title="Conditions" breadcrumbItem="Edit Conditions" />
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

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Treatments</label>
                      <div className="col-md-12">
                        <select
                          className="form-control"
                          name="treatmentsId"
                          value={formData.treatmentsId}
                          onChange={handleTreatmentsChange}
                          multiple
                          required
                        >
                          <option value="" disabled>Select Treatments</option>
                          {treatments.map((treatment) => (
                            <option key={treatment._id} value={treatment._id}>
                              {treatment.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Upload New Image</label>
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
                          }}
                          value={formData.overview}
                          onEditorChange={(content) => setFormData({ ...formData, overview: content })}
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

export default FormEditConditions;
