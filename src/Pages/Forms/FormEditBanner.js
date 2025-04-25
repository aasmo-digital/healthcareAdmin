import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { getbyidBanner, updateByIDBanner } from "../../Services/auth";

const FormEditBanner = () => {
  document.title = "Edit Banners | Health Care";
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    url: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await getbyidBanner(id);
        setFormData({
          name: response?.banner?.name || "",
          image: response?.banner?.image || "",
          url: response?.banner?.url || "",
        });
        setPreviewImage(response?.banner?.image || "");
      } catch (error) {
        console.error("Error fetching banner details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("url", formData.url);
      if (formData.image && typeof formData.image !== "string") {
        dataToSend.append("image", formData.image);
      }

      const response = await updateByIDBanner(dataToSend, id);

      if (response) {
        setSuccessMessage("Banner updated successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating banner");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      setSuccessMessage("");
      setErrorMessage("Error updating banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Banners" breadcrumbItem="Edit Banners" />
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
                    <label className="col-md-2 col-form-label">URL</label>
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                      />
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

                  {previewImage && (
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Preview</label>
                      <div className="col-md-12">
                        <img src={previewImage} alt="Banner Preview" style={{ maxWidth: "100%", height: "auto" }} />
                      </div>
                    </Row>
                  )}

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
  );
};

export default FormEditBanner;