import { useOverviewData } from "../../../context/OverviewDataContext"
import YearNavigator from "../../../components/UI/YearNavigator/YearNavigator"
import LastTransaction from "../../Common/LastTransaction/LastTransaction"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import SpeedDial from "../../../components/SpeedDial/SpeedDial"
import MonthNavigator from "../../../components/UI/DateStuff/MonthNavigator/MonthNavigator"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { useUserContext } from "../../../context/UserContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { useUtilsContext } from "../../../context/UtilsContext"
import { IconClose, IconMenu } from "../../../utils/icons/icons"

interface TopBarProps {
    showYearNavigator: boolean
    showMonthNavigator : boolean
    pageID?: string
}

const TopBar = ({ showYearNavigator, showMonthNavigator, pageID } : TopBarProps ) => {

    const { overviewData } = useOverviewData()
    const { date } = useTransactionsContext()
    const { userLangID } = useUserContext()
    const { showNav, toggleNav } = useUtilsContext()

    if(!overviewData) return <div className="">NoData</div>

  return (
    <div className="py-4 px-4 mb-10 flex items-center gap-10 fixed top-0 left-0 lg:left-[250px] w-full lg:w-[calc(100%-250px)] bg-white z-10 shadow-lg">

        <div className="flex-1 xl:flex-grow-0">

            {/* Navigace roků */}
            { showYearNavigator && <YearNavigator />  }

            {/* Navigace měsíců */}
            { showMonthNavigator && pageID && <MonthNavigator monthName={getMonthName(date.year, date.month, userLangID)} pageID={pageID} /> }
        </div>

        {/* Poslední transakce */}
        <div className="hidden xl:flex items-center gap-6 flex-1">
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

        <div onClick={toggleNav} className="lg:hidden cursor-pointer">
            { showNav ? <IconClose className="icon"/> : <IconMenu className="icon"/> }
        </div>

        {/* // TODO Zobrazení dnešního dne a času */}
        {/* <CurrentTime/> */}
        {/* // TODO Tlačítko pro přepnutí tmavého/světlého režimu */}

</div>
  )
}

export default TopBar