import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { deleteBanner, getAllBannerWithoutSearch } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const ListBanner = () => {
  document.title = "Banners | Health Care";

  const [banners, setBanners] = useState([]);
  const [modal, setModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const response = await getAllBannerWithoutSearch();
      setBanners(response?.banner);
    } catch (error) {
      console.error("Error fetching Banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const toggleModal = () => setModal(!modal);
  const toggleImageModal = () => setImageModal(!imageModal);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
      await deleteBanner(userIdToDelete);
      setBanners(banners.filter(treatment => treatment._id !== userIdToDelete));
      toggleModal();
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-banners/${userId}`);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    toggleImageModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Banners" breadcrumbItem="All Banners" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Banners</h4>
                  <p className="card-title-desc">Below are all Banners</p>

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
                        {banners?.length > 0 ? (
                          banners.map((treatment, index) => (
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
                            <td colSpan="7" className="text-center">No Banners found</td>
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

export default ListBanner;
