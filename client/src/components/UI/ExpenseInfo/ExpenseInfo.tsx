import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, COLOR_BLUE, SIZE_ROW } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { useOverviewData } from "../../../context/OverviewDataContext"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { categoryIcons } from "../../../utils/icons/category-icons"
import LastTransaction from "../../LastTransaction/LastTransaction"
import InfoItem from "../InfoItem/InfoItem"

const ExpenseInfo = () => {

    const { userLangID } = useUserContext()
    const { categoriesTransactions } = useCategoriesContext()
    const { overviewData } = useOverviewData()

  return (
    <div className="shadow-lg rounded-lg w-full p-4">

        <div className="space-y-2">

            { overviewData?.lastExpense && (
              <LastTransaction
                amount={overviewData.lastExpense.amount}
                date={overviewData.lastExpense.createdAt}
                iconID={overviewData.lastExpenseCategory.iconID}
                name={overviewData.lastExpenseCategory.name}
                type={CATEGORY_ID_TRANSACTION}
              />
            )}

            { overviewData?.lastIncome && (
              <LastTransaction
                amount={overviewData.lastIncome.amount}
                date={overviewData.lastIncome.createdAt}
                iconID={overviewData.lastIncomeCategory.iconID}
                name={overviewData.lastIncomeCategory.name}
                type={CATEGORY_ID_INCOME}
              />
            )}

            { !overviewData?.lastExpense && <p className="text-gray-500 text-center font-semibold">{formatLang(userLangID, "Zatím žádné transakce", "No transactions yet")}</p> }

        </div>

        <div className="my-4">
                <h3 className="font-semibold text-lg mb-2">Dnešní transakce</h3>

                <div className="">
                    { overviewData?.todayExpense && overviewData.todayExpense.map( (x) => {

                        const category = categoriesTransactions.find( (cat) => cat._id ===  x.category)

                      return (
                        <InfoItem
                          key={x._id}
                          amount={x.amount}
                          color={COLOR_BLUE}
                          desc={category?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")}
                          icon={categoryIcons.find((icon) => icon.id === overviewData.lastExpenseCategory.iconID)?.iconJSX || null}
                          plannedAmount={null}
                          size={SIZE_ROW}
                          formatToCurrency={true}

                        />
                      )
                    })}

                    { !overviewData?.todayExpense?.length && <p className="text-gray-500 text-center font-semibold">{formatLang(userLangID, "Dnes žádné transakce", "No transactions today")}</p>}
                </div>
            </div>

    </div>
  )
}

export default ExpenseInfo