import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import RadialChart1 from "./userpanelChart1";
import axios from "axios";
import {  getAllConditionsWithoutSearch, getAllDoctor, getAllTailorWithoutSearch, getAllTreatmentsWithoutSearch, getAllUserWithoutSearch, getAllWithoutSearchDoctor, getAllWithoutSearchHospitals } from "../../Services/auth";

const UserPanel = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTreatments, setTreatments] = useState(0);
  const [totalCondtions, setCondtions] = useState(0);
  const [totalDoctor, settotalDoctor] = useState(0);
  const [totalHospital, settotalHospital] = useState(0);
  const [orders, setOrders] = useState(0);
  const [ordersDelivered, setOrdersDelivered] = useState(0);
  const [totalAssignedCourses, setTotalAssignedCourses] = useState(0);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userResponse = await getAllUserWithoutSearch();
        // console.log(userResponse.totalUsers,"userResponse")
          setTotalUsers(userResponse?.totalUsers);
      

        const treatmentsResponse = await getAllTreatmentsWithoutSearch()
        setTreatments(treatmentsResponse?.length)


        const conditionsResponse = await getAllConditionsWithoutSearch()
        setCondtions(conditionsResponse?.length)

        const hospitalsResponse = await getAllWithoutSearchHospitals()
        settotalHospital(hospitalsResponse?.totalHospital)

        const doctorsResponse = await getAllWithoutSearchDoctor()
        settotalDoctor(doctorsResponse?.totalDoctors)

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUsersData();
  }, []);




  return (
    <React.Fragment>
      <Row>
        <Col xl={6} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalUsers||"0"]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Users</p>
                  <h5 className="mb-3">{totalUsers||"0"}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-2" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalTreatments||"0"]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Treatments</p>
                  <h5 className="mb-3">{totalTreatments||"0"}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-3" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalCondtions||"0"]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Condtions</p>
                  <h5 className="mb-3">{totalCondtions||"0"}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-3" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalHospital||"0"]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Hospitals</p>
                  <h5 className="mb-3">{totalHospital||"0"}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={12} sm={12}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-3" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalDoctor||"0"]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Doctors</p>
                  <h5 className="mb-3">{totalDoctor||"0"}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        {/* <Col xl={6} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-3" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[ordersDelivered]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Orders Delivered</p>
                  <h5 className="mb-3">{ordersDelivered}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col> */}
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;
