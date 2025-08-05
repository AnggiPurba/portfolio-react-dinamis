// src/components/Home.jsx

import React from 'react';
import { ReactTyped } from 'react-typed';

const Home = ({ data }) => {
  // --- PERBAIKAN: Tambahkan safeguard di sini ---
  // Pastikan data.titles adalah sebuah array sebelum digunakan.
  const titlesToType = Array.isArray(data?.titles) ? data.titles : [];
  // --- AKHIR PERBAIKAN ---

  return (
    <section id="home">
      <div className="home-row">
        <h1>
          {data.greeting}<span>,</span> I am <br />
          {data.name}
          <span>.</span>
        </h1>
        <p>
          <span className="auto-input">
            <ReactTyped
              strings={titlesToType} // Gunakan variabel yang aman
              typeSpeed={100}
              backSpeed={50}
              loop
            />
          </span>
          <br />
          {data.location}
        </p>
      </div>
    </section>
  );
};

export default Home;