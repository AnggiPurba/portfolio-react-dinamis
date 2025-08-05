// src/components/About.jsx

import React from 'react';
import SubSectionHeading from './SubSectionHeading'; // <-- Import komponen sub-section

const About = ({ data }) => {
  // Membuat daftar menjadi dinamis
  const midpoint = Math.ceil(data.personalInfo.length / 2);
  const firstHalf = data.personalInfo.slice(0, midpoint);
  const secondHalf = data.personalInfo.slice(midpoint);

  return (
    <section id="about">
      <h1 className="sub-heading">{data.heading}</h1>
      <div className="divider"></div>
      <p className="sub-para">{data.sub_para}</p>

      <div className="about-col">
        <div className="img-col">
          <img src={data.profileImage2} alt="About Me" />
        </div>
        <div className="info-col">
          {/* --- PERUBAHAN DI SINI --- */}
          <SubSectionHeading title={data.personal_info_title} />
          {/* --- AKHIR PERUBAHAN --- */}
          <p>{data.personal_info_para}</p>
          <div className="icon-list-col">
            <div className="icon-list">
              <ul>
                {firstHalf.map((item, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-angle-right"></i>
                    <strong>{item.label}</strong>
                    &nbsp;<span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="icon-list">
              <ul>
                {secondHalf.map((item, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-angle-right"></i>
                    <strong>{item.label}</strong>
                    &nbsp;<span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;