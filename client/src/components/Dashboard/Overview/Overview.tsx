import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import { COLOR_BLUE, COLOR_GREEN, COLOR_RED, COLOR_WHITE, LANG_CZECH, SIZE_MEDIUM, SIZE_ROW } from "../../../config/globals"
import DateNavigator from "../../UI/DateNavigator/DateNavigator"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import { useOverviewData } from "../../../context/OverviewDataContext"
import { IconExpense, IconIncome, IconMoneyInHand } from "../../../utils/icons/icons"
import InfoItem from "../../UI/InfoItem/InfoItem"

const Overview = () => {

    const { refreshUserData, userLangID } = useUserContext()
    const { refreshOverviewData, overviewData } = useOverviewData()

    const [year, setYear] = useState(0)
    const [month, setMonth] = useState(0)


    useEffect(() => {
        const yearNow = new Date().getFullYear()
        const monthNow = new Date().getMonth() + 1
        setYear(yearNow)
        setMonth(monthNow)
        if(!userLangID) refreshUserData()
    }, [] ) 

    useEffect(() => {
        if (year !== 0) { 
            refreshOverviewData(year, month)
        }
    }, [year])

    const handlePrevYear = () => setYear(year - 1)
    const handleNextYear = () => setYear(year + 1)


  return (
    <div className="md:ml-[250px] p-6 min-h-screen bg-gray-50 text-gray-800">

        <SectionTitle value={formatLang(userLangID, "Přehled", "Overview")}/>

        <DateNavigator
            dateValue={year}
            handleNext={handleNextYear}
            handlePrev={handlePrevYear}
        />

        {/* // TODO - Další sekce */}
        {/* // TODO - Přdat nahoru tlačítka (stats, graphs) pro možnost překliknutní na grafy/statistiky */}

        { month === (new Date().getMonth() + 1) && year === new Date().getFullYear() && (
            <div className="mb-10 p-4 bg-white shadow-md rounded-lg">

                <h3 className="font-bold mb-6 border-b pb-2">
                    {formatLang(userLangID, "Tento měsíc", "This month" )}
                </h3>

                { overviewData && (
                    // <div className="flex items-center gap-4">
                    <div className="">
                        
                        <InfoItem 
                            amount={overviewData.monthTotalExpense} 
                            desc={formatLang(userLangID, "Výdaje", "Expense")} 
                            icon={<IconExpense/>} 
                            plannedAmount={overviewData.monthBudget} 
                            color={COLOR_WHITE}
                            size={SIZE_ROW}
                            formatToCurrency={true}
                        />

                        <InfoItem 
                            amount={overviewData.monthTotalIncome} 
                            desc={formatLang(userLangID, "Příjmy", "Income")} 
                            icon={<IconIncome/>} 
                            plannedAmount={null} 
                            color={COLOR_GREEN}
                            size={SIZE_ROW}
                            formatToCurrency={true}
                        />

                        <InfoItem 
                            amount={overviewData.monthTotalIncome - overviewData.monthTotalExpense} 
                            desc={formatLang(userLangID, "Ušetřeno", "Saved")} 
                            icon={<IconMoneyInHand/>} 
                            plannedAmount={null} 
                            color={COLOR_BLUE}
                            size={SIZE_ROW}
                            formatToCurrency={true}
                        />

                    </div>
                )}
            </div>
        )}


        <div className="mb-10 p-4 bg-white shadow-md rounded-lg">

            <h3 className="font-bold text-lg mb-10">
                { year === new Date().getFullYear() ? `${userLangID === LANG_CZECH ? `Tento rok (${year})` : `This year (${year})`}` : `(${year})`}
            </h3>

            { overviewData && (
                // <div className="flex items-center gap-4">
                <div className="">

                    <InfoItem 
                        amount={overviewData.yearTotalExpense} 
                        desc={formatLang(userLangID, "Výdaje", "Expense")} 
                        icon={<IconExpense/>} 
                        color={COLOR_WHITE} 
                        plannedAmount={null}
                        size={SIZE_ROW}
                        formatToCurrency={true}
                    />

                    <InfoItem 
                        amount={overviewData.yearTotalIncome} 
                        desc={formatLang(userLangID, "Příjmy", "Income")} 
                        icon={<IconIncome/>} 
                        color={COLOR_GREEN} 
                        plannedAmount={null}
                        size={SIZE_ROW}
                        formatToCurrency={true}
                    />

                    <InfoItem 
                        amount={overviewData.savedThisYear} 
                        desc={formatLang(userLangID, "Ušetřeno", "Saved")} 
                        icon={<IconMoneyInHand/>} 
                        color={COLOR_BLUE} 
                        plannedAmount={null}
                        size={SIZE_ROW}
                        formatToCurrency={true}
                    />

                </div>
            )}
        </div>

        {/* // TODO - Přidat grafy */}

    </div>
  )
}

export default Overview