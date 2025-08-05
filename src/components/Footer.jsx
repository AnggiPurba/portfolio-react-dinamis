// src/components/Footer.jsx

import React from 'react';

const Footer = ({ data }) => {
  return (
    <footer className="footer">
      <p>
        © Copyright {data.copyrightYear} <br />
        Designed By <a href={data.developerLink} target="_blank" rel="noopener noreferrer">{data.designedBy}</a>
      </p>
    </footer>
  );
};

export default Footer;