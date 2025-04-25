import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { deleteDoctor, getAllDoctor, getAllDoctors } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListDoctors = () => {
    document.title = "Doctor | Health Care";

    const [doctors, setDoctors] = useState([]);
    const [modal, setModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const fetchDoctors = async (page = 1, search = "") => {
        try {
            const response = await getAllDoctor(search, page); // Corrected parameter order
            console.log(response?.hospitals?.doctors, "doctors")
            setDoctors(response?.hospitals?.doctors);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error("Error fetching Doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchDoctors(1, query);
    };

    const toggleModal = () => setModal(!modal);
    const toggleImageModal = () => setImageModal(!imageModal);

    const handleDelete = (userId) => {
        setUserIdToDelete(userId);
        toggleModal();
    };

    const confirmDelete = async () => {
        try {
            await deleteDoctor(userIdToDelete);
            fetchDoctors(currentPage, searchQuery);
            toggleModal();
        } catch (error) {
            console.error("Error deleting Doctor:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-doctor/${id}`);
    };

    const handleView = (id) => {
        navigate(`/view-doctor/${id}`);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        toggleImageModal();
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchDoctors(newPage, searchQuery);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Doctors" breadcrumbItem="All Doctors" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">All Doctors</h4>
                                    <p className="card-title-desc">Below are all Doctors</p>

                                    <Input
                                        type="text"
                                        placeholder="Search Doctors..."
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
                                                    {/* <th>Email</th> */}
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {doctors?.length > 0 ? (
                                                    doctors?.map((doctor, index) => (
                                                        <tr key={doctor._id}>
                                                            <th>{index + 1}</th>
                                                            {/* <td>
                                                                <img
                                                                    src={doctor.image}
                                                                    alt={doctor.name}
                                                                    style={{ width: 30, height: 30, borderRadius: 5, cursor: "pointer" }}
                                                                    onClick={() => handleImageClick(doctor.image)}
                                                                />
                                                            </td> */}
                                                         
                                                            <td>{doctor?.doctorName}</td>
                                                            {/* <td>{doctor?.email}</td> */}
                                                            <td className="nowrap">{new Date(doctor?.createdAt).toLocaleDateString()}</td>
                                                            <td>
                                                                <i className="dripicons-preview" onClick={() => handleView(doctor?._id)} />
                                                                &nbsp;
                                                                <i className="dripicons-document-edit" onClick={() => handleEdit(doctor?._id)} />
                                                                &nbsp;
                                                                <i className="dripicons-document-delete" onClick={() => handleDelete(doctor?._id)} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No Doctors found</td>
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

export default ListDoctors;
