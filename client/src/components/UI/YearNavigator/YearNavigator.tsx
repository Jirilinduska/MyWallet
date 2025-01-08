import { useOverviewData } from "../../../context/OverviewDataContext"
import { IconNext, IconPrev } from "../../../utils/icons/icons"

const YearNavigator = () => {

  const { handleNextYear, handlePrevYear, year } = useOverviewData()

  return (
    <div className='flex items-center gap-4 w-[150px]'>
        
        <IconPrev 
            onClick={handlePrevYear}
            className="icon" 
        />

        <p className="font-semibold">{year}</p>

        <IconNext 
            onClick={ () => {
              if(year > new Date().getFullYear() - 1) {
                return
              } else {
                handleNextYear()
              }
            }}
            className={`${ year > new Date().getFullYear() - 1 && "text-gray-300 cursor-default" } icon`} 
        />

    </div>
  )
}

export default YearNavigator