import { Link } from "react-router-dom"
import ProgressRadius from "../../UI/ProgressRadius/ProgressRadius"
import { useOverviewData } from "../../../context/OverviewDataContext"
import { useEffect } from "react"
import { useUserContext } from "../../../context/UserContext"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import ExpenseInfo from "../../UI/ExpenseInfo/ExpenseInfo"


// TODO - Upravit celou home page style!

const HeroLogged = () => {

  const { refreshOverviewData, overviewData } = useOverviewData()
  const { userCurrency, refreshUserData, userLangID } = useUserContext()
  const { categoriesIncome, categoriesTransactions, refreshCategories } = useCategoriesContext()

  useEffect(() => {
    const yearNow = new Date().getFullYear()
    const monthNow = new Date().getMonth() + 1
    if(!overviewData) refreshOverviewData(yearNow, monthNow)
    if(!userCurrency) refreshUserData()
    refreshCategories()
    console.log(categoriesIncome)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full w-full">

      { overviewData && (
        <div className="flex flex-col items-center justify-between gap-10 xl:flex-row">

          <ProgressRadius actualPrice={overviewData.monthTotalExpense} plannedPrice={overviewData.monthBudget}/>

          <ExpenseInfo overviewData={overviewData}/>

        </div>
      )}

      <Link to="/dashboard/overview" className="button-blue">Dashboard</Link>

    </div>
  )
}

export default HeroLogged