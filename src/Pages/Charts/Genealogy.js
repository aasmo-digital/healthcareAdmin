// Corrected Code
// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserTie, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import './GenealogyTree.css';
// import { Card, CardBody, Col, Container, Row } from 'reactstrap';
// import Breadcrumbs from '../../components/Common/Breadcrumb';

// // Function to build the tree structure
// const buildTree = (topUser, referredUsers, secondLevelReferredUsers) => {
//     const createNode = (user) => ({
//         id: user._id,
//         name: `${user.firstName} ${user.lastName}`,
//         userId: `(${user._id})`,
//         color: user.position === 'right' ? 'blue' : 'green',
//         icon: user.position === 'right' ? faUser : faUserTie,
//         position: 'center', // Default position for now
//         children: [],
//     });

//     // Build second level nodes
//     const buildSecondLevelNodes = (referralId) => {
//         return secondLevelReferredUsers
//             .filter(user => user.sponsorId === referralId)
//             .map(createNode);
//     };

//     // Build referred nodes
//     const buildReferredNodes = () => {
//         return referredUsers.map(user => ({
//             ...createNode(user),
//             position: user.position === 'right' ? 'right' : 'left',
//             children: buildSecondLevelNodes(user.referralId),
//         }));
//     };

//     return {
//         id: topUser._id,
//         name: `${topUser.firstName} ${topUser.lastName}`,
//         userId: `(${topUser._id})`,
//         color: 'red', // Top user color
//         icon: faUserSecret,
//         position: 'center',
//         children: buildReferredNodes(),
//     };
// };

// const GenealogyTree = () => {
//     const [treeData, setTreeData] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         // Fetch top user data and all user data
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://mlm-backend-9fnq.onrender.com/api/user/get-teams', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const { userProfile, referredUsers, secondLevelReferredUsers } = response;

//                 if (userProfile) {
//                     const treeRoot = buildTree(userProfile, referredUsers, secondLevelReferredUsers);
//                     setTreeData(treeRoot);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <React.Fragment>
//             <div className="page-content">
//                 <Container fluid>
//                     <Breadcrumbs title="Genealogy" breadcrumbItem="Genealogy Tree" />

//                     <Row>
//                         <Col xl={12}>
//                             <Card>
//                                 <CardBody>
//                                     <div className="col-lg-12 col-md-12 " style={{ fontSize: "11px" }}>
//                                         <div className="card">
//                                             {/* <div className="header">
//           <h2>Genealogy</h2>
//         </div> */}
//                                             <div className="body">
//                                                 <div className="genealogy-tree">
//                                                     {treeData ? <TreeNode node={treeData} /> : 'Loading...'}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </React.Fragment>
//     );
// };

// const TreeNode = ({ node }) => {
//     if (!node) return null;

//     return (
//         <div className="tree-node">
//             {node.name ? (
//                 <>
//                     <div className="node-icon" style={{ color: node.color }}>
//                         <FontAwesomeIcon icon={node.icon} size="2x" />
//                     </div>
//                     <div className="node-label" style={{ borderColor: node.color }}>
//                         {node.name || 'No Name'}<br />
//                         {node.userId || 'No ID'}
//                     </div>
//                 </>
//             ) : (
//                 <div className="empty-node"></div>
//             )}
//             {node.children && node.children.length > 0 && (
//                 <div className={`node-children ${node.position}`}>
//                     {node.children.map((child) => (
//                         <TreeNode key={child.id || Math.random()} node={child} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GenealogyTree;



import React, { useEffect, useState } from 'react';
import './GenealogyTree.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';

const GenealogyTree = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mlm-backend-9fnq.onrender.com/api/user/get-teams', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setData(response);  // Access response.data instead of the entire response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get conditional colors based on node type
  const getColor = (isRoot, nodeType) => {
    if (isRoot) return 'red';  // Set root user to red
    if (nodeType === 'left') return 'green';
    if (nodeType === 'right') return 'blue';
    return 'black'; // Default for other nodes
  };

  const GenealogyTreeNode = ({ node, isRoot = false, nodeType = 'root' }) => {
    const getNodeClass = () => {
      if (isRoot) return 'root-node';
      if (nodeType === 'left') return 'left-node';
      if (nodeType === 'right') return 'right-node';
      return '';
    };

    const getIconClass = () => {
      if (isRoot) return 'root-icon';
      if (nodeType === 'left') return 'left-icon';
      if (nodeType === 'right') return 'right-icon';
      return '';
    };

    return (
      <div className={`tree-node ${getNodeClass()}`}>
        <div className="user-info">
          {/* Icon for the user */}
          <FontAwesomeIcon
            icon={faUser}
            className={`user-icon ${getIconClass()}`}
            style={{ color: getColor(isRoot, nodeType) }} // Apply conditional color for the icon
          />
          <p style={{ color: getColor(isRoot, nodeType) }}>{`${node.firstName} ${node.lastName}`}</p> {/* Apply conditional color for the name */}
        </div>
        <div className="children">
          {node.referrals && node.referrals.length > 0 && (
            <>
              <div className="left-child">
                {node.referrals.find((ref) => ref.position === 'left') && (
                  <GenealogyTreeNode
                    node={node.referrals.find((ref) => ref.position === 'left')}
                    nodeType="left"
                  />
                )}
              </div>
              <div className="right-child">
                {node.referrals.find((ref) => ref.position === 'right') && (
                  <GenealogyTreeNode
                    node={node.referrals.find((ref) => ref.position === 'right')}
                    nodeType="right"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading genealogy tree data.</div>;
  }

  if (!data || !data.userProfile) {
    return <div>No data available</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Genealogy" breadcrumbItem="Genealogy Tree" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="genealogy-tree">
                    {/* Render the tree root node */}
                    <GenealogyTreeNode node={{ ...data.userProfile, referrals: data.referrals }} isRoot={true} />
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

export default GenealogyTree;
