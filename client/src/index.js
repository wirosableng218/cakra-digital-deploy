import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Pricing from './Pricing';
import Consultation from './Consultation';
import Tentang from './Tentang';
import SEO from './SEO';
import Client from './client';
import Portfolio from './Portfolio';
import PaymentComponent from './components/PaymentComponent';
import ChatWidget from './ChatWidget';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Apply saved mode and theme before rendering
try {
  const savedMode = localStorage.getItem('mode') || 'light';
  document.documentElement.setAttribute('data-mode', savedMode);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', 'brand');
  }
} catch {
  document.documentElement.setAttribute('data-mode', 'light');
  document.documentElement.setAttribute('data-theme', 'brand');
}

// Helper function to calculate contrasting text color
function getContrastingTextColor(backgroundColor) {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return contrasting color based on luminance
  return luminance > 0.5 ? '#111827' : '#f8fafc';
}

// Helper function to update text contrast based on theme
function updateTextContrast(theme) {
  const root = document.documentElement;
  const themeColors = {
    'brand': '#22c55e',
    'whatsapp': '#22c55e', 
    'instagram': '#e1306c',
    'linkedin': '#0a66c2'
  };
  
  const themeColor = themeColors[theme] || themeColors['brand'];
  const contrastingText = getContrastingTextColor(themeColor);
  
  // Update theme contrast variable for better text visibility
  root.style.setProperty('--theme-text-contrast', contrastingText);
  
  // Ensure theme elements have proper contrast
  const themeElements = document.querySelectorAll('.service-card h3, .services h2, .contact h2');
  themeElements.forEach(el => {
    el.style.color = `var(--theme)`;
    // Add text shadow for better readability on light backgrounds
    if (contrastingText === '#111827') {
      el.style.textShadow = '0 1px 2px rgba(0,0,0,0.1)';
    } else {
      el.style.textShadow = '0 1px 2px rgba(255,255,255,0.1)';
    }
  });
}

// Expose global setters for theme and mode
window.__setAppTheme = function(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch {}
  
  // Update text contrast for better readability
  updateTextContrast(theme);
  
  console.log('Set theme to', theme);
};

window.__setAppMode = function(mode) {
  document.documentElement.setAttribute('data-mode', mode);
  try { localStorage.setItem('mode', mode); } catch {}
  
  // Trigger contrast update for current theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'brand';
  updateTextContrast(currentTheme);
  
  console.log('Set mode to', mode);
};

function GlobalChatWrapper() {
  const location = useLocation();
  const path = (location.pathname || '').toLowerCase();
  const isPayment = /pembayaran|payment|checkout|metode-?pembayaran/.test(path);
  return isPayment ? null : <ChatWidget />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/seo" element={<SEO />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/client" element={<Client />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/payment" element={<PaymentComponent />} />
      </Routes>
      <GlobalChatWrapper />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
