import { useUserContext } from "../../../context/UserContext"
import { IGetBudget } from "../../../utils/interfaces/interfaces"
import { Link } from "react-router-dom"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import InfoItemMUI from "../InfoItem/InfoItemMUI"

export interface BudgetOverviewProps {
    budgets: IGetBudget[]
    isFinished: boolean
}

const BudgetOverview = ({ budgets, isFinished } : BudgetOverviewProps ) => {

  const { userLangID } = useUserContext()

  return (

    <div className="mb-10">

        <h3 className="font-semibold mb-4">
            { isFinished 
              ? formatLang(userLangID, "Uzavřené", "Finished")
              : formatLang(userLangID, "Aktivní", "Active")
            }
        </h3>


        <div className="w-full lg:w-1/2">

            { budgets.map( x => {
              const monthName = getMonthName(x.year, x.month, userLangID)
              const totalPricePlanned = x.budgetCategories.reduce((a,b) => a + b.price, 0)
              return (
                <Link 
                  key={x._id}
                  to={`/dashboard/planner/preview-budget/${x._id}`}
                  className="block w-full mb-4"
                >
                  <InfoItemMUI
                    amount={totalPricePlanned}
                    color="primary"
                    title={`${monthName} (${x.year})`}
                    formatToCurrency={true}
                    isExpense={false}
                  />
                </Link>
              )
            }) }

        </div>

    </div>
  )
}

export default BudgetOverview