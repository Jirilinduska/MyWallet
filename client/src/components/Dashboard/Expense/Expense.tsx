import { useState } from "react"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { IconAdd } from "../../../utils/icons/icons"
import MonthNavigator from "../../UI/DateStuff/MonthNavigator/MonthNavigator"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import { PAGE_ID_TRANSACTIONS, SHOW_TABLE } from "../../../config/globals"
import EditTransModal from "../../UI/Modals/EditTransModal/EditTransModal"
import PieGraph from "../../Graphs/PieGraph/PieGraph"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import TopBar from "../../UI/TopBar/TopBar"
import TableTransactions from "../../UI/Tables/TableTransactions/TableTransactions"


const Expense = () => {

    const { userLangID, userCurrency } = useUserContext()
    const { date, transactionExpense, totalPrice, graphData } = useTransactionsContext()

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
    // const [wantSee, setWantSee] = useState(SHOW_TABLE)

    // const toggleWantSee = (id: string) => setWantSee(id)
    const handleHideNewTransModal = () => setShowNewTrans(false)
    const toggleEditModal = () => setShowEditModal(!showEditModal)

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false} showMonthNavigator={true} pageID={PAGE_ID_TRANSACTIONS}/>

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
            />
        )}

        <div className="w-full flex items-center justify-between">
            <SectionTitle value={formatLang(userLangID, "Výdaje", "Expense")} />
            <IconAdd className="icon text-6xl" onClick={ () => setShowNewTrans(true) }/>
        </div>

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

        {/* // TODO - Přidat nastaveni pro telefony */}
        { transactionExpense.length >= 1 && (
            <TableTransactions 
                data={transactionExpense} 
                transType={PAGE_ID_TRANSACTIONS}
                setSelectedTransaction={setSelectedTransaction}
                toggleEditModal={toggleEditModal}
            />
        )}

    </div>
  )
}

export default Expense