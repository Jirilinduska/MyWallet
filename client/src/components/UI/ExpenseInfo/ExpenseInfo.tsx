import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, TODAY_TRANSACTION } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { useOverviewData } from "../../../context/OverviewDataContext"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import LastTransaction from "../LastTransaction/LastTransaction"
import Loader from "../Loader/Loader"

const ExpenseInfo = () => {

    const { userLangID } = useUserContext()
    const { categoriesTransactions } = useCategoriesContext()
    const { overviewData, loading } = useOverviewData()

  return (
    <div className="shadow-lg rounded-lg w-[95%] sm:w-[400px] md:w-[500px] flex flex-col items-center p-4">

        <h3 className="font-semibold text-base mb-2">{formatLang(userLangID, "Poslední transakce", "Last transactions")}</h3>

        <div className="space-y-2 w-full">

            { loading && <Loader wantFullSize={false}/> }

            { overviewData?.lastExpense && (
              <LastTransaction
                amount={overviewData.lastExpense.amount}
                date={overviewData.lastExpense.createdAt}
                iconID={overviewData.lastExpenseCategory.iconID}
                name={overviewData.lastExpenseCategory.name}
                type={CATEGORY_ID_TRANSACTION}
                fullWidth={true}
              />
            )}

            { overviewData?.lastIncome && (
              <LastTransaction
                amount={overviewData.lastIncome.amount}
                date={overviewData.lastIncome.createdAt}
                iconID={overviewData.lastIncomeCategory.iconID}
                name={overviewData.lastIncomeCategory.name}
                type={CATEGORY_ID_INCOME}
                fullWidth={true}
              />
            )}

            { !overviewData?.lastExpense && <p className="text-gray-500 text-center text-sm font-semibold">{formatLang(userLangID, "Zatím žádné transakce", "No transactions yet")}</p> }

        </div>

        <div className="my-10 w-full">
                <h3 className="font-semibold text-base mb-2 text-center">{formatLang(userLangID, "Dnešní výdaje", "Today's expense")}</h3>

                <div className={`${ !overviewData?.todayExpense?.length || "h-[200px] overflow-y-auto" } space-y-2`}>
                    { overviewData?.todayExpense && overviewData.todayExpense.map( (x) => {

                        const category = categoriesTransactions.find( (cat) => cat._id ===  x.category)

                      return (
                        <LastTransaction
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
            </div>

    </div>
  )
}

export default ExpenseInfo