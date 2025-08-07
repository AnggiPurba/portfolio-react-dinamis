// src/components/Resume.jsx

import React from 'react';
import SubSectionHeading from './SubSectionHeading';

// Fungsi sortTimeline tidak perlu diubah
const sortTimeline = (items) => {
 const monthToNumber = (monthStr) => {
  const months = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  const month = monthStr ? monthStr.toLowerCase().substring(0, 3) : '';
  return months[month] || 0;
 };
 return [...items].sort((a, b) => {
  const yearA = a.endDate.toLowerCase() === 'present' ? new Date().getFullYear() + 1 : parseInt(a.endDate.split(' ')[1]);
  const monthA = a.endDate.toLowerCase() === 'present' ? 12 : monthToNumber(a.endDate.split(' ')[0]);
  const yearB = b.endDate.toLowerCase() === 'present' ? new Date().getFullYear() + 1 : parseInt(b.endDate.split(' ')[1]);
  const monthB = b.endDate.toLowerCase() === 'present' ? 12 : monthToNumber(b.endDate.split(' ')[0]);
  if (yearB !== yearA) { return yearB - yearA; }
  return monthB - monthA;
 });
};

const Resume = ({ data }) => {
 const sortedEducation = sortTimeline(data.education);
 const sortedExperience = sortTimeline(data.experience);

 return (
  <section id="resume">
   <h1 className="sub-heading">{data.heading}</h1>
   <div className="divider"></div>
   <p className="sub-para">{data.sub_para}</p>
   
      {/* STRUKTUR BARU: Tiga bagian terpisah di dalam .resume-row */}
   <div className="resume-row">
        
        {/* Kolom 1: Professional Experience */}
        <div className="resume-section">
          <SubSectionHeading title={data.experience_title} />
          <div className="timeline-wrapper">
            {sortedExperience.map(exp => (
              <div className="pro-exp" key={exp.id}>
                <h3>{exp.title}</h3>
                <span className="sp-box">{`${exp.startDate} - ${exp.endDate}`}</span>
                <p>{exp.institution}</p>
                <ul>
                  {exp.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom 2: Education */}
        <div className="resume-section">
          <SubSectionHeading title={data.education_title} />
          <div className="timeline-wrapper">
            {sortedEducation.map(edu => (
              <div className="my-edu" key={edu.id}>
                <h3>{edu.degree}</h3>
                <span className="sp-box">{`${edu.startDate} - ${edu.endDate}`}</span>
                <p>{edu.institution}</p>
                <p>{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Kolom 3: Summary */}
        <div className="resume-section">
          <SubSectionHeading title={data.summary_title} />
          <div className="my-info">
            <h3>{data.summary.title}</h3>
            <p>{data.summary.content}</p>
          </div>
        </div>

   </div>
  </section>
 );
};

export default Resume;