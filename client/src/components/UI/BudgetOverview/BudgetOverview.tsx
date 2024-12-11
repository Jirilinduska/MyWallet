import { IBudget } from "../../../utils/interfaces/interfaces"
import BudgetItem from "../BudgetItem/BudgetItem"

export interface BudgetOverviewProps {
    budgets: IBudget[]
}

const BudgetOverview = ({ budgets } : BudgetOverviewProps ) => {

  return (
    <div className="flex items-center justify-start flex-wrap my-10 gap-4">
        { budgets.length > 0 && budgets.map((x) => <BudgetItem key={x._id} budgetData={x} /> )}
    </div>
  )
}

export default BudgetOverview