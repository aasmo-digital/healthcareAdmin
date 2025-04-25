import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { deleteHospitals, getAllHospitals } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListHospitals = () => {
    document.title = "Hospitals | Health Care";

    const [hospitals, setHospitals] = useState([]);
    const [modal, setModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const fetchHospitals = async (page = 1, search = "") => {
        try {
            const response = await getAllHospitals(search, page); // Corrected parameter order
            setHospitals(response.hospitals);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchHospitals(1, query);
    };

    const toggleModal = () => setModal(!modal);
    const toggleImageModal = () => setImageModal(!imageModal);

    const handleDelete = (userId) => {
        setUserIdToDelete(userId);
        toggleModal();
    };

    const confirmDelete = async () => {
        try {
            await deleteHospitals(userIdToDelete);
            fetchHospitals(currentPage, searchQuery);
            toggleModal();
        } catch (error) {
            console.error("Error deleting hospital:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-hospital/${id}`);
    };

    const handleView = (id) => {
        navigate(`/view-hospital/${id}`);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        toggleImageModal();
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchHospitals(newPage, searchQuery);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Hospitals" breadcrumbItem="All Hospitals" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">All Hospitals</h4>
                                    <p className="card-title-desc">Below are all hospitals</p>

                                    <Input
                                        type="text"
                                        placeholder="Search Hospitals..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />

                                    <div className="table-responsive mt-3">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    {/* <th>Image</th> */}
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hospitals.length > 0 ? (
                                                    hospitals.map((hospital, index) => (
                                                        <tr key={hospital._id}>
                                                            <th>{index + 1}</th>
                                                            {/* <td>
                                                                <img
                                                                    src={`http://localhost:5000${hospital.images[0]}`}
                                                                    alt={hospital.hospitalName}
                                                                    style={{ width: 50, height: 50, cursor: "pointer" }}
                                                                    onClick={() => handleImageClick(`http://localhost:5000${hospital.images[0]}`)}
                                                                />
                                                            </td> */}
                                                            <td>{hospital.hospitalName}</td>
                                                            <td>{hospital.address}</td>
                                                            <td className="nowrap">{new Date(hospital.createdAt).toLocaleDateString()}</td>
                                                            <td>
                                                                <i className="dripicons-preview" onClick={() => handleView(hospital._id)} />
                                                                &nbsp;
                                                                <i className="dripicons-document-edit" onClick={() => handleEdit(hospital._id)} />
                                                                &nbsp;
                                                                <i className="dripicons-document-delete" onClick={() => handleDelete(hospital._id)} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No Hospitals found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="pagination-container mt-3 " style={{ textAlign: "center" }}>
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

                {/* Delete Confirmation Modal */}
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
                    <ModalBody>Are you sure you want to delete?</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button color="danger" onClick={confirmDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default ListHospitals;
