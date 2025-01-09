
import { COLOR_BLUE, SIZE_ROW } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { IGetBudget } from "../../../utils/interfaces/interfaces"
import InfoItem from "../InfoItem/InfoItem"
import { Link } from "react-router-dom"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { formatLang } from "../../../utils/functions/formatLang"

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

              return (
                <Link 
                  key={x._id}
                  to={`/dashboard/planner/preview-budget/${x._id}`}
                  className="block w-full"
                >
                  
                  <InfoItem
                    amount={x.totalPricePlanned}
                    color={COLOR_BLUE}
                    desc={`${monthName} (${x.year})`}
                    icon={null}
                    plannedAmount={null}
                    size={SIZE_ROW}
                    key={x._id}
                    formatToCurrency={true}
                    spentAmount={null}
                  />
                </Link>
              )
            }) }

        </div>

    </div>
  )
}

export default BudgetOverview