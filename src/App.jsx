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
      alert("Menyimpan perubahan ke server... Ini mungkin memakan waktu beberapa saat jika ada file baru.");

      let dataToPatch = JSON.parse(JSON.stringify(updatedData));

      const uploadAssetIfNeeded = async (assetData, assetType = 'file', filename) => {
        if (typeof assetData === 'string' && assetData.startsWith('blob:')) {
          const blob = await fetch(assetData).then(res => res.blob());
          const asset = await sanityClient.assets.upload(assetType, blob, { filename });
          return { _type: assetType, asset: { _type: 'reference', _ref: asset._id } };
        }
        return assetData;
      };
      
      dataToPatch.profile.profileImage = await uploadAssetIfNeeded(dataToPatch.profile.profileImage, 'image');
      dataToPatch.about.profileImage2 = await uploadAssetIfNeeded(dataToPatch.about.profileImage2, 'image');
      dataToPatch.profile.cv = await uploadAssetIfNeeded(dataToPatch.profile.cv, 'file', 'CV_Dwi_Purba.pdf');

      if (dataToPatch.portfolio.items) {
        await Promise.all(dataToPatch.portfolio.items.map(async (item) => {
          item.image = await uploadAssetIfNeeded(item.image, 'image');
          item.downloadableImage = await uploadAssetIfNeeded(item.downloadableImage, 'file');
        }));
      }

      const patches = Object.keys(dataToPatch).map(sectionKey => {
        const sectionData = dataToPatch[sectionKey];
        if (sectionData && sectionData._id) {
          const {_id, _createdAt, _rev, _updatedAt, _type, ...restOfData} = sectionData;
          return { patch: { id: _id, set: restOfData } };
        }
        return null;
      }).filter(Boolean);

      if (patches.length > 0) {
        await sanityClient.mutate(patches);
      }
      
      alert('Data berhasil diperbarui di Sanity!');
      window.location.reload();

    } catch (err) {
      console.error('Oh no, the update failed: ', err);
      alert('Gagal memperbarui data. Lihat console untuk detail.');
    }
  };

  const handleNewMessage = (message) => {
    const contactDocId = data.contact._id;
    
    sanityClient
      .patch(contactDocId)
      .setIfMissing({messages: []})
      .append('messages', [message])
      .commit({autoGenerateArrayKeys: true})
      .then((updatedDoc) => {
        alert('Pesan Anda berhasil terkirim!');
        setData(prevData => ({...prevData, contact: updatedDoc}));
      })
      .catch(err => {
        console.error('Gagal mengirim pesan:', err);
        alert('Gagal mengirim pesan.');
      });
  };

  // --- PERBAIKAN: Menggunakan messageKey untuk menghapus ---
  const handleDeleteMessage = (messageKey) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      const contactDocId = data.contact._id;
      // Menghapus item dari array 'messages' berdasarkan _key-nya
      sanityClient
        .patch(contactDocId)
        .unset([`messages[_key=="${messageKey}"]`])
        .commit()
        .then(updatedDoc => {
           alert('Pesan berhasil dihapus.');
           // Perbarui state lokal agar UI langsung update
           setData(prevData => ({...prevData, contact: updatedDoc}));
        })
        .catch(err => {
            console.error('Gagal menghapus pesan:', err);
            alert('Gagal menghapus pesan.');
        });
    }
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
