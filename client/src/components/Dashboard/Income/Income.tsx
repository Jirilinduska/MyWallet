import { useEffect, useState } from "react"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { ITransaction, IcategoriesYearOverview } from "../../../utils/interfaces/interfaces"
import { PAGE_ID_INCOME } from "../../../config/globals"
import TopBar from "../../Layout/TopBar/TopBar"
import TransactionsContent from "../TransactionsContent/TransactionsContent"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { hints } from "../../../config/hints"
import NewTransModalMUI from "../../Modals/NewTransModal/NewTransModalMUI"
import PreviusMonth from "../PreviusMonth/PreviusMonth"
import EditTransModalMUI from "../../Modals/EditTransModal/EditTransModalMUI"
import { useSearchParams } from "react-router-dom"
import { handleGetTransactions } from "../../../API/Transactions"
import { handleGetIncomes } from "../../../API/Income"
import MonthNavigator from "../../UI/MonthNavigator/MonthNavigator"
import { useRefetchContext } from "../../../context/RefetchContext"

const Income = () => {

    const { userLangID } = useUserContext()
    const { overviewDataKey } = useRefetchContext()

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
    const [graphData, setGraphData] = useState<IcategoriesYearOverview[] | null>(null)
    const [totalPrice, setTotalPrice] = useState(0)

    const [loading, setLoading] = useState(false)
    const [dataTransactions, setDataTransactions] = useState<ITransaction[] | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const year = Number(searchParams.get("year") || currentYear)
    const month = Number(searchParams.get("month") || currentMonth)
    const [isThisMonth, setIsThisMonth] = useState(true)

    const handleHideNewTransModal = () => setShowNewTrans(false)
    const toggleEditModal = () => setShowEditModal(!showEditModal)
    const toggleNewTransModal = () => setShowNewTrans(!showNewTrans)
    const toggleLoading = () => setLoading(prev => !prev)

    const handleCloseModal = () => {
        setSelectedTransaction(null)
        toggleEditModal()
    }

    usePageTitle(formatLang(userLangID, `Příjmy ${getMonthName(year, month, userLangID)} ${year}`, `Income ${getMonthName(year, month, userLangID)} ${year}`))

    const checkThisMonth = () => {
        if(month === currentMonth && year === currentYear) {
            setIsThisMonth(true)
        } else {
            setIsThisMonth(false)
        }
    }

    const handlePrev = () => {
        if (month === 1) {
            setSearchParams(new URLSearchParams({
                month: "12",
                year: String(year - 1),
            }));
        } else {
            setSearchParams(new URLSearchParams({
                month: String(month - 1),
                year: String(year),
            }));
        }
    }

    const handleNext = () => {
        if (month === 12) {
            setSearchParams(new URLSearchParams({
                month: "1",
                year: String(year + 1),
            }));
        } else {
            setSearchParams(new URLSearchParams({
                month: String(month + 1),
                year: String(year),
            }));
        }
    }

    usePageTitle(
        formatLang(userLangID, 
            `Výdaje ${getMonthName(year, month, userLangID)} ${year}`, 
            `Expense ${getMonthName(year, month, userLangID)} ${year}`
    ))


    useEffect(() => {
        const fetchData = async() => {
            const isCurrentMonth = (month === currentMonth && year === currentYear)
            setIsThisMonth(isCurrentMonth)
            if (!isCurrentMonth) return

            toggleLoading()
            const response = await handleGetIncomes(month, year)
            setDataTransactions(response.data.transactions)
            setTotalPrice(response.data.totalPrice)
            setGraphData(response.data.graphData)
            toggleLoading()
        }
        if(isThisMonth) {
            fetchData()
        }
    }, [month, year, overviewDataKey])

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)
        if (!newParams.has("year")) {
            newParams.set("year", String(currentYear))
        }
        if (!newParams.has("month")) {
            newParams.set("month", String(currentMonth))
        }
        setSearchParams(newParams)
        checkThisMonth()
    }, [searchParams, setSearchParams, currentMonth, currentYear])

    if(!isThisMonth) {
        return (
            <div className="section-padding">
                <TopBar />
                <SectionTitle 
                    value={formatLang(userLangID, "Výdaje", "Expense")} 
                    wantInfo={true} 
                    infoValue={formatLang(userLangID, hints.hintExpenseCS, hints.hintExpenseEN)}
                />
                <MonthNavigator 
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    loading={loading}
                    month={month}
                    year={year}
                />
                <PreviusMonth
                    isExpense={false} 
                    month={month} 
                    year={year} 
                    loading={loading}
                    toggleLoading={toggleLoading}
                />
            </div>
        )
    }

  return (
    <div className="section-padding">

        <TopBar />

        {/* Modal window - Edit transaction */}
        { selectedTransaction && (
            <EditTransModalMUI 
                toggleEditModal={handleCloseModal}
                transaction={selectedTransaction}
                pageID={PAGE_ID_INCOME}
                isOpen={showEditModal}
            /> 
        )}

        {/* Modal window - Create transaction */}
        <NewTransModalMUI
            handleHide={handleHideNewTransModal}
            pageID={PAGE_ID_INCOME}
            isOpen={showNewTrans}
        />

        {/* Section title */}
        <SectionTitle 
            value={formatLang(userLangID, "Příjmy", "Income")} 
            wantInfo={true}
            infoValue={formatLang(userLangID, hints.hintIncomeCS, hints.hintIncomeEN)} 
        />

        <MonthNavigator 
            handleNext={handleNext}
            handlePrev={handlePrev}
            loading={loading}
            month={month}
            year={year}
        />

        {dataTransactions && graphData &&
            <TransactionsContent
                transactions={dataTransactions}
                pageID={PAGE_ID_INCOME}
                setSelectedTransaction={setSelectedTransaction}
                toggleEditModal={toggleEditModal}
                toggleNewTransModal={toggleNewTransModal}
                month={month}
                year={year}
                totalPrice={totalPrice}
                graphData={graphData}
            />
        }

    </div>
  )
}

export default Income