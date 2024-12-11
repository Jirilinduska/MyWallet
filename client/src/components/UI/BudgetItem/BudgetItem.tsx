import { Link } from "react-router-dom"
import { useUserContext } from "../../../context/UserContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { IBudget } from "../../../utils/interfaces/interfaces"
import { useEffect } from "react"


export interface BudgetItemProps {
    budgetData: IBudget
}

const BudgetItem = ({ budgetData } : BudgetItemProps ) => {

    const { refreshUserData, userCurrency, userLangID } = useUserContext()

    const monthName = getMonthName(budgetData.year, budgetData.month, userLangID)

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [])

  return (
    <div className="ring-2 ring-black p-4" key={budgetData._id}>
        
        <h3 className="mb-4">{`${monthName} (${budgetData.year})`}</h3>

        <div className="flex items-center justify-center gap-2 mb-4">
            <p className="">{formatLang(userLangID, "Naplánováno", "Planned")}</p>
            <span className="">{formatCurrency(budgetData.totalPricePlanned, userCurrency)}</span>
        </div>

        <Link to={`/dashboard/planner/preview-budget/${budgetData._id}`} className="text-colorBlue underline underline-offset-2">{formatLang(userLangID, "Detail", "Detail")}</Link>

    </div>
  )
}

export default BudgetItem