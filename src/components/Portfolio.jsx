// src/components/Portfolio.jsx

import React, { useState } from 'react'; // 1. Import useState
import SubSectionHeading from './SubSectionHeading';
import { urlFor, fileUrlFor } from '../sanityClient';

const Portfolio = ({ data }) => {
 // 2. Tambahkan state untuk melacak item mana yang sedang aktif (di-klik)
 const [activeId, setActiveId] = useState(null);

 const items = data?.items || [];
 const certificates = items.filter(item => item.category === 'certificate');
 const projects = items.filter(item => item.category === 'project');

 // 3. Fungsi untuk menangani event klik pada item portofolio
 const handleItemClick = (itemId) => {
  // Jika item yang sama diklik lagi, tutup. Jika beda, buka item baru.
  setActiveId(activeId === itemId ? null : itemId);
 };

 const renderPortfolioItems = (itemsToRender) => {
  return itemsToRender.map(item => {
      const uniqueKey = item._id || item._key; // Gunakan _id atau _key dari Sanity
      return (
        // 4. Tambahkan onClick dan className dinamis di sini
    <div
          className={`port-item ${activeId === uniqueKey ? 'show-buttons' : ''}`}
          key={uniqueKey}
          onClick={() => handleItemClick(uniqueKey)}
        >
     <div className="port-img">
      {item.image && (
       <img src={urlFor(item.image).url()} alt={item.title} />
      )}
      <div className="port-info">
              {/* 5. Bungkus deskripsi agar mudah di-styling oleh CSS */}
              <div className="port-description">
         <h4>{item.title}</h4>
         <p>{item.description}</p>
              </div>
       <div className="port-links">
        {item.link && item.link !== '#' && (
         <a href={item.link} className="port-link-btn" target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-link"></i> Link
         </a>
        )}
                {/* Link untuk GitHub (jika ada di data Sanity Anda) */}
                {item.githubUrl && (
                  <a href={item.githubUrl} className="port-link-btn" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i> GitHub
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
   )
    });
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