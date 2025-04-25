import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const BasicTable = () => {
  document.title = "Package History |  Health Care";

  const [packageData, setPackageData] = useState(null);
  const [packageStatus, setpackageStatus] = useState(null);

  useEffect(() => {
    // Fetch the package history when the component mounts
    const fetchPackage = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Make the API request with the Authorization header
        const response = await axios.get('https://mlm-backend-9fnq.onrender.com/api/user/get-select-packages', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Assuming you want to show the first package only
        if (response) {
          setPackageData(response.package);
          setpackageStatus(response.userStatus);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackage();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Buy Package" breadcrumbItem="Package History" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Package History</h4>
                  <p className="card-title-desc">
                    Below is the package you have selected.
                  </p>

                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Package Name</th>
                          <th>Price</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packageData ? (
                          <tr>
                            <th scope="row">1</th>
                            <td>{packageData.name}</td>
                            <td>{packageData.price}</td>
                            <td style={{ color: packageStatus === 'pending' ? 'blue' : 'green' }}>
    {packageStatus.charAt(0).toUpperCase() + packageStatus.slice(1)} {/* Capitalizing the first letter */}
</td>

                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">No package selected</td>
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
      </div>
    </React.Fragment>
  );
};

export default BasicTable;
