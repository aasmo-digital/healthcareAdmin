import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { getAllConditionsWithoutSearch, getbyidHospitals, updateByIDHospitals } from "../../Services/auth";
import { Editor } from "@tinymce/tinymce-react";

const FormEditHospital = () => {
  document.title = "Edit Hospital | Health Care";
  const { id } = useParams();

  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    images: [],
    conditionsId: [],
    conditionsName: "",
    overview: "",
    // timings: "",
    // specialitiesTreatments: [{ websiteURL: "", phoneNumber: "" }],
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conditionsList, setConditionsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospitalResponse, conditionsResponse] = await Promise.all([
          getbyidHospitals(id),
          getAllConditionsWithoutSearch(),
        ]);
    
        const hospitalData = hospitalResponse.hospital;
    
        // Extract conditions as an array of IDs
        const conditionIds = Array.isArray(hospitalData?.conditions)
          ? hospitalData.conditions.map((condition) => condition._id)
          : [];
    
        setFormData({
          hospitalName: hospitalData?.hospitalName || "",
          address: hospitalData?.address || "",
          images: hospitalData?.images || [],
          conditionsId: conditionIds,
          overview: hospitalData?.overview || "",
        });
    
        setConditionsList(conditionsResponse || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files], // Keep the actual file objects
    }));
  };

  // const handleSpecialitiesChange = (index, field, value) => {
  //   setFormData((prevData) => {
  //     const updatedSpecialities = [...prevData.specialitiesTreatments];
  //     updatedSpecialities[index][field] = value;
  //     return { ...prevData, specialitiesTreatments: updatedSpecialities };
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("hospitalName", formData.hospitalName);
      dataToSend.append("address", formData.address);
      dataToSend.append("overview", formData.overview);
      // dataToSend.append("timings", formData.timings);

 
      if (formData.conditionsId.length > 0) {
        formData.conditionsId.forEach((condition) => {
          dataToSend.append("conditions[]", condition);  // Sending as an array
        });
      }


      // Append new images
      formData.images.forEach((image) => {
        if (image instanceof File) {
          dataToSend.append("images", image);
        }
      });

      // Append specialitiesTreatments
      // formData.specialitiesTreatments.forEach((speciality, index) => {
      //   dataToSend.append(`specialitiesTreatments[${index}][websiteURL]`, speciality.websiteURL);
      //   dataToSend.append(`specialitiesTreatments[${index}][phoneNumber]`, speciality.phoneNumber);
      // });

      const response = await updateByIDHospitals(dataToSend, id);

      if (response) {
        setSuccessMessage("Hospital updated successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating hospital");
      }
    } catch (error) {
      console.error("Error updating hospital:", error);
      setSuccessMessage("");
      setErrorMessage("Error updating hospital");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConditionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
      id: option.value,
      name: option.text,
    }));

    setFormData((prevData) => ({
      ...prevData,
      conditionsId: selectedOptions.map((option) => option.id),
      conditionsName: selectedOptions.map((option) => option.name),
    }));
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Hospitals" breadcrumbItem="Edit Hospital" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

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

                    {/* Conditions */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Condition</label>
                      <div className="col-md-12">
                        <select
                          className="form-control"
                          name="conditionsId"
                          value={formData.conditionsId}
                          onChange={handleConditionChange}
                          multiple  // Enable multiple selections
                          required
                        >
                          <option value="">Select Condition</option>
                          {conditionsList.map((condition) => (
                            <option key={condition._id} value={condition._id}>
                              {condition.name}
                            </option>
                          ))}
                        </select>

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

                    {/* Image Upload */}
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Upload New Images</label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                        />
                      </div>
                    </Row>

                    {/* Overview */}
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
                      </div>
                    </Row>

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
                            onChange={(e) => handleSpecialitiesChange(index, "websiteURL", e.target.value)}
                          />
                        </Col>
                        <Col md="5">
                          <input
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={speciality.phoneNumber}
                            onChange={(e) => handleSpecialitiesChange(index, "phoneNumber", e.target.value)}
                          />
                        </Col>
                      </Row>
                    ))} */}

                    <button type="submit" className="btn btn-primary mb-3" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Hospital"}
                    </button>

                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
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

export default FormEditHospital;