import React, { useEffect, useState } from "react";
import {
    Card, CardBody, Col, Container, Row, Button, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAllAccountDetails, updateComission } from "../../Services/auth"; // Import API function
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListAccountDetails = () => {
    document.title = "Account Details | Health Care";

    const [accountDetails, setAccountDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ id: "", role: "" });
    const [commission, setCommission] = useState("");
    const navigate = useNavigate();

    const fetchAccountDetails = async (page = 1, search = "") => {
        try {
            const response = await getAllAccountDetails(search, page);
            setAccountDetails(response?.accountDetail?.data || []);
            setTotalPages(response?.totalPages || 1);
            setCurrentPage(response?.currentPage || 1);
        } catch (error) {
            console.error("Error fetching Account Details:", error);
        }
    };

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchAccountDetails(1, query);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchAccountDetails(newPage, searchQuery);
        }
    };

    // Open Modal and Set Selected User
    const handleOpenModal = (id, role) => {
        setSelectedUser({ id, role });
        setModalOpen(true);
    };

    // Handle Commission Submission
    const handleSubmitCommission = async (e) => {
        e.preventDefault();
        try {
            let data = {
                id: selectedUser.id,
                role: selectedUser.role,
                commission: commission
            }
            await updateComission(data);
            alert("Commission updated successfully!");
            setModalOpen(false);
            setCommission(""); // Reset input
            fetchAccountDetails(currentPage, searchQuery); // Refresh list
        } catch (error) {
            console.error("Error updating commission:", error);
            alert("Failed to update commission.");
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Account Details" breadcrumbItem="All Account Details" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">All Account Details</h4>
                                    <p className="card-title-desc">Below are all account details</p>

                                    <Input
                                        type="text"
                                        placeholder="Search Name"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />

                                    <div className="table-responsive mt-3">
                                        <table className="table mb-0 text-nowrap" style={{ textAlign: "center" }}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Commission</th>
                                                    <th>Bank Name</th>
                                                    <th>Account Number</th>
                                                    <th>IFSC Code</th>
                                                    <th>UPI</th>
                                                    <th>Created At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {accountDetails?.length > 0 ? (
                                                    accountDetails?.map((item, index) => (
                                                        <tr key={item?._id}>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                {item?.createdByModel === "User"
                                                                    ? item.createdBy?.fullName
                                                                    : item.createdByModel === "Doctor"
                                                                        ? item.createdBy?.doctorName
                                                                        : item.createdByModel === "Partner"
                                                                            ? item.createdBy?.fullName
                                                                            : "N/A"}

                                                            </td>
                                                            <td>{item?.createdBy?.role}</td>
                                                            <td>{item?.createdBy?.commission}</td>
                                                            <td>{item?.bankName}</td>
                                                            <td>{item?.accountNumber}</td>
                                                            <td>{item?.ifscCode}</td>
                                                            <td>{item?.upi || "N/A"}</td>
                                                            <td>{new Date(item?.createdAt).toLocaleString()}</td>
                                                            <td>
                                                                <Button
                                                                    type="button"
                                                                    className="btn btn-primary btn-sm text-nowrap"
                                                                    onClick={() => handleOpenModal(item?.createdBy._id, item.createdBy.role)}
                                                                >
                                                                    Add Commission
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="10" className="text-center">
                                                            No account details found
                                                        </td>
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

            {/* Modal for Adding Commission */}
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Add Commission</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmitCommission}>
                        <FormGroup>
                            <Label for="commission">Commission Amount</Label>
                            <Input
                                type="number"
                                id="commission"
                                value={commission}
                                onChange={(e) => setCommission(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">Submit</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default ListAccountDetails;
