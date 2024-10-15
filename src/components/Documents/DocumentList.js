// src/components/Documents/DocumentList.js
import React from 'react';
import { Table } from 'react-bootstrap';
import DocumentItem from './DocumentItem';

const DocumentList = ({ documents, department, user, onAction }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Version</th>
          <th>Upload Date</th>
          <th>Tags</th>
          {['Super Admin', `${department} Admin`].includes(user.role) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {documents.map((doc, index) => (
          <DocumentItem
            key={index}
            document={doc}
            department={department}
            user={user}
            onAction={onAction}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default DocumentList;
