import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 1. Import ParallaxProvider dari library
import { ParallaxProvider } from 'react-scroll-parallax';

// Render aplikasi Anda ke dalam DOM
createRoot(document.getElementById('root')).render(
 <StrictMode>
    {/* 2. Bungkus komponen <App /> dengan <ParallaxProvider> */}
  <ParallaxProvider>
   <App />
  </ParallaxProvider>
 </StrictMode>,
);