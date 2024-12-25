import { useEffect, useState } from "react"
import { IconAdd } from "../../../utils/icons/icons"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
// import TransactionsTable from "../../UI/Tables/TransactionsTable/TransactionsTable"
import EditTransModal from "../../UI/Modals/EditTransModal/EditTransModal"
import { useUserContext } from "../../../context/UserContext"
import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { useParams } from "react-router-dom"
import MonthNavigator from "../../UI/DateStuff/MonthNavigator/MonthNavigator"
import { getMonthName } from "../../../utils/functions/dateUtils"
import "animate.css"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { ITransaction } from "../../../utils/interfaces/interfaces"


const Transactions = () => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()
    const { pageID } = useParams()

    const { fetchExpenseData, fetchIncomeData, transactionExpense, transactionIncome, date } = useTransactionsContext()

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)

    const toggleEditModal = () => setShowEditModal(!showEditModal)

    const handleHideNewTransModal = () => setShowNewTrans(false)

    // TODO Dokončit sorttovani

    // TODO - OPRAVIT CHYBY!!!!!!§

    const monthName = getMonthName(date.year, date.month, userLangID)


    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [] )

    useEffect(() => {
        if(pageID === PAGE_ID_INCOME && transactionIncome.length === 0) {
            if(date) {
                fetchIncomeData(date.month, date.year)
            }
        } else if(pageID === PAGE_ID_TRANSACTIONS && transactionExpense.length === 0) {
            if(date) {
                if(!transactionExpense) fetchExpenseData(date.month, date.year)
            }
        }
        // fetchIncomeData(date.month, date.year)
        // fetchExpenseData(date.month, date.year)
        // console.log(date.month, date.year)
    }, [] )
    

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        { showEditModal && selectedTransaction && (
            <EditTransModal 
                toggleEditModal={toggleEditModal}
                transaction={selectedTransaction}
                pageID={PAGE_ID_INCOME}
            /> 
        )}

        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTransModal} 
                pageID={pageID}
            />
        )}

        <div className="w-full flex items-center justify-between">
            { pageID === PAGE_ID_TRANSACTIONS && <SectionTitle value={formatLang(userLangID, "Výdaje", "Expense")} /> }
            { pageID === PAGE_ID_INCOME &&       <SectionTitle value={formatLang(userLangID, "Příjmy", "Income")} /> }
            <IconAdd className="icon text-6xl" onClick={ () => setShowNewTrans(true) }/>
        </div>

        <MonthNavigator pageID={pageID} monthName={monthName} />

        { transactionExpense.length === 0 && pageID === PAGE_ID_TRANSACTIONS && (
            <div className="flex items-center justify-center mt-20">
                <p className="h-full">{`No transactions found for ${monthName}.`}</p>
            </div>
        )}
        { transactionIncome.length === 0 && pageID === PAGE_ID_INCOME && (
            <div className="flex items-center justify-center mt-20">
                <p className="h-full">{`No income found for ${monthName}.`}</p>
            </div>
        )}

        {/* // TODO Přidat graf + totalIncome */}

        {/* { transactionIncome.length >= 1 && pageID === PAGE_ID_INCOME && (
            
            <>
                <TransactionsTable
                    data={transactionIncome.map(transaction => ({
                        ...transaction,
                    onEdit: () => {
                        setSelectedTransaction(transaction)
                        toggleEditModal()
                    }}))}
                />
            </>
        )}

        { transactionExpense.length >= 1 && pageID === PAGE_ID_TRANSACTIONS && (
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
        )} */}

        

    </div>
  )
}

export default Transactions