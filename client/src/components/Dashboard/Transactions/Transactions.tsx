import { useEffect, useState } from "react"
import { IconAdd, IconNext, IconPrev } from "../../../utils/icons/icons"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
import TransactionsTable from "../../UI/Tables/TransactionsTable/TransactionsTable"
import { handleGetTransactions } from "../../../API/Transactions"
import { IGraphBreakdownData, ITransaction } from "../../../utils/interfaces/interfaces"
import EditTransModal from "../../UI/Modals/EditTransModal/EditTransModal"
import { useUserContext } from "../../../context/UserContext"
import { LANG_CZECH, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import PieGraph from "../../Graphs/PieGraph/PieGraph"
import { useParams } from "react-router-dom"
import MonthNavigator from "../../UI/MonthNavigator/MonthNavigator"
import { handleGetIncomes } from "../../../API/Income"
import { handleGetMonthName, handleMonthName } from "../../../utils/functions/dateUtils"
import { formatCurrency } from "../../../utils/functions/formatNumber"


const Transactions = () => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()
    const { pageID } = useParams()

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [graphData, setGraphData] = useState<IGraphBreakdownData[]>([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
    const [loading, setLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    const toggleEditModal = () => setShowEditModal(!showEditModal)

    const handleHideNewTransModal = () => setShowNewTrans(false)

    // TODO Dokončit sorttovani
    // const [sortedData, setSortedData] = useState<ITransaction[]>(transactions)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const handleSortByAmount = () => {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc"

      const sorted = [...transactions].sort((a, b) => {
        if (newSortOrder === "asc") {
          return a.day - b.day
        } else {
          return b.day - a.day
        }
      })
      setTransactions(sorted)
      setSortOrder(newSortOrder)

    }

    const [date, setDate] = useState( () => {
        const today = new Date()
        return { month: today.getMonth() + 1, year: today.getFullYear() }
    })


    useEffect( () => {
        if(pageID === PAGE_ID_TRANSACTIONS) fetchTransData()
        if(pageID === PAGE_ID_INCOME) fetchIncomeData()
    }, [date, pageID] )

    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [] )

    const handlePrevMonth = () => {
        setDate( (prev) => {
            const newMonth = prev.month - 1
            return  newMonth < 1 
            ? { month: 12, year: prev.year - 1 }
            : { month: newMonth, year: prev.year }
        })
    }

    const handleNextMonth = () => {
        setDate( (prev) => {
            const newMonth = prev.month + 1
            return newMonth > 12
            ? { month: 1, year: prev.year + 1 }
            : { month: newMonth, year: prev.year }
        })
    }

    // TODO - Zrefactorovat do jedne funkce :)
    const fetchTransData = async() => {
        setLoading(true)
        try {
            const response = await handleGetTransactions(date.month, date.year)
            console.log(response)
            setTransactions(response.data.transactions)
            setGraphData(response.data.graphData)
            setTotalPrice(response.data.totalPrice)
        } catch (error) {
            // TODO - Dododělat handleError :) 
            console.log("fetchTransData() => : ", error)
        } finally {
            setLoading(false)
        }
    }

    // TODO - Dokončit
    const fetchIncomeData = async() => {
        setLoading(true)
        try {
            const response = await handleGetIncomes(date.month, date.year)
            setTransactions(response.data.transactions)
            setGraphData(response.data.graphData)
            setTotalPrice(response.data.totalPrice)
        } catch (error) {
            console.log("fetchIncomeData() => : ", error)
        } finally {
            setLoading(false)
        }
    }

    const getMonthName = handleGetMonthName(date.year, date.month, userLangID)
    const monthName = handleMonthName(getMonthName)

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        { showEditModal && selectedTransaction && (
            <EditTransModal 
                toggleEditModal={toggleEditModal}
                transaction={selectedTransaction}
                fetchTransData={fetchTransData} 
                pageID={pageID}  
            /> 
        )}

        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTransModal} 
                fetchIncomeData={fetchIncomeData}
                fetchTransData={fetchTransData}
                pageID={pageID}
                langID={userLangID}
            />
        )}

        <div className="w-full flex items-center justify-between">
            { pageID === PAGE_ID_TRANSACTIONS && <h3 className="font-bold text-lg mb-6">{ userLangID === LANG_CZECH ? "Výdaje" : "Transactions" }</h3> }
            { pageID === PAGE_ID_INCOME && <h3 className="font-bold text-lg mb-6">{ userLangID === LANG_CZECH ? "Příjmy" : "Income" }</h3> }
            <IconAdd className="icon text-6xl" onClick={ () => setShowNewTrans(true) }/>
        </div>

        <MonthNavigator
            fetchIncomeData={fetchIncomeData}
            fetchTransData={fetchTransData}
            handleNextMonth={handleNextMonth}
            handlePrevMonth={handlePrevMonth}
            month={date.month}
            monthName={monthName}
            pageID={pageID}
            year={date.year}
        />


        { transactions.length > 0 && (
            <div className="my-10 flex items-center justify-between">
                <PieGraph graphData={graphData} pageID={pageID} langID={userLangID} /> 
                {/* // TODO -  Přidat možnost export Data! */}
                <div className="">
                    <button className="button-blue">Export data</button>
                    <p className="">{formatCurrency(totalPrice, userCurrency)}</p>
                </div>
            </div>
        )}

        { transactions.length === 0 && (
            <div className="flex items-center justify-center mt-20">
                <p className="h-full">{`No ${pageID === PAGE_ID_TRANSACTIONS ? "transactions" : "incomes" } found for ${monthName}.`}</p>
            </div>
        )}

        {transactions.length > 0 && (
            <TransactionsTable
                data={transactions.map(transaction => ({
                    ...transaction,
                onEdit: () => {
                    setSelectedTransaction(transaction)
                    toggleEditModal()
                }}))}
            />
        )}

    </div>
  )
}

export default Transactions