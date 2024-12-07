import { useEffect, useState } from "react"
import { IconAdd, IconNext, IconPrev } from "../../../utils/icons/icons"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
import TransactionsTable from "../../UI/Tables/TransactionsTable/TransactionsTable"
import { handleGetTransactions } from "../../../API/Transactions"
import { IGraphBreakdownData, ITransaction } from "../../../utils/interfaces/interfaces"
import EditTransModal from "../../UI/Modals/EditTransModal/EditTransModal"
import { useUserContext } from "../../../context/UserContext"
import { LANG_CZECH } from "../../../config/globals"
import MyChart from "../../Graphs/MyChart/MyChart"
import PieGraph from "../../Graphs/PieGraph/PieGraph"

const Transactions = () => {

    const { refreshUserData, userLangID } = useUserContext()

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [graphData, setGraphData] = useState<IGraphBreakdownData[]>([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
    const [loading, setLoading] = useState(false)

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
        fetchTransData()
    }, [date] )

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

    const fetchTransData = async() => {

        setLoading(true)

        try {
            const response = await handleGetTransactions(date.month, date.year)
            console.log(response)
            setTransactions(response.data.transactions)
            setGraphData(response.data.graphData)
        } catch (error) {
            // TODO - Dododělat handleError :) 
            console.log("fetchTransData() => : ", error)
        } finally {
            setLoading(false)
        }
    }

    const getMonthName = new Date(date.year, date.month - 1).toLocaleString(userLangID === LANG_CZECH ? "cs-CZ" : "en-US", { month: "long" })
    const monthName = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        {/* <TransactionsHeader> */}

        { showEditModal && selectedTransaction && (
            <EditTransModal 
                toggleEditModal={toggleEditModal}
                transaction={selectedTransaction}
                fetchTransData={fetchTransData}   
            /> 
        )}

        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTransModal} 
                refetchData={fetchTransData}
            />
        )}

        <IconAdd className="icon fixed top-10 right-10 text-6xl z-50" onClick={ () => setShowNewTrans(true) }/>

        <h3 className="font-bold text-lg mb-6">{ userLangID === LANG_CZECH ? "Výdaje" : "Transactions" }</h3>

        <div className="flex items-center gap-4">

            <IconPrev 
                onClick={ () => {
                    handlePrevMonth()
                    fetchTransData()
                }} 
                className="icon" 
            />

            <p className="font-semibold">{monthName} {date.year}</p>

            <IconNext 
                onClick={ () => {
                    handleNextMonth()
                    fetchTransData()
                }} 
                className={`${ date.month > new Date().getMonth() && "hidden" } icon`} 
            />

        </div>

        { transactions.length > 0 && (
            <div className="my-10 flex items-center justify-between">
                <PieGraph graphData={graphData}/> 
                {/* // TODO -  Přidat možnost export Data! */}
                <div className="">
                    <button className="button-blue">Export data</button>
                </div>
            </div>
        )}

        { transactions.length === 0 && (
            <div className="flex items-center justify-center mt-20">
                <p className="h-full">{`No transactions found for ${monthName}.`}</p>
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