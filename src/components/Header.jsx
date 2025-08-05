// src/components/Header.jsx

import React, { useEffect } from 'react';

const Header = ({ data }) => {
  const handleMenuToggle = () => {
    document.body.classList.toggle('mobile-nav-active');
    document.getElementById('MenuBtn').classList.toggle('fa-xmark');
  };

  // --- FUNGSI BARU UNTUK MEMBUKA BANYAK LINK ---
  // Fungsi ini sekarang akan membuka link secara berurutan dengan jeda singkat
  // untuk mencoba menghindari pemblokiran pop-up yang agresif.
  const openMultiLinks = (urls) => {
    urls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank');
      }, index * 200); // Jeda 200ms antar setiap tab
    });
  };
  // --- SAMPAI SINI ---

  useEffect(() => {
      const navLinks = document.querySelectorAll('nav ul li a');
      const sections = document.querySelectorAll('section');

      const handleScroll = () => {
          const scrollPos = window.scrollY + 90;
          sections.forEach(section => {
              if (scrollPos > section.offsetTop && scrollPos < section.offsetHeight) {
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
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <i className="fa-solid fa-bars" id="MenuBtn" onClick={handleMenuToggle}></i>
      <header>
        <div className="profile">
          <img src={data.profileImage} alt="Profile" width="150px" />
          <h1>{data.name}</h1>
          <div className="social-icons">
            {/* --- PERUBAHAN PADA LINK GITHUB --- */}
            {/* Tombol ini sekarang memanggil fungsi openMultiLinks */}
            <a href="#" onClick={(e) => { e.preventDefault(); openMultiLinks(data.githubUrls); }} rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            {/* --- SAMPAI SINI --- */}
            <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          <a className="btn-color-1" href={data.cv} download>Download CV</a>
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