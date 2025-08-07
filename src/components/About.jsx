// src/components/About.jsx

import React from 'react';
import SubSectionHeading from './SubSectionHeading';
import { urlFor } from '../sanityClient';

const About = ({ data }) => {
  const personalInfo = data?.personalInfo || [];
  const midpoint = Math.ceil(personalInfo.length / 2);
  const firstHalf = personalInfo.slice(0, midpoint);
  const secondHalf = personalInfo.slice(midpoint);

  return (
    <section id="about">
      {/* Judul & paragraf tetap tampil */}
      <SubSectionHeading title={data?.personal_info_title} />
      <div className="divider pink"></div>
      <p className="sub-para">{data?.personal_info_para}</p>

      <div className="about-col">
        <div className="img-col">
          {data?.profileImage2 && (
            <img src={urlFor(data.profileImage2).url()} alt="About Me" />
          )}
        </div>
        <div className="info-col">
          {/* Accordion murni CSS */}
          <details className="accordion">
            <summary>
              Show Details
              <span className="arrow"></span>
            </summary>

            <div className="icon-list-col">
              <div className="icon-list">
                <ul>
                  {firstHalf.map((item, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-angle-right"></i>
                      <strong>{item.label}:</strong>&nbsp;
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="icon-list">
                <ul>
                  {secondHalf.map((item, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-angle-right"></i>
                      <strong>{item.label}:</strong>&nbsp;
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default About;
