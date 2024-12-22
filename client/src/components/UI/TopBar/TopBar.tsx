import { useOverviewData } from "../../../context/OverviewDataContext"
import YearNavigator from "../YearNavigator/YearNavigator"
import LastTransaction from "../../LastTransaction/LastTransaction"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import SpeedDial from "../../SpeedDial/SpeedDial"
import MonthNavigator from "../DateStuff/MonthNavigator/MonthNavigator"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { useUserContext } from "../../../context/UserContext"
import { getMonthName } from "../../../utils/functions/dateUtils"

interface TopBarProps {
    showYearNavigator: boolean
    showMonthNavigator : boolean
    pageID?: string
}

const TopBar = ({ showYearNavigator, showMonthNavigator, pageID } : TopBarProps ) => {

    const { overviewData } = useOverviewData()
    const { date } = useTransactionsContext()
    const { userLangID } = useUserContext()

    if(!overviewData) return <div className="">NoData</div>

  return (
    <div className="py-4 px-4 mb-10 flex items-center gap-10 fixed top-0 left-0 md:left-[250px] w-full md:w-[calc(100%-250px)] bg-white z-10 shadow-lg">
            
        {/* Navigace roků */}
        { showYearNavigator && <YearNavigator />  }

        {/* Navigace měsíců */}
        { showMonthNavigator && pageID && <MonthNavigator monthName={getMonthName(date.year, date.month, userLangID)} pageID={pageID} /> }

        {/* Poslední transakce */}
        <div className="flex items-center gap-6 flex-1">
            { overviewData.lastExpense && (
                <LastTransaction
                    iconID={overviewData.lastExpenseCategory.iconID}
                    name={overviewData.lastExpenseCategory.name}
                    date={overviewData.lastExpense.createdAt}
                    amount={overviewData.lastExpense.amount}
                    type={CATEGORY_ID_TRANSACTION}
                />
            )}

            { overviewData.lastIncome && (
                <LastTransaction
                    iconID={overviewData.lastIncomeCategory.iconID}
                    name={overviewData.lastIncomeCategory.name}
                    date={overviewData.lastIncome.createdAt}
                    amount={overviewData.lastIncome.amount}
                    type={CATEGORY_ID_INCOME}
                />
            )}
        </div>

        {/* Menu pro rychlé vytvoření transakce */}
        <SpeedDial/>

        {/* // TODO Zobrazení dnešního dne a času */}
        {/* <CurrentTime/> */}
        {/* // TODO Tlačítko pro přepnutí tmavého/světlého režimu */}

</div>
  )
}

export default TopBar