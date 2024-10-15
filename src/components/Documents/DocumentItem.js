// src/components/Documents/DocumentItem.js
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { deleteFile } from '../../services/api';
import { getAdminRole } from '../../utils/roleMapping'; // Import the utility function

const DocumentItem = ({ document, department, user, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${document.title}?`)) return;
    setLoading(true);
    try {
      await deleteFile(department, document.title);
      onAction(); // Refresh the document list
    } catch (err) {
      alert('Failed to delete file');
    }
    setLoading(false);
  };

  // Determine the admin role for the current department
  const adminRole = getAdminRole(department);

  // Check if the user is Super Admin or the specific Admin for the department
  const canModify = user.role === 'Super Admin' || user.role === adminRole;

  return (
    <tr>
      <td>{document.title}</td>
      <td>{document.version}</td>
      <td>{document.upload_date}</td>
      <td>{document.tags}</td>
      {canModify && (
        <td>
          <Button variant="danger" size="sm" onClick={handleDelete} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
          </Button>
          {/* Add Update button here if implementing update */}
        </td>
      )}
    </tr>
  );
};

export default DocumentItem;
