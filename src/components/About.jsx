import React, { useState, useRef, useEffect } from 'react';
import SubSectionHeading from './SubSectionHeading';
import { urlFor } from '../sanityClient';

const About = ({ data }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const personalInfo = data?.personalInfo || [];
  const midpoint = Math.ceil(personalInfo.length / 2);
  const firstHalf = personalInfo.slice(0, midpoint);
  const secondHalf = personalInfo.slice(midpoint);

  // Untuk animasi height
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = open
        ? `${contentRef.current.scrollHeight}px`
        : '0px';
    }
  }, [open]);

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

          {/* === Accordion Header === */}
          <button
            className={`accordion-header ${open ? 'active' : ''}`}
            onClick={() => setOpen(prev => !prev)}
          >
            <span>{open ? 'Hide Details' : 'Show Details'}</span>
            <i className="arrow down"></i>
          </button>

          {/* === Accordion Content === */}
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
          {/* === End Accordion === */}

        </div>
      </div>
    </section>
  );
};

export default About;
