import { CategoriesProvider } from './CategoriesContext'
import { UserProvider } from './UserContext'
import { BudgetProvider } from './BudgetsContext'
import { TransactionsProvider } from './TransactionsContext'
import { OverviewDataProvider } from './OverviewDataContext'
import { UtilsProvider } from './UtilsContext'
import { GoalsProvider } from './GoalsContext'
import { AuthProvider } from './AuthContext'
import { NotifProvider } from './NotifContext'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <AuthProvider>
        <NotifProvider>
          <OverviewDataProvider>
            <CategoriesProvider>
              <BudgetProvider>
                <TransactionsProvider>
                  <UtilsProvider>
                    <GoalsProvider>
                      {children}
                    </GoalsProvider>
                  </UtilsProvider>
                </TransactionsProvider>
              </BudgetProvider>
            </CategoriesProvider>
          </OverviewDataProvider>
        </NotifProvider>
      </AuthProvider>
    </UserProvider>
  )
}
