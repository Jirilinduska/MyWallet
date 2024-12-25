import { Link } from "react-router-dom"
import ProgressRadius from "../../UI/ProgressRadius/ProgressRadius"
import { useOverviewData } from "../../../context/OverviewDataContext"
import ExpenseInfo from "../../UI/ExpenseInfo/ExpenseInfo"


// TODO - Upravit celou home page style!

const HeroLogged = () => {

  const { overviewData } = useOverviewData()


  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full w-full">

      { overviewData && (
        <div className="flex flex-col items-center justify-between gap-10 xl:flex-row">

          {/* <ProgressRadius actualPrice={overviewData.monthTotalExpense} plannedPrice={overviewData.monthBudget}/> */}

          <ExpenseInfo />

        </div>
      )}

      <Link to="/dashboard/overview" className="button-blue">Dashboard</Link>

    </div>
  )
}

export default HeroLogged