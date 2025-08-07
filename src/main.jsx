// src/main.jsx atau src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ParallaxProvider } from 'react-scroll-parallax'; // <-- 1. IMPORT

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ParallaxProvider> {/* <-- 2. BUNGKUS APP DENGAN PROVIDER */}
      <App />
    </ParallaxProvider>
  </React.StrictMode>
);