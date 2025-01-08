import { useUserContext } from "../../../context/UserContext"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import { useOverviewData } from "../../../context/OverviewDataContext"
import OverviewMonth from "../OverviewMonth/OverviewMonth"
import OverviewYear from "../OverviewYear/OverviewYear"
import TopBar from "../../Layout/TopBar/TopBar"
import Loader from "../../UI/Loader/Loader"
import { usePageTitle } from "../../../hooks/usePageTitle"

const Overview = () => {

    const { userLangID } = useUserContext()
    const { overviewData, month, year } = useOverviewData()

    usePageTitle(formatLang(userLangID, `Přehled (${year})`, `Overview (${year})`))

    if(!overviewData) return <Loader wantFullSize={true}/>

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={true} showMonthNavigator={false} />

        <SectionTitle value={formatLang(userLangID, "Přehled", "Overview")} wantInfo={false} />

        {/* Měsíční přehled */}
        { month === (new Date().getMonth() + 1) && year === new Date().getFullYear() && overviewData && 
            <OverviewMonth 
                income={overviewData.monthTotalIncome}
                expense={overviewData.monthTotalExpense}
                budget={overviewData.monthBudget}
            />
        }

        {/* Roční přehled */}
        <div className="mb-10 p-4 animate-fadeIn">
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
    </div>
  )
}

export default Overview