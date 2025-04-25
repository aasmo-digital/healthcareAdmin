import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { getbyidTreatments, updateByIDTreatments } from "../../Services/auth";
import { Editor } from '@tinymce/tinymce-react';
const FormEditTreatments = () => {
  document.title = "Edit Treatments | Health Care";
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    overview: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await getbyidTreatments(id);
        const treatmentData = response;

        setFormData({
          name: treatmentData?.name || "",
          image: null,
          overview: treatmentData?.overview || "",
        });
      } catch (error) {
        console.error("Error fetching treatment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleArrayChange = (index, field, value, type) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[type]];
      updatedArray[index][field] = value;
      return { ...prevData, [type]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      if (formData.image) {
        dataToSend.append("image", formData.image);
      }
      dataToSend.append("overview", formData.overview);

      const response = await updateByIDTreatments(dataToSend, id);

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
  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Treatments" breadcrumbItem="Edit Treatments" />
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
                                                                          // Other settings...
                                                                        }}
                                                                        value={formData.overview}  // Value Bind करें
                                                                        onEditorChange={(content) => setFormData({ ...formData, overview: content })}  // Value Update करें
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

export default FormEditTreatments;
