import { useEffect, useState } from "react"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { IconAdd } from "../../../utils/icons/icons"
import MonthNavigator from "../../UI/DateStuff/MonthNavigator/MonthNavigator"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import TransactionsTable from "../../UI/Tables/TransactionsTable/TransactionsTable"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import { PAGE_ID_TRANSACTIONS, SHOW_TABLE } from "../../../config/globals"
import EditTransModal from "../../UI/Modals/EditTransModal/EditTransModal"
import PieGraph from "../../Graphs/PieGraph/PieGraph"
import { formatCurrency } from "../../../utils/functions/formatNumber"


const Expense = () => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()
    const { date, fetchExpenseData, transactionExpense, totalPrice, graphData } = useTransactionsContext()

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
    const [wantSee, setWantSee] = useState(SHOW_TABLE)

    const toggleWantSee = (id: string) => setWantSee(id)
    const handleHideNewTransModal = () => setShowNewTrans(false)
    const toggleEditModal = () => setShowEditModal(!showEditModal)

    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [] )

    useEffect(() => {
        fetchExpenseData(date.month, date.year)
    }, [] )

    console.log(graphData)

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        { showEditModal && selectedTransaction && (
            <EditTransModal 
                toggleEditModal={toggleEditModal}
                transaction={selectedTransaction}
            /> 
        )}

        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTransModal} 
                pageID={PAGE_ID_TRANSACTIONS}
                langID={userLangID}
            />
        )}

        <div className="w-full flex items-center justify-between">
            <SectionTitle value={formatLang(userLangID, "Výdaje", "Expense")} />
            <IconAdd className="icon text-6xl" onClick={ () => setShowNewTrans(true) }/>
        </div>

        <MonthNavigator pageID={PAGE_ID_TRANSACTIONS} monthName={getMonthName(date.year, date.month, userLangID)} />

        { transactionExpense.length === 0 && (
            <div className="flex items-center justify-center mt-20">
                <p className="h-full">
                    {formatLang(userLangID, 
                        `Žádné výdaje pro ${getMonthName(date.year, date.month, userLangID)} (${date.year})`,
                        `No expense for ${getMonthName(date.year, date.month, userLangID)} (${date.year})`,
                    )}
                </p>
            </div>
        )}

        { transactionExpense.length >= 1 && (
            <div className="flex items-center justify-between">
                <PieGraph langID={userLangID} pageID={PAGE_ID_TRANSACTIONS} graphData={graphData}/>
                <p className="font-bold">{formatCurrency(totalPrice, userCurrency)}</p>
                {/* // TODO - Přidat souhr utra podle kategorii! (graphData) */}
            </div>
        )}

        {/* // TODO - Přidat "tabulku pro mobil atd..." */}
        { transactionExpense.length >= 1 && (
            <>
                <TransactionsTable
                    data={transactionExpense.map(transaction => ({
                    ...transaction,
                    onEdit: () => {
                        setSelectedTransaction(transaction)
                        toggleEditModal()
                    }}))}
                />
            </>
        )}

    </div>
  )
}

export default Expense