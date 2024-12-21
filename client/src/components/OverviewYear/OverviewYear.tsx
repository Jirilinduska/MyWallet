import React from 'react'
import { useUserContext } from '../../context/UserContext'
import { useOverviewData } from '../../context/OverviewDataContext'
import { LANG_CZECH } from '../../config/globals'
import { formatLang } from '../../utils/functions/formatLang'
import InfoItems from '../InfoItems/InfoItems'
import BarChart from '../Graphs/BarChart/BarChart'

interface OverviewYearProps {
    year: number
    income: number
    budget: number
    expense: number
}

const OverviewYear = ({ year, income, budget, expense } : OverviewYearProps ) => {

    const { userLangID } = useUserContext()
    const {  } = useOverviewData()

    const graphDataEN = {
        "Income": income,
        "Expense": expense,
        "Budget": budget
    }

    const graphDataCS = {
        "Příjmy": income,
        "Výdaje": expense,
        "Naplánované výdaje": budget
    }

  return (
    <div className="mb-10 p-4">

        <h3 className="font-bold text-lg mb-10">
            {/* { year === new Date().getFullYear() ? `${userLangID === LANG_CZECH ? `Tento rok (${year})` : `This year (${year})`}` : `(${year})`} */}
            { year === new Date().getFullYear() ? formatLang(userLangID, `Tento rok (${year})`, `This year (${year})`) :`(${year})` }
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

export default OverviewYear