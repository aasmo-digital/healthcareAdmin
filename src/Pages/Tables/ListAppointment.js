import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAllAppointment } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListAppointment = () => {
    document.title = "Appointment | Health Care";

    const [appointments, setAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const fetchAppointments = async (page = 1, search = "") => {
        try {
            const response = await getAllAppointment(search, page);
            setAppointments(response?.bookApp?.bookApps.reverse() || []);
            setTotalPages(response?.totalPages || 1);
            setCurrentPage(response?.page || 1);
        } catch (error) {
            console.error("Error fetching Appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchAppointments(1, query);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchAppointments(newPage, searchQuery);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Appointments" breadcrumbItem="All Appointments" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">All Appointments</h4>
                                    <p className="card-title-desc">Below are all Appointments</p>

                                    <Input
                                        type="text"
                                        placeholder="Search Appointments..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />

                                    <div className="table-responsive mt-3">
                                        <table className="table mb-0" style={{textAlign:"center",whiteSpace:"nowrap"}}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>City</th>
                                                    <th>Relation</th>
                                                    <th>Treatment Condition</th>
                                                    <th>Doctor Name</th>
                                                    
                                                    <th>Age</th>
                                                    <th>Date</th>
                                                    <th>Gender</th>
                                                    <th>Referral User Name</th>
                                                    <th>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments?.length > 0 ? (
                                                    appointments.map((item, index) => (
                                                        <tr key={item._id}>
                                                            <th>{index + 1}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.city?.name || "N/A"}</td>
                                                            <td>{item.relation}</td>
                                                            <td>{item.treatmentCondition?.name || "N/A"}</td>
                                                            <td>{item.doctorId?.doctorName || "Admin"}</td>
                                                            <td>{item.age}</td>
                                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                                            <td>{item.gender}</td>
                                                            <td>
                                                                {item.referredBy ? (
                                                                    <>
                                                                        <strong>{item?.referredBy?.name}</strong><br /><strong>({item?.referredBy?.role})</strong>
                                                                        {/* Phone: {item.referredBy.phone}<br /> */}
                                                                        {/* Type: {item.referredBy.role} */}
                                                                    </>
                                                                ) : (
                                                                    <span>Self Appointment</span>
                                                                )}
                                                            </td>
                                                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="9" className="text-center">No items found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="pagination-container mt-3" style={{ textAlign: "center" }}>
                                        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                            Previous
                                        </Button>
                                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                                        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                                            Next
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ListAppointment;
