// src/components/Portfolio.jsx

import React from 'react';
import SubSectionHeading from './SubSectionHeading';
import { urlFor, fileUrlFor } from '../sanityClient';

const Portfolio = ({ data }) => {
  const items = data?.items || [];
  const certificates = items.filter(item => item.category === 'certificate');
  const projects = items.filter(item => item.category === 'project');

  const renderPortfolioItems = (itemsToRender) => {
    return itemsToRender.map(item => (
      <div className="port-item" key={item._key || item.id}>
        <div className="port-img">
          {item.image && (
            <img src={urlFor(item.image).url()} alt={item.title} />
          )}
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
                    <a href={fileUrlFor(item.downloadableImage)} className="port-link-btn" download>
                        <i className="fa-solid fa-download"></i> Download
                    </a>
                )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section id="portfolio">
      <h1 className="sub-heading">{data?.heading}</h1>
      <div className="divider"></div>
      <p className="sub-para">{data?.sub_para}</p>
      
      <SubSectionHeading title={data?.certificates_title} />
      <div className="port-row">
        {renderPortfolioItems(certificates)}
      </div>

      <SubSectionHeading title={data?.projects_title} />
      <div className="port-row">
        {renderPortfolioItems(projects)}
      </div>
    </section>
  );
};

export default Portfolio;
