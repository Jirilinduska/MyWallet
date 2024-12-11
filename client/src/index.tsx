import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext'
import { UserProvider } from './context/UserContext'
import { BudgetProvider } from './context/BudgetsContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>

    <UserProvider>
    <CategoriesProvider>
    <BudgetProvider>

        <App />

    </BudgetProvider>
    </CategoriesProvider>
    </UserProvider>
    
  </React.StrictMode>
)