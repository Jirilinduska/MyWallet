import { COLOR_BLUE, COLOR_GREEN, SIZE_ROW } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { IOverviewData } from "../../../utils/interfaces/interfaces"
import InfoItem from "../InfoItem/InfoItem"

interface ExpenseInfoProps {
    overviewData: IOverviewData | null
}

const ExpenseInfo = ({ overviewData } : ExpenseInfoProps ) => {

    const { userLangID } = useUserContext()
    const { categoriesTransactions } = useCategoriesContext()

  return (
    <div className="shadow-lg rounded-lg w-full p-4">

        <div className="my-4">

            <h3 className="font-semibold text-lg mb-2">Poslední výdaj</h3>

            { overviewData?.lastExpense && (
                <InfoItem
                    amount={overviewData.lastExpense.amount}
                    color={COLOR_GREEN}
                    desc={overviewData.lastExpenseCategory.name}
                    icon={categoryIcons.find((icon) => icon.id === overviewData.lastExpenseCategory.iconID)?.iconJSX || null}
                    plannedAmount={null}
                    size={SIZE_ROW}
                    formatToCurrency={true}
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