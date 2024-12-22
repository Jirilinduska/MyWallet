import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import DateNavigator from "../../UI/YearNavigator/YearNavigator"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import { useOverviewData } from "../../../context/OverviewDataContext"
import OverviewMonth from "../../OverviewMonth/OverviewMonth"
import OverviewYear from "../../OverviewYear/OverviewYear"
import LastTransaction from "../../LastTransaction/LastTransaction"
import TopBar from "../../UI/TopBar/TopBar"

const Overview = () => {

    const { userLangID } = useUserContext()
    const { overviewData, month, year } = useOverviewData()

    // const graphData = {
//   2024: 143400,
//   2023: 1500,
//   2022: 300000,
//   income: 1300000,
// }

    // TODO
    if(!overviewData) return <div className="">NoData</div>
    
    { console.log(overviewData) }

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={true} showMonthNavigator={false} />

        <SectionTitle value={formatLang(userLangID, "Přehled", "Overview")}/>

        {/* // TODO - Upravit layout, zmenit komponenty */}

        {/* Měsíční přehled */}
        { month === (new Date().getMonth() + 1) && year === new Date().getFullYear() && overviewData && 
            <OverviewMonth 
                income={overviewData.monthTotalIncome}
                expense={overviewData.monthTotalExpense}
                budget={overviewData.monthBudget}
            />
        }

        {/* Roční přehled */}
        <div className="mb-10 p-4">
            { overviewData && (
                <OverviewYear
                    year={year}
                    budget={null}
                    expense={overviewData.yearTotalExpense}
                    income={overviewData.yearTotalIncome}
                    chartDataExpense={overviewData.categoriesYearExpense}
                    chartDataIncome={overviewData.categoriesYearIncome}
                />
            )}
        </div>

        {/* // TODO - Přidat grafy */}

    </div>
  )
}

export default Overview