import { Link } from "react-router-dom"
import { useUserContext } from "../../../context/UserContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { IGetBudget } from "../../../utils/interfaces/interfaces"
import { useEffect } from "react"

// TODO - Změnit UI!

export interface BudgetItemProps {
    budgetData: IGetBudget
}

const BudgetItem = ({ budgetData } : BudgetItemProps ) => {

    const { refreshUserData, userCurrency, userLangID } = useUserContext()

    const monthName = getMonthName(budgetData.year, budgetData.month, userLangID)

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [])

  return (
    <Link to={`/dashboard/planner/preview-budget/${budgetData._id}`}  className="w-[250px] p-4 rounded-md cursor-pointer bg-white shadow hover:shadow-lg hover:bg-gray-100" key={budgetData._id}>
        
        <h3 className="mb-4 font-semibold">{`${monthName} (${budgetData.year})`}</h3>

        <div className="flex items-center justify-start gap-2 mb-4">
            <p className="">{formatLang(userLangID, "Naplánováno", "Planned")}</p>
            <span className="">{formatCurrency(budgetData.totalPricePlanned, userCurrency)}</span>
        </div>

        <p className="text-colorBlue underline underline-offset-2">{formatLang(userLangID, "Detail", "Detail")}</p>

    </Link>
  )
}

export default BudgetItem