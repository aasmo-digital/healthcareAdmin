import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { deleteConditions, getAllConditionsWithoutSearch } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListConditions = () => {
  document.title = "Conditions | Health Care";

  const [Conditions, setConditions] = useState([]);
  const [modal, setModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const fetchConditions = async () => {
    try {
      const response = await getAllConditionsWithoutSearch();
      setConditions(response);
      console.log(response, "response");
    } catch (error) {
      console.error("Error fetching Conditions:", error);
    }
  };

  useEffect(() => {
    fetchConditions();
  }, []);

  const toggleModal = () => setModal(!modal);
  const toggleImageModal = () => setImageModal(!imageModal);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
      await deleteConditions(userIdToDelete);
      setConditions(Conditions.filter(condition => condition._id !== userIdToDelete));
      toggleModal();
    } catch (error) {
      console.error("Error deleting condition:", error);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-conditions/${userId}`);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    toggleImageModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Conditions" breadcrumbItem="All Conditions" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Conditions</h4>
                  <p className="card-title-desc">Below are all Conditions</p>

                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Treatment</th>
                          
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
  {Conditions?.length > 0 ? (
    Conditions.map((condition, index) => {
      const { treatments } = condition;

      return (
        <tr key={condition._id}>
          <th scope="row">{index + 1}</th>
          <td>
            <img
              src={condition.image}
              alt={condition.name}
              style={{ width: 30, height: 30, borderRadius: 5, cursor: "pointer" }}
              onClick={() => handleImageClick(condition.image)}
            />
          </td>
          <td>{condition.name}</td>
          <td>
            {treatments && treatments.length > 0 ? (
              treatments.map((treatment) => treatment.name).join(", ")
            ) : (
              "No treatments"
            )}
          </td>
          <td>{new Date(condition.createdAt).toLocaleDateString()}</td>
          <td>
            <i className="dripicons-document-edit" onClick={() => handleEdit(condition._id)} />{" "}
            <i className="dripicons-document-delete" onClick={() => handleDelete(condition._id)} />{" "}
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7" className="text-center">No Conditions found</td>
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
            {selectedImage && <img src={selectedImage} alt="Condition" style={{ width: "50%", height: "auto" }} />}
          </ModalBody>
        </Modal>

      </div>
    </React.Fragment>
  );
};

export default ListConditions;
