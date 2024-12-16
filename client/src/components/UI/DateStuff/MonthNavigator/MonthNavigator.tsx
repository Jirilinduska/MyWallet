import { useTransactionsContext } from "../../../../context/TransactionsContext"
import { IconNext, IconPrev } from "../../../../utils/icons/icons"

export interface MonthNavigatorProps {
    pageID: string | undefined
    monthName: string
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({ pageID, monthName }) => {

    const { date, handleNextMonth, handlePrevMonth } = useTransactionsContext()

  return (
    <div className='flex items-center gap-4'>
        
        <IconPrev 
            onClick={ () => pageID && handlePrevMonth(pageID)} 
            className="icon" 
        />

        <p className="font-semibold">{monthName} {date.year}</p>

        <IconNext 
            onClick={ () => pageID && handleNextMonth(pageID)} 
            className={`${(date.year > new Date().getFullYear() || (date.year === new Date().getFullYear() && date.month > new Date().getMonth())) ? "hidden" : ""} icon`}
        />

    </div>
  )
}

export default MonthNavigator