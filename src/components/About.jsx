import React, { useRef, useEffect } from 'react';
import SubSectionHeading from './SubSectionHeading';
import { urlFor } from '../sanityClient';

const About = ({ data }) => {
  const contentRef = useRef(null);
  const personalInfo = data?.personalInfo || [];
  const midpoint = Math.ceil(personalInfo.length / 2);
  const firstHalf = personalInfo.slice(0, midpoint);
  const secondHalf = personalInfo.slice(midpoint);

  // Pastikan konten expand otomatis sesuai isi
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <section id="about">
      <h1 className="sub-heading">{data?.heading}</h1>
      <div className="divider pink"></div>
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

          {/* === Accordion Hover === */}
          <div className="accordion-wrapper">
            <div className="accordion-header">
              <span>Personal Information</span>
              <i className="arrow down"></i>
            </div>
            <div className="accordion-content" ref={contentRef}>
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
            </div>
          </div>
          {/* === End Accordion === */}

        </div>
      </div>
    </section>
  );
};

export default About;
