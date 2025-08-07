// src/components/Login.jsx

import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa'; // <-- 1. IMPORT IKON

const Login = ({ onLogin, onShowLogin, onCloseLogin, isVisible }) => {
 const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
  e.preventDefault();
  onLogin(password);
 };
 
 const loginPopupStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '20px',
  backgroundColor: 'var(--whiteColor)',
  border: '1px solid var(--borderColor)',
  borderRadius: '8px',
  boxShadow: '0 4px 8px var(--boxShadowColor)',
  zIndex: 1000,
  color: 'var(--headingColor)'
 };

 // <-- 2. UBAH STYLE UNTUK TOMBOL IKON
 const loginTriggerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '45px', // Menetapkan lebar
  height: '45px', // Menetapkan tinggi
  backgroundColor: 'var(--whiteColor)',
  border: '1px solid var(--borderColor)',
  borderRadius: '50%', // Membuatnya menjadi bulat
  boxShadow: '0 4px 8px var(--boxShadowColor)',
  zIndex: 1000,
  cursor: 'pointer',
  color: 'var(--headingColor)',
  display: 'flex', // Menggunakan flexbox untuk centering
  alignItems: 'center', // Centering vertikal
  justifyContent: 'center' // Centering horizontal
 };

 const inputStyle = { padding: '8px', marginRight: '8px', border: '1px solid var(--borderColor)', borderRadius: '4px' };
 const buttonStyle = { padding: '8px 12px', border: 'none', backgroundColor: 'var(--themeColor)', color: 'white', borderRadius: '4px', cursor: 'pointer' };
 const closeButtonStyle = { position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--textColor)' };

 if (!isVisible) {
  return (
   // <-- 3. GUNAKAN IKON, BUKAN TEKS
   <div onClick={onShowLogin} style={loginTriggerStyle} title="Admin Login">
    <FaUserShield size={20} /> 
   </div>
  );
 }

 return (
  <div style={loginPopupStyle}>
   <button onClick={onCloseLogin} style={closeButtonStyle}>×</button>
   <h4 style={{marginTop: 0, marginBottom: '15px'}}>Admin Login</h4>
   <form onSubmit={handleSubmit}>
    <input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     style={inputStyle}
    />
    <button type="submit" style={buttonStyle}>Login</button>
   </form>
  </div>
 );
};

export default Login;