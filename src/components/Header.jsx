// src/components/Header.jsx

import React, { useEffect } from 'react';
import { urlFor, fileUrlFor } from '../sanityClient';

const Header = ({ data }) => {
  const handleMenuToggle = () => {
    document.body.classList.toggle('mobile-nav-active');
    document.getElementById('MenuBtn').classList.toggle('fa-xmark');
  };

  const openMultiLinks = (urls) => {
    urls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank');
      }, index * 200);
    });
  };

  // --- LOGIKA BARU UNTUK NAVIGASI AKTIF SAAT SCROLL ---
  useEffect(() => {
      const navLinks = document.querySelectorAll('nav ul li a');
      const sections = document.querySelectorAll('section');

      const handleScroll = () => {
          const scrollPos = window.scrollY + 200; // +200 agar lebih akurat di tengah layar
          sections.forEach(section => {
              if (scrollPos > section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                  navLinks.forEach(link => {
                      link.classList.remove('active');
                      if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                          link.classList.add('active');
                      }
                  });
              }
          });
      };

      window.addEventListener('scroll', handleScroll);
      // Membersihkan event listener saat komponen tidak lagi digunakan
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // --- AKHIR LOGIKA BARU ---

  return (
    <>
      <i className="fa-solid fa-bars" id="MenuBtn" onClick={handleMenuToggle}></i>
      <header>
        <div className="profile">
          {data?.profileImage && (
            <img src={urlFor(data.profileImage).width(150).url()} alt="Profile" />
          )}
          <h1>{data?.name}</h1>
          <div className="social-icons">
            <a href="#" onClick={(e) => { e.preventDefault(); openMultiLinks(data?.githubUrls || []); }} rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href={data?.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          <a className="btn-color-1" href={data?.cv ? fileUrlFor(data.cv) : '#'} download>Download CV</a>
        </div>
        <nav>
          <ul>
            <li><a href="#home" className="active"><i className="fa-solid fa-house"></i>Home</a></li>
            <li><a href="#about"><i className="fa-solid fa-user"></i>About Me</a></li>
            <li><a href="#resume"><i className="fa-solid fa-briefcase"></i>Resume</a></li>
            <li><a href="#skill"><i className="fa-solid fa-cogs"></i>Skills</a></li>
            <li><a href="#portfolio"><i className="fa-solid fa-server"></i>Portfolio</a></li>
            <li><a href="#contact"><i className="fa-solid fa-envelope"></i>Contact Me</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
