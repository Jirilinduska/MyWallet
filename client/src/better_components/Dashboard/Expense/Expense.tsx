import { useState } from "react"
import NewTransModal from "../../../components/UI/Modals/NewTransModal/NewTransModal"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import { PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import EditTransModal from "../../../components/UI/Modals/EditTransModal/EditTransModal"
import TopBar from "../../Layout/TopBar/TopBar"
import TransactionsContent from "../../../components/TransactionsContent/TransactionsContent"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { getMonthName } from "../../../utils/functions/dateUtils"

const Expense = () => {

    const { userLangID } = useUserContext()
    const { transactionExpense, date } = useTransactionsContext()

    usePageTitle(formatLang(userLangID, `Výdaje ${getMonthName(date.year, date.month, userLangID)} ${date.year}`, `Expense ${getMonthName(date.year, date.month, userLangID)} ${date.year}`))

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)

    const handleHideNewTransModal = () => setShowNewTrans(false)
    const toggleEditModal = () => setShowEditModal(!showEditModal)
    const toggleNewTransModal = () => setShowNewTrans(!showNewTrans)

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false} showMonthNavigator={true} pageID={PAGE_ID_TRANSACTIONS}/>

        { showEditModal && selectedTransaction && (
            <EditTransModal 
                toggleEditModal={toggleEditModal}
                transaction={selectedTransaction}
                pageID={PAGE_ID_TRANSACTIONS}
            /> 
        )}

        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTransModal} 
                pageID={PAGE_ID_TRANSACTIONS}
            />
        )}

        <SectionTitle value={formatLang(userLangID, "Výdaje", "Expense")} wantInfo={false} />

        <TransactionsContent 
            transactions={transactionExpense} 
            toggleNewTransModal={toggleNewTransModal} 
            pageID={PAGE_ID_TRANSACTIONS}
            setSelectedTransaction={setSelectedTransaction}
            toggleEditModal={toggleEditModal}
        />

    </div>
  )
}

export default Expense