import { LANG_CZECH } from "../../config/globals"
import { useOverviewData } from "../../context/OverviewDataContext"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import BarChart from "../Graphs/BarChart/BarChart"
import InfoItems from "../InfoItems/InfoItems"

interface OverviewMonthProps {
    income: number
    expense: number
    budget: number
}

const OverviewMonth = ({ budget, income, expense } : OverviewMonthProps ) => {

    const { userLangID } = useUserContext()

    const graphDataEN = {
        "Income": income,
        "Actual expenses": expense,
        "Budget": budget
    }

    const graphDataCS = {
        "Příjmy": income,
        "Skutečné výdaje": expense,
        "Naplánované výdaje": budget
    }

  return (
    <div className="mb-4 p-4 pb-10 border-b border-colorGray">

        <h3 className="font-bold mb-6 pb-2">
            {formatLang(userLangID, "Tento měsíc", "This month")}
        </h3>

        <div className="xl:h-[300px] xl:flex items-center justify-between gap-4">

            <InfoItems 
                budget={budget}
                expense={expense}
                income={income}
            />

            <div className="w-full h-[300px] xl:h-full xl:w-1/2 ">
                <BarChart
                    graphData={userLangID === LANG_CZECH ? graphDataCS : graphDataEN}
                />
            </div>

        </div>
    </div>
  )
}

export default OverviewMonth
