// src/App.jsx

import { useState, useEffect } from 'react';
import { client as sanityClient } from './sanityClient';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import ThemeToggleButton from './components/ThemeToggleButton';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

  useEffect(() => {
    const query = `{
      "profile": *[_type == "profile"][0],
      "home": *[_type == "home"][0],
      "about": *[_type == "about"][0],
      "resume": *[_type == "resume"][0],
      "skills": *[_type == "skills"][0],
      "portfolio": *[_type == "portfolio"][0],
      "contact": *[_type == "contact"][0],
      "footer": *[_type == "footer"][0]
    }`;

    sanityClient.fetch(query).then((initialData) => {
      setData(initialData);
    });
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsLoginVisible(false);
    } else {
      alert('Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const transaction = sanityClient.transaction();

      for (const sectionKey in updatedData) {
        const sectionData = updatedData[sectionKey];
        if (sectionData && sectionData._id) {
          const {_id, _createdAt, _rev, _updatedAt, ...restOfData} = sectionData;
          transaction.patch(_id).set(restOfData);
        }
      }

      await transaction.commit();
      
      alert('Data berhasil diperbarui di Sanity!');
      setData(updatedData);

    } catch (err) {
      console.error('Oh no, the update failed: ', err.message);
      alert('Gagal memperbarui data. Lihat console untuk detail.');
    }
  };

  // --- PERBAIKAN: Menghapus parameter yang tidak digunakan ---
  const handleNewMessage = () => {
    alert("Fungsi pengiriman pesan belum terhubung ke backend, pesan tidak akan tersimpan.");
  };

  const handleDeleteMessage = () => {
    alert("Fungsi hapus pesan belum terhubung ke backend.");
  };
  // --- AKHIR PERBAIKAN ---

  if (!data) {
    return <div style={{textAlign: 'center', paddingTop: '50px'}}>Loading Portfolio from Sanity...</div>;
  }
  
  if (isAdmin) {
    return (
      <AdminDashboard
        currentData={data}
        onUpdate={handleUpdate}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        onDeleteMessage={handleDeleteMessage}
      />
    );
  }

  return (
    <>
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      <Header data={data.profile} />
      
      <div className="page-container"> 
        <main>
          <Home data={data.home} />
          <About data={data.about} />
          <Resume data={data.resume} />
          <Skills data={data.skills} />
          <Portfolio data={data.portfolio} />
          <Contact data={data.contact} onNewMessage={handleNewMessage} />
        </main>
        <Footer data={data.footer} />
      </div>

      <Login 
        onLogin={handleLogin}
        isVisible={isLoginVisible}
        onShowLogin={() => setIsLoginVisible(true)}
        onCloseLogin={() => setIsLoginVisible(false)}
      />
    </>
  );
}

export default App;
