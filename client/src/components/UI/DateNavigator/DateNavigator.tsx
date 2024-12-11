import { IconNext, IconPrev } from "../../../utils/icons/icons"

export interface IDateNavigator {
  handlePrev: () => void
  handleNext: () => void
  dateValue: number
}

const DateNavigator = ({ handlePrev, handleNext, dateValue } : IDateNavigator ) => {
  return (
    <div className='flex items-center gap-4 mb-10'>
        
        <IconPrev 
            onClick={handlePrev}
            className="icon" 
        />

        <p className="font-semibold">{dateValue}</p>

        <IconNext 
            onClick={handleNext}
            className={`${ dateValue > new Date().getFullYear() - 1 && "hidden" } icon`} 
        />

    </div>
  )
}

export default DateNavigator