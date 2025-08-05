// src/App.jsx

import { useState, useEffect } from 'react';
import { initialData } from './data/initialData';
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
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isLoginVisible, setIsLoginVisible] = useState(false);

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

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

  const handleUpdate = (updatedData) => {
    setData(updatedData);
    alert('Data berhasil diperbarui secara permanen di browser ini!');
  };

  const handleNewMessage = (message) => {
    setData(prevData => {
      const messages = prevData.contact.messages || [];
      const newData = {
        ...prevData,
        contact: {
          ...prevData.contact,
          messages: [...messages, message]
        }
      };
      return newData;
    });
  };

  const handleDeleteMessage = (messageIndex) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      setData(prevData => {
        const newMessages = [...prevData.contact.messages];
        newMessages.splice(messageIndex, 1);
        return {
          ...prevData,
          contact: {
            ...prevData.contact,
            messages: newMessages
          }
        };
      });
    }
  };

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