import { useEffect } from "react"
import { COLOR_BLUE, SIZE_ROW } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { IGetBudget } from "../../../utils/interfaces/interfaces"
import InfoItem from "../InfoItem/InfoItem"
import { IconChart } from "../../../utils/icons/icons"
import { Link } from "react-router-dom"
import { getMonthName } from "../../../utils/functions/dateUtils"

export interface BudgetOverviewProps {
    budgets: IGetBudget[]
}

const BudgetOverview = ({ budgets } : BudgetOverviewProps ) => {

  const { userLangID } = useUserContext()

  return (
    <div className="w-1/2 mx-auto">

        { budgets.length > 0 && budgets.map((x) => {

            const monthName = getMonthName(x.year, x.month, userLangID)

          return (
            <Link 
              key={x._id}
              to={`/dashboard/planner/preview-budget/${x._id}`}
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
              />
            </Link>
          )
        })}
    </div>
  )
}

export default BudgetOverview