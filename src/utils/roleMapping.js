// src/utils/roleMapping.js

export const getAdminRole = (department) => {
    const mapping = {
      'Human Resources': 'HR Admin',
      'IT': 'IT Admin',
      'Finance': 'Finance Admin',
    };
    return mapping[department] || null;
  };
  