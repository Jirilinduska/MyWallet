import { useState } from "react"
import NewTransModal from "../../Modals/NewTransModal/NewTransModal"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import { PAGE_ID_INCOME } from "../../../config/globals"
import EditTransModal from "../../Modals/EditTransModal/EditTransModal"
import TopBar from "../../Layout/TopBar/TopBar"
import TransactionsContent from "../TransactionsContent/TransactionsContent"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { hints } from "../../../config/hints"

const Income = () => {

    const { userLangID } = useUserContext()
    const { transactionIncome, date } = useTransactionsContext()

    usePageTitle(formatLang(userLangID, `Příjmy ${getMonthName(date.year, date.month, userLangID)} ${date.year}`, `Income ${getMonthName(date.year, date.month, userLangID)} ${date.year}`))

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)

    const handleHideNewTransModal = () => setShowNewTrans(false)
    const toggleEditModal = () => setShowEditModal(!showEditModal)
    const toggleNewTransModal = () => setShowNewTrans(!showNewTrans)

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false} showMonthNavigator={true} pageID={PAGE_ID_INCOME}/>

        {/* Modal window - Edit transaction */}
        { showEditModal && selectedTransaction && (
            <EditTransModal 
                toggleEditModal={toggleEditModal}
                transaction={selectedTransaction}
                pageID={PAGE_ID_INCOME}
            /> 
        )}

        {/* Modal window - Create transaction */}
        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTransModal} 
                pageID={PAGE_ID_INCOME}
            />
        )}

        {/* Section title */}
        <SectionTitle 
            value={formatLang(userLangID, "Příjmy", "Income")} 
            wantInfo={true}
            infoValue={formatLang(userLangID, hints.hintIncomeCS, hints.hintIncomeEN)} 
        />

        <TransactionsContent
            transactions={transactionIncome}
            pageID={PAGE_ID_INCOME}
            setSelectedTransaction={setSelectedTransaction}
            toggleEditModal={toggleEditModal}
            toggleNewTransModal={toggleNewTransModal}
        />

    </div>
  )
}

export default Income