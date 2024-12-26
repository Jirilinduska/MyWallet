import { useUserContext } from '../../../context/UserContext'
import { LANG_CZECH } from '../../../config/globals'
import { formatLang } from '../../../utils/functions/formatLang'
import InfoItems from '../InfoItems/InfoItems'
import BarChart from '../../Charts/BarChart/BarChart'
import SectionTitle from '../../../components/UI/SectionTitle/SectionTitle'
import { IcategoriesYearOverview } from '../../../utils/interfaces/interfaces'
import BarChartCategories from '../../Charts/BarChartCategories/BarChartCategories'

interface OverviewYearProps {
    year: number
    income: number
    budget: number |  null
    expense: number
    chartDataExpense: IcategoriesYearOverview[]
    chartDataIncome: IcategoriesYearOverview[]
}

const OverviewYear = ({ year, income, budget, expense, chartDataExpense, chartDataIncome } : OverviewYearProps ) => {

    const { userLangID } = useUserContext()

    const graphDataEN = {
        "Income": income,
        "Expenses": expense,
        ...(budget !== null && { "Budget": budget })
    }

    const graphDataCS = {
        "Příjmy": income,
        "Výdaje": expense,
        ...(budget !== null && { "Naplánované výdaje": budget })
    }

  return (
    <div className="mb-10 p-4">

        <h3 className="font-bold text-lg mb-10">
            { year === new Date().getFullYear() ? formatLang(userLangID, `Tento rok (${year})`, `This year (${year})`) :`(${year})` }
        </h3>

        <div className="xl:h-[300px] xl:flex items-center justify-between gap-4 mb-10">

            <InfoItems 
                budget={budget}
                expense={expense}
                income={income}
            />

            <div className="w-full h-auto xl:h-[300px] xl:w-1/2 ">
                <BarChart graphData={userLangID === LANG_CZECH ? graphDataCS : graphDataEN} />
            </div>

        </div>

        <div className="flex flex-col justify-between gap-10 xl:flex-row">

            <div className="w-full h-auto xl:h-[300px] xl:w-1/2 ">
                <SectionTitle value={formatLang(userLangID, `Výdaje podle kategorií (${year})`, `Expenses by category (${year})`)}/>
                <BarChartCategories chartData={chartDataExpense}/>
            </div>

            <div className="w-full h-auto xl:h-[300px] xl:w-1/2 ">
                <SectionTitle value={formatLang(userLangID, `Příjmy podle kategorií (${year})`, `Income by category (${year})`)}/>
                <BarChartCategories chartData={chartDataIncome}/>
            </div>

        </div>

    </div>
  )
}

export default OverviewYear