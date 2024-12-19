import { Link } from "react-router-dom"
import ProgressRadius from "../../UI/ProgressRadius/ProgressRadius"
import { useOverviewData } from "../../../context/OverviewDataContext"
import { useEffect } from "react"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { useUserContext } from "../../../context/UserContext"
import HeroTransactionItem from "../../HeroTransactionItem/HeroTransactionItem"
import { formatLang } from "../../../utils/functions/formatLang"
import InfoRow from "../../UI/InfoRow/InfoRow"
import InfoItem from "../../UI/InfoItem/InfoItem"
import { COLOR_INFOITEM_GREEN } from "../../../config/globals"
import { IconExpense } from "../../../utils/icons/icons"


// TODO - Upravit celou home page style!

const HeroLogged = () => {

  const { refreshOverviewData, overviewData } = useOverviewData()
  const { userCurrency, refreshUserData, userLangID } = useUserContext()

  useEffect(() => {
    const yearNow = new Date().getFullYear()
    const monthNow = new Date().getMonth() + 1
    if(!overviewData) refreshOverviewData(yearNow, monthNow)
    if(!userCurrency) refreshUserData()
  }, [])

  console.log(overviewData?.todayExpense)

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full">

      { overviewData && (
        <div className="flex flex-col items-center justify-center gap-10 xl:flex-row">

          <ProgressRadius actualPrice={overviewData.monthTotalExpense} plannedPrice={overviewData.monthBudget}/>

          <div className="shadow-lg rounded-lg w-full sm:w-[500px] p-4">

            <div className="my-4">
                <h3 className="font-semibold text-sm">Poslední výdaj</h3>

                <InfoItem
                  amount={overviewData.lastExpense.amount}
                  color={COLOR_INFOITEM_GREEN}
                  desc={overviewData.lastExpense.category}
                  icon={<IconExpense/>}
                  plannedAmount={null}
                />

                {/* <HeroTransactionItem 
                  amount={overviewData.lastExpense.amount}
                  category={overviewData.lastExpense.category}
                  title={overviewData.lastExpense.title}
                  userCurrency={userCurrency}
                  iconID={overviewData.lastExpenseIconID}
                /> */}
            </div>

            <div className="my-4">
                <h3 className="font-semibold text-sm">Dnešní transakce</h3>

                <div className="">
                    { overviewData.todayExpense && overviewData.todayExpense.map( (x) => {
                      return (
                        <HeroTransactionItem
                          key={x._id}
                          amount={x.amount}
                          category={x.category}
                          title={x.title}
                          iconID={1} // TODO Přidat be logiku
                          userCurrency={userCurrency}
                        />
                      )
                    })}

                    { !overviewData.todayExpense && <p className="text-gray-500 font-semibold">{formatLang(userLangID, "Dnes žádné transakce", "No transactions today")}</p>}
                </div>
            </div>
          </div>


        </div>
      )}

      <Link to="/dashboard/overview" className="button-blue">Dashboard</Link>

    </div>
  )
}

export default HeroLogged