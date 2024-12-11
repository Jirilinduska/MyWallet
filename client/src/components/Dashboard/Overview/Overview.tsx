import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import { LANG_CZECH } from "../../../config/globals"
import { handleGetOverview } from "../../../API/Overview"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import DateNavigator from "../../UI/DateNavigator/DateNavigator"
import InfoRow from "../../UI/InfoRow/InfoRow"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"

const Overview = () => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()

    const [year, setYear] = useState(0)
    const [month, setMonth] = useState(0)
    const [overViewData, setOverviewData] = useState({
        yearTotalExpense: 0,
        yearTotalIncome: 0,
        savedThisYear: 0,
        monthTotalExpense: 0,
        monthTotalIncome: 0,
        savedThisMonth: 0,
    })


    useEffect(() => {
        const yearNow = new Date().getFullYear()
        const monthNow = new Date().getMonth() + 1
        setYear(yearNow)
        setMonth(monthNow)
        if(!userLangID) refreshUserData()
    }, [] ) 

    useEffect(() => {
        if (year !== 0) { 
            handleFetchData()
        }
    }, [year])

    const handlePrevYear = () => setYear(year - 1)
    const handleNextYear = () => setYear(year + 1)

    const handleFetchData = async() => {

        try {
            const response = await handleGetOverview(year, month)
            console.log(response)
            setOverviewData(response.data)
        } catch (error) {
            console.log("handleFetchData() => : ", error)
        }
    }


  return (
    <div className="md:ml-[250px] p-6 min-h-screen bg-gray-50 text-gray-800">

        <SectionTitle value={formatLang(userLangID, "Přehled", "Overview")}/>

        <DateNavigator
            dateValue={year}
            handleNext={handleNextYear}
            handlePrev={handlePrevYear}
        />

        {/* // TODO - Další sekce */}

        { month === (new Date().getMonth() + 1) && year === new Date().getFullYear() && (
            <div className="mb-10 p-4 bg-white shadow-md rounded-lg">
                <h3 className="font-bold mb-6 border-b pb-2">
                    { userLangID === LANG_CZECH ? "Tento měsíc" : "This month" }
                </h3>
        
                <InfoRow title={userLangID === LANG_CZECH ? "Příjmy" : "Income"} value={formatCurrency(overViewData.monthTotalIncome, userCurrency)} color="text-green-500" />
                <InfoRow title={userLangID === LANG_CZECH ? "Výdaje" : "Expense"} value={formatCurrency(overViewData.monthTotalExpense, userCurrency)} color="text-red-500" />
                <InfoRow title={userLangID === LANG_CZECH ? "Ušetřeno" : "Saved"} value={formatCurrency(overViewData.savedThisMonth, userCurrency)} color="text-blue-500" />
            </div>
        )}

        <div className="mb-10 p-4 bg-white shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-10">
                { year === new Date().getFullYear() ? `${userLangID === LANG_CZECH ? `Tento rok (${year})` : `This year (${year})`}` : `(${year})`}
            </h3>

            <InfoRow title={userLangID === LANG_CZECH ? "Příjmy" : "Income"} value={formatCurrency(overViewData.yearTotalIncome, userCurrency)} color="text-green-500" />
            <InfoRow title={userLangID === LANG_CZECH ? "Výdaje" : "Expense"} value={formatCurrency(overViewData.yearTotalExpense, userCurrency)} color="text-red-500" />
            <InfoRow title={userLangID === LANG_CZECH ? "Ušetřeno" : "Saved"} value={formatCurrency(overViewData.savedThisYear, userCurrency)} color="text-blue-500" />
        </div>

        {/* // TODO - Přidat grafy */}

    </div>
  )
}

export default Overview