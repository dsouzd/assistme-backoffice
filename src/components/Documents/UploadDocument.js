// src/components/Documents/UploadDocument.js
import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { uploadFile } from '../../services/api';

const UploadDocument = ({ user, onUpload }) => {
  const [file, setFile] = useState(null);
  const [version, setVersion] = useState('');
  const [tags, setTags] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(''); // New state for Super Admin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to determine the department based on user role
  const getDepartment = () => {
    if (user.role === 'Super Admin') {
      return selectedDepartment; 
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Ensure a file is selected
    if (!file) {
      setError('Please select a file');
      return;
    }

    // Validation: Ensure department is selected for Super Admin
    if (user.role === 'Super Admin' && !selectedDepartment) {
      setError('Please select a department');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await uploadFile(department, version, tags, file);
      onUpload(); // Refresh the document list
      setFile(null);
      setVersion('');
      setTags('');
      if (user.role === 'Super Admin') {
        setSelectedDepartment(''); // Reset department selection after upload
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setError('Failed to upload file');
    }

    setLoading(false);
  };

  return (
    <div>
      <h4>Upload Document</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Department Selection for Super Admin */}
        {user.role === 'Super Admin' && (
          <Form.Group controlId="formDepartment" className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              <option value="Human Resources">Human Resources</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
            </Form.Select>
          </Form.Group>
        )}

        {/* File Input */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        {/* Version Input */}
        <Form.Group controlId="formVersion" className="mb-3">
          <Form.Label>Version</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
          />
        </Form.Group>

        {/* Tags Input */}
        <Form.Group controlId="formTags" className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Upload'}
        </Button>
      </Form>
    </div>
  );
};

export default UploadDocument;
