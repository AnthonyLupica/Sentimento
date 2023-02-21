/*
 * index.js is the main entry point for react js. 
 * It renders the root component of the application, which 
 * is the starting point for the entire component hierarchy.
 * 
 * In this case <App /> is the parent component to all other components 
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
  <React.StrictMode>
        <App />
  </React.StrictMode>
);
