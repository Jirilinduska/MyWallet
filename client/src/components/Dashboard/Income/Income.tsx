import { useEffect, useState } from "react"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { IconAdd } from "../../../utils/icons/icons"
import MonthNavigator from "../../UI/DateStuff/MonthNavigator/MonthNavigator"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import EditTransModal from "../../UI/Modals/EditTransModal/EditTransModal"
import { BarLoader } from "react-spinners"
import PieGraph from "../../Graphs/PieGraph/PieGraph"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import TopBar from "../../UI/TopBar/TopBar"
import TableTransactions from "../../UI/Tables/TableTransactions/TableTransactions"

const Income = () => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()
    const { date, fetchIncomeData, transactionIncome, totalPrice, graphData } = useTransactionsContext()

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)


    const handleHideNewTransModal = () => setShowNewTrans(false)
    const toggleEditModal = () => setShowEditModal(!showEditModal)

    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [] )

    useEffect(() => {
        fetchIncomeData(date.month, date.year)
    }, [] )

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false} showMonthNavigator={true} pageID={PAGE_ID_INCOME}/>

        {/* Modal window - Edit transaction */}
        { showEditModal && selectedTransaction && (
            <EditTransModal 
                toggleEditModal={toggleEditModal}
                transaction={selectedTransaction}
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
        <div className="w-full flex items-center justify-between">
            <SectionTitle value={formatLang(userLangID, "Příjmy", "Income")} />
            <IconAdd className="icon text-6xl" onClick={ () => setShowNewTrans(true) }/>
        </div>

        <MonthNavigator pageID={PAGE_ID_INCOME} monthName={getMonthName(date.year, date.month, userLangID)} />

        {/* // TODO - Změnit content, pokud není income/expense pro daný mesic... */}
        { transactionIncome.length === 0 && (
            <div className="flex items-center justify-center mt-20">
                <p className="h-full">
                    {formatLang(userLangID, 
                        `Žádné příjmy pro ${getMonthName(date.year, date.month, userLangID)} (${date.year})`,
                        `No incomes for ${getMonthName(date.year, date.month, userLangID)} (${date.year})`,
                    )}
                </p>
            </div>
        )}

        {/* // TODO - Dodelat header a dat do nej sekci podtímto :) */}
        {/* <TransactionsHeader/> */}

        { transactionIncome.length >= 1 && (
            <div className="flex items-center justify-between">
                <PieGraph langID={userLangID} pageID={PAGE_ID_INCOME} graphData={graphData}/>
                <p className="font-bold">{formatCurrency(totalPrice, userCurrency)}</p>
                {/* // TODO - Přidat souhr utra podle kategorii! (graphData) */}
            </div>
        )}

        {/* // TODO - Změnit zobrazení "tabulky" na mobilu. - Nová komponenta! */}
        {/* { transactionIncome.length >= 1 && (
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
        )} */}

        { transactionIncome.length >= 1 && (
            <TableTransactions
                data={transactionIncome}
                setSelectedTransaction={setSelectedTransaction}
                toggleEditModal={toggleEditModal}
                transType={PAGE_ID_INCOME}
            />
        )}  

    </div>
  )
}

export default Income