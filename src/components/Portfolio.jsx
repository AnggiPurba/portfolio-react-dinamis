// src/components/Portfolio.jsx

import React from 'react';
import SubSectionHeading from './SubSectionHeading'; // <-- Import komponen baru

const Portfolio = ({ data }) => {
  const certificates = data.items.filter(item => item.category === 'certificate');
  const projects = data.items.filter(item => item.category === 'project');

  return (
    <section id="portfolio">
      <h1 className="sub-heading">{data.heading}</h1>
      <div className="divider"></div>
      <p className="sub-para">{data.sub_para}</p>
      
      {/* Menggunakan komponen baru */}
      <SubSectionHeading title={data.certificates_title} />
      <div className="port-row">
        {certificates.map(item => (
          <div className="port-item" key={item.id}>
            <div className="port-img">
              <img src={item.image} alt={item.title} />
              <div className="port-info">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="port-links">
                    {item.link && item.link !== '#' && (
                        <a href={item.link} className="port-link-btn" target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-link"></i> Lihat
                        </a>
                    )}
                    {item.downloadableImage && (
                        <a href={item.downloadableImage} className="port-link-btn" download>
                            <i className="fa-solid fa-download"></i> Download
                        </a>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menggunakan komponen baru */}
      <SubSectionHeading title={data.projects_title} />
      <div className="port-row">
        {projects.map(item => (
          <div className="port-item" key={item.id}>
            <div className="port-img">
              <img src={item.image} alt={item.title} />
              <div className="port-info">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="port-links">
                    {item.link && item.link !== '#' && (
                        <a href={item.link} className="port-link-btn" target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-link"></i> Lihat
                        </a>
                    )}
                    {item.downloadableImage && (
                        <a href={item.downloadableImage} className="port-link-btn" download>
                            <i className="fa-solid fa-download"></i> Download
                        </a>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;