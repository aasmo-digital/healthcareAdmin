import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAllDoctorRefferals } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListDoctorRefferals = () => {
    document.title = "Doctor Referrals | Health Care";

    const [doctorReferrals, setDoctorReferrals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchDoctorReferrals = async (page = 1, search = "") => {
        try {
            const response = await getAllDoctorRefferals(search, page);
            console.log(response, "response");
            setDoctorReferrals(response?.refferals || []); // Correct key from "refferals" to "referrals"
            setTotalPages(response?.totalPages || 1);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching DoctorReferrals:", error);
        }
    };

    useEffect(() => {
        fetchDoctorReferrals();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        fetchDoctorReferrals(1, e.target.value);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchDoctorReferrals(newPage, searchQuery);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Doctor Referrals" breadcrumbItem="All Doctor Referrals" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">All Doctor Referrals</h4>
                                    <p className="card-title-desc">Below are all Doctor Referrals</p>

                                    {/* <Input
                                        type="text"
                                        placeholder="Search Doctor Referrals..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    /> */}

                                    <div className="table-responsive mt-3">
                                        <table className="table mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Hospital Name</th>
                                                    <th>Hospital Address</th>
                                                    <th>Doctor Name</th>
                                                    <th>Doctor Email</th>
                                                    <th>Specialization</th>
                                                    <th>Referral Code</th>
                                                    <th>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {doctorReferrals.length > 0 ? (
                                                    doctorReferrals.map((item, index) => (
                                                        <tr key={item._id}>
                                                            <th>{(currentPage - 1) * 10 + index + 1}</th>
                                                            <td>{item.hospitalId?.hospitalName || "N/A"}</td>
                                                            <td>{item.hospitalId?.address || "N/A"}</td>
                                                            <td>{item.doctor?.doctorName || "N/A"}</td>
                                                            <td>{item.doctor?.email || "N/A"}</td>
                                                            <td>{item.doctor?.specialization || "N/A"}</td>
                                                            <td>{item.refferalCode || "N/A"}</td>
                                                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8" className="text-center">No items found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {/* <div className="pagination-container mt-3 text-center">
                                        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                            Previous
                                        </Button>
                                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                                        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                                            Next
                                        </Button>
                                    </div> */}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ListDoctorRefferals;
