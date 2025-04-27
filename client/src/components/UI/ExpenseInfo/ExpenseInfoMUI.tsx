import { Box, Container, Typography } from "@mui/material";
import { useCategoriesContext } from "../../../context/CategoriesContext";
import { useUserContext } from "../../../context/UserContext";
import Loader from "../Loader/Loader";
import LastTransactionMUI from "../LastTransaction/LastTransactionMUI";
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, TODAY_TRANSACTION } from "../../../config/globals";
import { formatLang } from "../../../utils/functions/formatLang";
import { useEffect, useState } from "react"
import { handleGetLastTransactions } from "../../../API/Transactions"
import { ITodayData } from "../../../utils/interfaces/interfaces"

const ExpenseInfoMUI = () => {
  const { userLangID } = useUserContext();
  const { categoriesTransactions } = useCategoriesContext()

  const [data, setData] = useState<ITodayData | null>(null)
  const [loading, setLoading] = useState(false)

  const toggleLoading = () => setLoading(prev => !prev)

  useEffect(() => {
    const fetchData = async() => {
      toggleLoading()
      const response = await handleGetLastTransactions()
      setData(response)
      toggleLoading()
    }
    fetchData()
  }, [])

  return (
    <Container>
      {loading && <Loader wantFullSize={false} />}

      {data && (
        <>
          <Box width={{ xs: "100%", md: "60%" }} mx="auto" mb={6}>

            <Typography textAlign={{ xs: "center", md: "left" }} mb={2} variant="h6" fontWeight={600}>{formatLang(userLangID, "Poslední transakce", "Last transactions")}</Typography>

            {data.lastExpense && (
              <LastTransactionMUI
                amount={data.lastExpense.amount}
                date={data.lastExpense.createdAt}
                iconID={data.lastExpenseCategory.iconID}
                name={data.lastExpenseCategory.name}
                type={CATEGORY_ID_TRANSACTION}
              />
            )}

            {data.lastIncome && (
              <LastTransactionMUI
                amount={data.lastIncome.amount}
                date={data.lastIncome.createdAt}
                iconID={data.lastIncomeCategory.iconID}
                name={data.lastIncomeCategory.name}
                type={CATEGORY_ID_INCOME}
              />
            )}

            {!data.lastExpense && (
              <div className="text-gray-500 text-center text-sm font-semibold">
                {formatLang(
                  userLangID,
                  "Zatím žádné transakce",
                  "No transactions yet"
                )}
              </div>
            )}
          </Box>

          <Box width={{ xs: "100%", md: "60%" }} mx="auto">

            <Typography textAlign={{ xs: "center", md: "left" }} variant="h6" mb={2} fontWeight={600}>{formatLang(userLangID, "Dnešní výdaje", "Today's expense")}</Typography>
            
            <div className={`${ !data.todayExpense.length || "h-[250px] overflow-y-auto" } space-y-2`}>
                    { data.todayExpense && data.todayExpense.map( (x) => {

                        const category = categoriesTransactions.find( (cat) => cat._id ===  x.category)

                      return (
                        <LastTransactionMUI
                          amount={x.amount}
                          date={x.createdAt}
                          name={category?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")}
                          iconID={category?.iconID || 0}
                          type={TODAY_TRANSACTION}
                          key={x._id}
                        />
                      )
                    })}

                    { !data.todayExpense.length && <div className="text-gray-500 text-center text-sm font-semibold">{formatLang(userLangID, "Dnes žádné transakce", "No transactions today")}</div>}
                </div>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ExpenseInfoMUI;
