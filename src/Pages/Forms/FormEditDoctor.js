import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { getAllWithoutSearchHospitals, getbyidDoctor, updateByIDDoctor } from "../../Services/auth";
import { Editor } from "@tinymce/tinymce-react";

const FormEditDoctor = () => {
    document.title = "Edit Doctor | Health Care";
    const { id } = useParams();

    const [formData, setFormData] = useState({
        doctorName: "",

        images: [], // Changed from images array to single image
        hospitalId: [],
        hospitalName: "",
        specialization: "",
        overview: "",

    });

    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hospitalsList, setHospitalsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [doctorResponse, hospitalsResponse] = await Promise.all([
                    getbyidDoctor(id),
                    getAllWithoutSearchHospitals(),
                ]);

                const doctorData = doctorResponse;
                const hospitalIds = Array.isArray(doctorData?.hospitals)
                    ? doctorData.hospitals.map((hospital) => hospital._id)
                    : [];
                setFormData({
                    doctorName: doctorData?.doctorName || "",
                    overview: doctorData?.overview || "",
                    images: doctorData?.images || [],
                    hospitalId: hospitalIds,
                    hospitalName: doctorData?.hospitals?.hospitalName || "",
                    specialization: doctorData?.specialization || "",

                });

                setHospitalsList(hospitalsResponse?.hospitals || []);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const dataToSend = new FormData();
            dataToSend.append("doctorName", formData.doctorName);

            dataToSend.append("specialization", formData.specialization);


            if (formData.hospitalId.length > 0) {
                formData.hospitalId.forEach((hospital) => {
                    dataToSend.append("hospitals[]", hospital);  // Sending as an array
                });
            }

            // Append image only if a new file is selected
            formData.images.forEach((image) => {
                if (image instanceof File) {
                    dataToSend.append("images", image);
                }
            });
            dataToSend.append("overview", formData.overview);
            const response = await updateByIDDoctor(dataToSend, id);

            if (response) {
                setSuccessMessage("Doctor updated successfully");
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating doctor");
            }
        } catch (error) {
            console.error("Error updating doctor:", error);
            setSuccessMessage("");
            setErrorMessage("Error updating doctor");
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
            hospitalId: selectedOptions.map((option) => option.id),
            hospitalName: selectedOptions.map((option) => option.name),
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Doctors" breadcrumbItem="Edit Doctor" />
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>


                                        {/* Doctor Name */}
                                        <Row className="mb-3">
                                            <label className="col-md-2 col-form-label">Doctor Name</label>
                                            <div className="col-md-12">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="doctorName"
                                                    value={formData.doctorName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Row>



                                        {/* Hospitals */}
                                        <Row className="mb-3">
                                            <label className="col-md-2 col-form-label">Hospitals</label>
                                            <div className="col-md-12">
                                                <select
                                                    className="form-control"
                                                    name="hospitalId"
                                                    value={formData.hospitalId}
                                                    onChange={handleConditionChange}
                                                    multiple  // Enable multiple selections
                                                    required
                                                >
                                                    <option value="">Select Hospitals</option>
                                                    {hospitalsList.map((hospital) => (
                                                        <option key={hospital._id} value={hospital._id}>
                                                            {hospital?.hospitalName}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </Row>

                                        {/* Specialization */}
                                        <Row className="mb-3">
                                            <label className="col-md-2 col-form-label">Specialization</label>
                                            <div className="col-md-12">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="specialization"
                                                    value={formData.specialization}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Row>

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

                                        {successMessage && <Alert color="success">{successMessage}</Alert>}
                                        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                                        <button type="submit" className="btn btn-primary mb-3" disabled={isSubmitting}>
                                            {isSubmitting ? "Updating..." : "Update Doctor"}
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

export default FormEditDoctor;
