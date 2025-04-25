import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { getbyidHospitals } from "../../Services/auth";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const HospitalCard = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTreatment = async () => {
            try {
                const response = await getbyidHospitals(id);
                setData(response);
            } catch (err) {
                setError("Error fetching treatment details. Please try again later.");
                console.error("Error fetching treatment details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTreatment();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!data || !data.hospital) return <p>No hospital data available.</p>;

    const { hospitalName, address, images, conditions, overview } = data.hospital;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Hospitals" breadcrumbItem="Hospitals" />
                    <Row>
                        <Col>
                            <div className="container mt-4">
                                <div className="card shadow-lg p-3 mb-5 bg-white rounded d-flex flex-row align-items-center">

                                    {/* Bootstrap Carousel for Hospital Images */}
                                    <div className="w-50">
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

                                    {/* Hospital Details */}
                                    <div className="card-body w-50">
                                        <h3 className="card-title text-primary">{hospitalName}</h3>
                                        <p className="text-muted">{address}</p>

                                        {/* Conditions Section */}
                                        {conditions && conditions.length > 0 && (
                                            <div className="mt-3">
                                                <h5 className="text-success">Conditions:</h5>
                                                <ul>
                                                    {conditions.map((condition, index) => (
                                                        <li key={index}>{condition.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Treatments Section */}
                                        {conditions && conditions.length > 0 && (
                                            <div className="mt-3">
                                                <h5 className="text-dark">Treatments:</h5>
                                                <ul>
                                                    {conditions.map((condition, index) => (
                                                        condition.treatments && condition.treatments.length > 0 && (
                                                            condition.treatments.map((treatment, idx) => (
                                                                <li key={`${index}-${idx}`}>{treatment.name}</li>
                                                            ))
                                                        )
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

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default HospitalCard;
