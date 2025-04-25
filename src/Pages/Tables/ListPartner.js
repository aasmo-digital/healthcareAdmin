import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserList.css";
import { deletePartner, deleteUser, getAllPartner, getAllUser } from "../../Services/auth";

const ListPartner = () => {
  document.title = "Partners | Health Care";

  const [Partners, setPartners] = useState([]);
  const [modal, setModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchPartners = async () => {
    try {
      const { partners, totalPages } = await getAllPartner(search, page);
  
      setPartners(partners);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching Partners:", error);
    }
  };


  useEffect(() => {
    fetchPartners();
  }, [search, page]); // Fetch Partners whenever search term or page changes

  const toggleModal = () => setModal(!modal);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
        const response = await deletePartner(userIdToDelete); // Await the API call
        setPartners(Partners.filter(user => user._id !== userIdToDelete)); // Remove user from state
        toggleModal(); // Close modal
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

  const handleEdit = (userId) => {
    navigate(`/edit-partner/${userId}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Partners" breadcrumbItem="All Partners" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Partners</h4>
                  <p className="card-title-desc">Below are all registered Partners</p>

                  <Input
                    type="text"
                    placeholder="Search Name & Email"
                    value={search}
                    onChange={handleSearch}
                    className="col-md-6 mb-3"
                  />

                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>#</th>
                          <th>Full Name</th>
                          <th>Phone Number</th>
                          <th>City</th>
                        
                          <th>Email</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {Partners?.length > 0 ? (
                          Partners.map((user, index) => (
                            <tr key={user._id}>
                              <th scope="row">{(page - 1) * 10 + index + 1}</th>
                              <td className="nowrap">{user?.fullName}</td>
                              <td className="nowrap">{user?.phone}</td>
                              <td className="nowrap">{user?.city?.name}</td>
                              <td className="nowrap">{user?.email}</td>
                              <td className="nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                              <td>
                                <i className="dripicons-document-edit" onClick={() => handleEdit(user._id)} />{" "}
                                <i className="dripicons-document-delete" onClick={() => handleDelete(user._id)} />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">No Partners found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <br />

                  {/* Pagination Controls */}
                  {/* Pagination Controls */}
                  <div className="pagination-controls" style={{ textAlign: "center" }}>
                    
                    <Button onClick={() => changePage(page - 1)} disabled={page === 1}>
                      Previous
                    </Button>
                    &nbsp;
                    {Array.from({ length: totalPages }, (_, index) => (
                      <Button
                        key={index}
                        onClick={() => changePage(index + 1)}
                        active={page === index + 1}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    &nbsp;
                    <Button onClick={() => changePage(page + 1)} disabled={page >= totalPages}>
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

export default ListPartner;
