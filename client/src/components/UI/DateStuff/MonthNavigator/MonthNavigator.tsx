import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../../config/globals"
import { IconNext, IconPrev } from "../../../../utils/icons/icons"
import { IMonthNavigator } from "../../../../utils/interfaces/interfaces"

const MonthNavigator: React.FC<IMonthNavigator> = ({ pageID, handlePrevMonth, handleNextMonth, monthName, year, month, fetchTransData, fetchIncomeData  }) => {
  return (
    <div className='flex items-center gap-4'>
        
        <IconPrev 
            onClick={ () => {
                handlePrevMonth()
                { pageID === PAGE_ID_TRANSACTIONS && fetchTransData() }
                { pageID === PAGE_ID_INCOME && fetchIncomeData() }
            }} 
            className="icon" 
        />

        <p className="font-semibold">{monthName} {year}</p>

        <IconNext 
            onClick={ () => {
                handleNextMonth()
                { pageID === PAGE_ID_TRANSACTIONS && fetchTransData() }
                { pageID === PAGE_ID_INCOME && fetchIncomeData() }
            }} 
            className={`${ month > new Date().getMonth() && "hidden" } icon`} 
        />

    </div>
  )
}

export default MonthNavigator