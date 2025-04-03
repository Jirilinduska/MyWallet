import { Box, Container, Typography } from "@mui/material";
import { useCategoriesContext } from "../../../context/CategoriesContext";
import { useOverviewData } from "../../../context/OverviewDataContext";
import { useUserContext } from "../../../context/UserContext";
import Loader from "../Loader/Loader";
import LastTransactionMUI from "../LastTransaction/LastTransactionMUI";
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, TODAY_TRANSACTION } from "../../../config/globals";
import { formatLang } from "../../../utils/functions/formatLang";

const ExpenseInfoMUI = () => {
  const { userLangID } = useUserContext();
  const { categoriesTransactions } = useCategoriesContext();
  const { overviewData, loading } = useOverviewData();

  return (
    <Container sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" } }}>
      {loading && <Loader wantFullSize={false} />}

      {overviewData && (
        <>
          <Box width={{ xs: "100%", md: "48%" }} mx="auto">

            <Typography textAlign={{ xs: "center", md: "left" }} mb={2} variant="h6" fontWeight={600}>{formatLang(userLangID, "Poslední transakce", "Last transactions")}</Typography>

            {overviewData.lastExpense && (
              <LastTransactionMUI
                amount={overviewData.lastExpense.amount}
                date={overviewData.lastExpense.createdAt}
                iconID={overviewData.lastExpenseCategory.iconID}
                name={overviewData.lastExpenseCategory.name}
                type={CATEGORY_ID_TRANSACTION}
                fullWidth={true}
              />
            )}

            {overviewData?.lastIncome && (
              <LastTransactionMUI
                amount={overviewData.lastIncome.amount}
                date={overviewData.lastIncome.createdAt}
                iconID={overviewData.lastIncomeCategory.iconID}
                name={overviewData.lastIncomeCategory.name}
                type={CATEGORY_ID_INCOME}
                fullWidth={true}
              />
            )}

            {!overviewData?.lastExpense && (
              <p className="text-gray-500 text-center text-sm font-semibold">
                {formatLang(
                  userLangID,
                  "Zatím žádné transakce",
                  "No transactions yet"
                )}
              </p>
            )}
          </Box>

          <Box width={{ xs: "100%", md: "48%" }} mx="auto">

            <Typography textAlign={{ xs: "center", md: "left" }} variant="h6" mb={2} fontWeight={600}>{formatLang(userLangID, "Dnešní výdaje", "Today's expense")}</Typography>
            
            <div className={`${ !overviewData?.todayExpense?.length || "h-[250px] overflow-y-auto" } space-y-2`}>
                    { overviewData?.todayExpense && overviewData.todayExpense.map( (x) => {

                        const category = categoriesTransactions.find( (cat) => cat._id ===  x.category)

                      return (
                        <LastTransactionMUI
                          amount={x.amount}
                          date={x.createdAt}
                          name={category?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")}
                          iconID={category?.iconID || 0}
                          type={TODAY_TRANSACTION}
                          key={x._id}
                          fullWidth={true}
                        />
                      )
                    })}

                    { !overviewData?.todayExpense?.length && <p className="text-gray-500 text-center text-sm font-semibold">{formatLang(userLangID, "Dnes žádné transakce", "No transactions today")}</p>}
                </div>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ExpenseInfoMUI;
