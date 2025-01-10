import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext'
import { UserProvider } from './context/UserContext'
import { BudgetProvider } from './context/BudgetsContext'
import { TransactionsProvider } from './context/TransactionsContext'
import { OverviewDataProvider } from './context/OverviewDataContext'
import { UtilsProvider } from './context/UtilsContext'
import { GoalsProvider } from './context/GoalsContext'
import { AuthProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>

    <UserProvider>
      <AuthProvider>
        <OverviewDataProvider>
          <CategoriesProvider>
            <BudgetProvider>
              <TransactionsProvider>
                <UtilsProvider>
                  <GoalsProvider>

                      <App />
                  
                    </GoalsProvider>
                  </UtilsProvider>
              </TransactionsProvider>
            </BudgetProvider>
          </CategoriesProvider>
        </OverviewDataProvider>
      </AuthProvider>
    </UserProvider>
    
  </React.StrictMode>
)