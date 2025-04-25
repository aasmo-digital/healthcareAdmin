import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { deleteTreatments, getAllTreatmentsWithoutSearch } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListTreatments = () => {
  document.title = "Treatments | Health Care";

  const [treatments, setTreatments] = useState([]);
  const [modal, setModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const fetchTreatments = async () => {
    try {
      const response = await getAllTreatmentsWithoutSearch();
      setTreatments(response);
    } catch (error) {
      console.error("Error fetching Treatments:", error);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const toggleModal = () => setModal(!modal);
  const toggleImageModal = () => setImageModal(!imageModal);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
      await deleteTreatments(userIdToDelete);
      setTreatments(treatments.filter(treatment => treatment._id !== userIdToDelete));
      toggleModal();
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-treatments/${userId}`);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    toggleImageModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Treatments" breadcrumbItem="All Treatments" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Treatments</h4>
                  <p className="card-title-desc">Below are all Treatments</p>

                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                        
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {treatments?.length > 0 ? (
                          treatments.map((treatment, index) => (
                            <tr key={treatment._id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <img
                                  src={treatment.image}
                                  alt={treatment.name}
                                  style={{ width: 30, height: 30, borderRadius: 5, cursor: "pointer" }}
                                  onClick={() => handleImageClick(treatment.image)}
                                />
                              </td>
                              <td>{treatment.name}</td>
                            
                              <td>{new Date(treatment.createdAt).toLocaleDateString()}</td>
                              <td>
                                <i className="dripicons-document-edit" onClick={() => handleEdit(treatment._id)} />{" "}
                                <i className="dripicons-document-delete" onClick={() => handleDelete(treatment._id)} />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">No Treatments found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

        {/* Image Preview Modal */}
        <Modal isOpen={imageModal} toggle={toggleImageModal} size="xl" centered>
          <ModalHeader toggle={toggleImageModal}>Image Preview</ModalHeader>
          <ModalBody className="text-center">
            {selectedImage && <img src={selectedImage} alt="Treatment" style={{ width: "50%", height: "auto" }} />}
          </ModalBody>
        </Modal>

      </div>
    </React.Fragment>
  );
};

export default ListTreatments;
