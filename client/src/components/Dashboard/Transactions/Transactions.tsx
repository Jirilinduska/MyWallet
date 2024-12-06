import { useEffect, useState } from "react"
import { IconAdd, IconNext, IconPrev } from "../../../utils/icons/icons"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
import TransactionsTable from "../../UI/Tables/TransactionsTable/TransactionsTable"
import { handleGetTransactions } from "../../../API/Transactions"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import EditTransModal from "../../UI/Modals/EditTransModal/EditTransModal"

const Transactions = () => {

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)

    const toggleEditModal = () => setShowEditModal(!showEditModal)

    const handleHideNewTransModal = () => setShowNewTrans(false)

    const [date, setDate] = useState( () => {
        const today = new Date()
        return { month: today.getMonth() + 1, year: today.getFullYear() }
    })

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
        try {
            const response = await handleGetTransactions(date.month, date.year)
            console.log(response)
            setTransactions(response.data)
        } catch (error) {
            // TODO - Dododělat handleError :) 
            console.log("fetchTransData() => : ", error)
        }
    }

    useEffect( () => {
        fetchTransData()
    }, [date] )

    // TODO - Nastavit jazyk
    const getMonthName = new Date(date.year, date.month - 1).toLocaleString("default", { month: "long" })
    const monthName = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)

  return (
    <div className="md:ml-[250px] p-6">

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

        <h3 className="font-bold text-lg mb-6">Transactions</h3>

        {/* // TODO - Div s šipkami, při kliknutí fetch transactions podle datumu. */}
        {/* // TODO - Přidat loader tabulku  */}
        <div className="flex items-center gap-4">

            <IconPrev onClick={handlePrevMonth} className="icon" />

            <p className="font-semibold">{monthName} {date.year}</p>

            <IconNext onClick={handleNextMonth} className="icon" />

        </div>

        {/* // TODO - Pokud je datum vetší než tento měsíc, tak přidat jiný obsah. */}

        {/* { transactions && (
            <TransactionsTable
                data={transactions}
                onEdit={ () => {
                    setSelectedTransaction()
                }}
            />
        )} */}

        {transactions && (
            <TransactionsTable
                data={transactions.map(transaction => ({
                    ...transaction,
                onEdit: () => {
                    setSelectedTransaction(transaction); // Nastavení vybrané transakce
                    toggleEditModal() // Otevření modálu
                }}))}
            />
        )}

        {/* // TODO - Přidat graf útrat v tento měsíc */}

    </div>
  )
}

export default Transactions