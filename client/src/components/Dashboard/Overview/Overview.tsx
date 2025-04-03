import { useUserContext } from "../../../context/UserContext"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import { useOverviewData } from "../../../context/OverviewDataContext"
import TopBar from "../../Layout/TopBar/TopBar"
import Loader from "../../UI/Loader/Loader"
import { usePageTitle } from "../../../hooks/usePageTitle"
import OverviewMonthMUI from "../OverviewMonth/OverviewMonthMUI"
import OverviewYearMUI from "../OverviewYear/OverviewYearMUI"

const Overview = () => {

    const { userLangID } = useUserContext()
    const { overviewData, month, year } = useOverviewData()
  
    const isThisMonth = (new Date().getMonth() + 1) === month && year === new Date().getFullYear()
  
    usePageTitle(formatLang(userLangID, `Přehled (${year})`, `Overview (${year})`))

    if(!overviewData) return <Loader wantFullSize={true}/>

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={true} showMonthNavigator={false} />

        <SectionTitle value={formatLang(userLangID, "Přehled", "Overview")} wantInfo={false} />

        {/* Měsíční přehled */}
        { isThisMonth && overviewData && 
            <OverviewMonthMUI 
                income={overviewData.monthTotalIncome}
                expense={overviewData.monthTotalExpense}
                budget={overviewData.monthBudget}
            />
        }

        {/* Roční přehled */}
        <div className="mb-10 p-4 animate-fadeIn">
            {
                <OverviewYearMUI
                    year={year}
                    expense={overviewData.yearTotalExpense}
                    income={overviewData.yearTotalIncome}
                    chartDataExpense={overviewData.categoriesYearExpense}
                    chartDataIncome={overviewData.categoriesYearIncome}
                />
            }
        </div>
    </div>
  )
}

export default Overview