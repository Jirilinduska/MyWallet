import { useOverviewData } from "../../../context/OverviewDataContext"
import YearNavigator from "../../UI/YearNavigator/YearNavigator"
import LastTransaction from "../../UI/LastTransaction/LastTransaction"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import SpeedDial from "../../UI/SpeedDial/SpeedDial"
import MonthNavigator from "../../UI/MonthNavigator/MonthNavigator"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { useUserContext } from "../../../context/UserContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { useUtilsContext } from "../../../context/UtilsContext"
import { IconClose, IconMenu } from "../../../utils/icons/icons"
import { useCompleteProfile } from "../../../hooks/useCompleteProfile"

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

    useCompleteProfile()

  return (
    <div className="animate-fadeInDown py-4 px-4 mb-10 flex items-center gap-10 fixed top-0 left-0 lg:left-[250px] w-full lg:w-[calc(100%-250px)] bg-white z-10 shadow-lg">

        <div className="flex-1 xl:flex-grow-0">

            {/* Navigace roků */}
            { showYearNavigator && <YearNavigator />  }

            {/* Navigace měsíců */}
            { showMonthNavigator && pageID && <MonthNavigator monthName={getMonthName(date.year, date.month, userLangID)} pageID={pageID} /> }
        </div> 

        {/* Poslední transakce */}
        <div className="hidden xl:flex items-center gap-6 flex-1">
            { overviewData && overviewData.lastExpense && (
                <LastTransaction
                    iconID={overviewData.lastExpenseCategory.iconID}
                    name={overviewData.lastExpenseCategory.name}
                    date={overviewData.lastExpense.createdAt}
                    amount={overviewData.lastExpense.amount}
                    type={CATEGORY_ID_TRANSACTION}
                    fullWidth={false}
                />
            )}

            { overviewData && overviewData.lastIncome && (
                <LastTransaction
                    iconID={overviewData.lastIncomeCategory.iconID}
                    name={overviewData.lastIncomeCategory.name}
                    date={overviewData.lastIncome.createdAt}
                    amount={overviewData.lastIncome.amount}
                    type={CATEGORY_ID_INCOME}
                    fullWidth={false}
                />
            )}
        </div>

        <SpeedDial/>

        <div onClick={toggleNav} className="lg:hidden cursor-pointer">
            { showNav ? <IconClose className="icon"/> : <IconMenu className="icon"/> }
        </div>

</div>
  )
}

export default TopBar