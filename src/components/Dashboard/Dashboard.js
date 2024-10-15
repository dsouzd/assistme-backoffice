// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../../services/api';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import DocumentList from '../Documents/DocumentList';
import UploadDocument from '../Documents/UploadDocument';

const Dashboard = ({ user }) => {
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getDepartment = () => {
    if (user.role === 'Super Admin') return null; // No department filter
    switch (user.role) {
      case 'HR Admin':
        return 'Human Resources';
      case 'IT Admin':
        return 'IT';
      case 'Finance Admin':
        return 'Finance';
      default:
        return null;
    }
  };

  const department = getDepartment();

  const loadDocuments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchDocuments(department);
      if (user.role === 'Super Admin') {
        setDocuments(response.data.data);
      } else {
        setDocuments({ docs: response.data.data.docs });
      }
    } catch (err) {
      setError('Failed to fetch documents');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDocuments();
    // eslint-disable-next-line
  }, [department, user.role]);

  const handleRefresh = () => {
    loadDocuments();
  };

  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <>
          {user.role === 'Super Admin' ? (
            Object.keys(documents).map((dept) => (
              <Row key={dept} className="mb-4">
                <Col>
                  <h4>{dept} Department</h4>
                  <DocumentList
                    documents={documents[dept]}
                    department={dept}
                    user={user}
                    onAction={handleRefresh}
                  />
                </Col>
              </Row>
            ))
          ) : (
            <Row>
              <Col>
                <h4>{department} Department</h4>
                <DocumentList
                  documents={documents.docs}
                  department={department}
                  user={user}
                  onAction={handleRefresh}
                />
              </Col>
            </Row>
          )}
          <Row className="mt-4">
            <Col>
              <UploadDocument user={user} onUpload={handleRefresh} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
