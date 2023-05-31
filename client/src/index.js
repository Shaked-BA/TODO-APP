import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';
import './styles/listHeader.css';
import './styles/listItem.css';
import './styles/auth.css';
import './styles/modal.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
