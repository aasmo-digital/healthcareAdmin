import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { getbyidDoctor } from "../../Services/auth";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormViewDoctor = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await getbyidDoctor(id);
                setData(response);
            } catch (err) {
                setError("Error fetching doctor details. Please try again later.");
                console.error("Error fetching doctor details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!data) return <p>No doctor data available.</p>;

    const { doctorName, images, specialization, hospitals, experience, overview } = data;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Doctors" breadcrumbItem="Doctors" />
                    <Row>
                        <Col>
                            <div className="container mt-4">
                                <div className="card shadow-lg p-3 mb-5 bg-white rounded d-flex flex-row align-items-center">
                                    
                                    {/* Doctor Details - First */}
                                    <div className="card-body w-75">
                                        <h3 className="card-title text-primary">Doctor Name : Dr. {doctorName}</h3>
                                        {/* <p className="text-muted">Address : {address}</p> */}
                                        <p><strong>Specialization:</strong> {specialization}</p>
                                        
                                      
                                        {/* <p><strong>Education:</strong> {education}</p>
                                        <p><strong>Clients:</strong> {clients}+</p>
                                        <p><strong>About:</strong> {about}</p> */}

                                        {/* Hospital Details */}
                                         {/* Conditions Section */}
                                         {hospitals && hospitals.length > 0 && (
                                            <div className="mt-3">
                                                <h5 className="text-success">Hospitals:</h5>
                                                <ul>
                                                    {hospitals.map((hospital, index) => (
                                                        <li key={index}>{hospital.hospitalName}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}


                                        {/* Overview Section */}
                                        <div className="mt-3">
                                            <h5 className="text-info">Overview</h5>
                                            <div dangerouslySetInnerHTML={{ __html: overview }} />
                                        </div>
                                    </div>

                                    {/* Doctor Images - Smaller and Beside Data */}
                                    <div className="w-50 justify-content-center">
                                        {images.length > 0 ? (
                                            <div id="hospitalCarousel" className="carousel slide" data-bs-ride="carousel">
                                                <div className="carousel-inner">
                                                    {images.map((img, index) => (
                                                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                            <img src={img} className="d-block w-100 img-fluid rounded" alt={`Slide ${index + 1}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Carousel Controls */}
                                                <button className="carousel-control-prev" type="button" data-bs-target="#hospitalCarousel" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#hospitalCarousel" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-muted">No images available</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormViewDoctor;
