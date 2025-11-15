import React from 'react';
import ReactDOM from 'react-dom/client';
// Load compiled Tailwind output plus small global overrides
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
