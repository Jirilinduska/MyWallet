import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import TableRow from "../../../components/UI/Tables/TableRow/TableRow"

interface TableTransactionsProps {
    data: ITransaction[]
    transType: string
    setSelectedTransaction: (transaction: ITransaction) => void
    toggleEditModal: () => void
}

const TableTransactions = ({ data, transType, setSelectedTransaction, toggleEditModal } : TableTransactionsProps ) => {

    const { userLangID } = useUserContext()

  return (

    <div className="flex flex-col text-sm overflow-x-auto shadow-md sm:rounded-lg my-10 animate-fadeIn">

        <div className="flex font-semibold text-gray-400 bg-gray-700 px-2 py-1">
            <div className="hidden xs:block flex-1 p-2 text-left">{formatLang(userLangID, "Datum", "Date")}</div>
            <div className="hidden sm:block flex-1 p-2 text-left">{formatLang(userLangID, "Název", "Title")}</div>
            <div className="flex-1 p-2 text-left">{formatLang(userLangID, "Kategorie", "Category")}</div>
            <div className="flex-1 p-2 text-left">{formatLang(userLangID, "Částka", "Amount")}</div>
            <div className="w-20 p-2 text-center"></div>
        </div>


        { data.map( x  => <TableRow key={x._id} transaction={x} transType={transType} setSelectedTransaction={setSelectedTransaction} toggleEditModal={toggleEditModal}/> )}

    </div>
  )
}

export default TableTransactions