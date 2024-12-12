import { IBudget, IGetBudget } from "../../../utils/interfaces/interfaces"
import BudgetItem from "../BudgetItem/BudgetItem"

export interface BudgetOverviewProps {
    budgets: IGetBudget[]
}

const BudgetOverview = ({ budgets } : BudgetOverviewProps ) => {

  return (
    // TODO - třídit od nejmenšího měsíce a rok až po nejvyšší :)
    <div className="flex items-center justify-center flex-wrap my-10 gap-4">
        { budgets.length > 0 && budgets.map((x) => <BudgetItem key={x._id} budgetData={x} /> )}
    </div>
  )
}

export default BudgetOverview