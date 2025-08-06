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
      <h1 className="sub-heading">{data?.heading}</h1>
      <div className="divider"></div>
      <p className="sub-para">{data?.sub_para}</p>

      <div className="about-col">
        <div className="img-col">
          {data?.profileImage2 && (
            <img src={urlFor(data.profileImage2).url()} alt="About Me" />
          )}
        </div>
        <div className="info-col">
          <SubSectionHeading title={data?.personal_info_title} />
          <p>{data?.personal_info_para}</p>
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
