import { useUserContext } from "../../../context/UserContext"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import TopBar from "../../Layout/TopBar/TopBar"
import Loader from "../../UI/Loader/Loader"
import { usePageTitle } from "../../../hooks/usePageTitle"
import OverviewMonthMUI from "../OverviewMonth/OverviewMonthMUI"
import OverviewYearMUI from "../OverviewYear/OverviewYearMUI"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { handleGetOverview } from "../../../API/Overview"
import { IOverviewData } from "../../../utils/interfaces/interfaces"
import YearNavigatorMUI from "../../UI/YearNavigatorMUI/YearNavigatorMUI"
import { useRefetchContext } from "../../../context/RefetchContext"
import OverviewMonths from "../OverviewMonths/OverviewMonths"

const Overview = () => {

    const { userLangID } = useUserContext()
    const { overviewDataKey } = useRefetchContext()

    const [searchParams, setSearchParams] = useSearchParams()
    const [overviewData, setOverviewData] = useState<IOverviewData | null>()
    const [loading, setLoading] = useState(false)

    const currentYear = new Date().getFullYear()
    const year = Number(searchParams.get("year") || currentYear)
    const isThisYear = year === currentYear

    usePageTitle(formatLang(userLangID, `Přehled (${year})`, `Overview (${year})`))

    const toggleLoading = () => setLoading(prev => !prev)

    const handleNext = () => {
        if(year === currentYear) return
        setSearchParams({ year: String(year + 1) })
    }

    const handlePrev = () => {
        setSearchParams({ year: String(year - 1) })
    }

    useEffect(() => {
        const fetchData = async() => {
            toggleLoading()
            const response = await handleGetOverview(Number(year))
            setOverviewData(response.data)
            toggleLoading()
        }   
        fetchData()
    }, [year, overviewDataKey])

    useEffect(() => {
        if (!searchParams.get("year")) {
          const newParams = new URLSearchParams(searchParams)
          newParams.set("year", String(currentYear))
          setSearchParams(newParams)
        }
    }, [searchParams, setSearchParams])


    if(!overviewData) return <Loader wantFullSize={true}/>


  return (
    <div className="section-padding">

        <TopBar />

        <SectionTitle value={formatLang(userLangID, "Přehled", "Overview")} wantInfo={false} />

        <YearNavigatorMUI
            year={year}
            handleNext={handleNext}
            handlePrev={handlePrev}
            loading={loading}
        />

        {/* Měsíční přehled */}
        { isThisYear && overviewData && 
            <OverviewMonthMUI 
                income={overviewData.monthTotalIncome}
                expense={overviewData.monthTotalExpense}
                budget={overviewData.monthBudget}
                loading={loading}
            />
        }

        {/* Roční přehled */}
        <div className="mb-10 p-4 animate-fadeIn">
            <OverviewYearMUI
                year={Number(year)}
                expense={overviewData.yearTotalExpense}
                income={overviewData.yearTotalIncome}
                chartDataExpense={overviewData.categoriesYearExpense}
                chartDataIncome={overviewData.categoriesYearIncome}
                loading={loading}
            />
        </div>

        {/* Přehled podle měsíců  */}
        {overviewData.overviewMonths.length > 0 &&   
            <div className="mb-10 p-4 animate-fadeIn">
                <OverviewMonths
                    year={year}
                    data={overviewData.overviewMonths}
                />
            </div>
        }
    </div>
  )
}

export default Overview