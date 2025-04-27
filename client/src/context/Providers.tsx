import { CategoriesProvider } from "./CategoriesContext";
import { UserProvider } from "./UserContext";
import { TransactionsProvider } from "./TransactionsContext";
import { UtilsProvider } from "./UtilsContext";
import { AuthProvider } from "./AuthContext";
import { NotifProvider } from "./NotifContext";
import { RefetchProvider } from "./RefetchContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RefetchProvider>
      <UserProvider>
        <AuthProvider>
          <NotifProvider>
            <CategoriesProvider>
              <TransactionsProvider>
                <UtilsProvider>{children}</UtilsProvider>
              </TransactionsProvider>
            </CategoriesProvider>
          </NotifProvider>
        </AuthProvider>
      </UserProvider>
    </RefetchProvider>
  );
};
