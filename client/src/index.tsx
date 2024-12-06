import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>

    <CategoriesProvider>

      <App />

    </CategoriesProvider>
    
  </React.StrictMode>
)