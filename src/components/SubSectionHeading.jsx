// src/components/SubSectionHeading.jsx

import React from 'react';

const SubSectionHeading = ({ title }) => {
  return (
    <div className="subsection-heading-container">
      <h2>{title}</h2>
      <div className="divider pink"></div>
    </div>
  );
};

export default SubSectionHeading;