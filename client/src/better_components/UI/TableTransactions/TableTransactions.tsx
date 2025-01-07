import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import TableRow from "../../../components/UI/Tables/TableRow/TableRow"
import { useState } from "react"
import { IconSort } from "../../../utils/icons/icons"

interface TableTransactionsProps {
    data: ITransaction[]
    transType: string
    setSelectedTransaction: (transaction: ITransaction) => void
    toggleEditModal: () => void
}

const TableTransactions = ({ data, transType, setSelectedTransaction, toggleEditModal } : TableTransactionsProps ) => {

    const { userLangID } = useUserContext()

    const [sortedData, setSortedData] = useState(data)
    const [isAscendingDate, setIsAscendingDate] = useState(true)
    const [isAscendingAmount, setIsAscendingAmount] = useState(true)

    const sortByDate = () => {
      
      const sorted = sortedData.sort( (a, b) => {

        const dateA = new Date(a.year, a.month - 1, a.day)
        const dateB = new Date(b.year, b.month - 1, b.day)

        if (isAscendingDate) {
          return dateA.getTime() - dateB.getTime();
        }

        return dateB.getTime() - dateA.getTime()
      })

      setSortedData(sorted)
      setIsAscendingDate(!isAscendingDate)
    }

    const sortByAmount = () => {
      const sorted = sortedData.sort((a, b) => {
        return isAscendingAmount ? a.amount - b.amount : b.amount - a.amount
      })
  
      setSortedData(sorted)
      setIsAscendingAmount(!isAscendingAmount)
    }

  return (

    <div className="flex flex-col text-sm overflow-x-auto shadow-md sm:rounded-lg my-10 animate-fadeIn">

        <div className="flex font-semibold text-gray-400 bg-gray-700 px-2 py-1">

            <div 
              onClick={sortByDate} 
              className="hidden xs:flex flex-1 p-2 items-center cursor-pointer text-left hover:text-blue-500"
            >
              {formatLang(userLangID, "Datum", "Date")}
              <IconSort/>
            </div>

            <div className="hidden sm:block flex-1 p-2 text-left">{formatLang(userLangID, "Název", "Title")}</div>

            <div className="flex-1 p-2 text-left">{formatLang(userLangID, "Kategorie", "Category")}</div>

            <div 
              onClick={sortByAmount}
              className="flex-1 p-2 text-left flex items-center cursor-pointer hover:text-blue-500"
            >
              {formatLang(userLangID, "Částka", "Amount")}
              <IconSort/>
            </div>

            <div className="w-20 p-2 text-center"></div>
        </div>


        { data.map( x  => <TableRow key={x._id} transaction={x} transType={transType} setSelectedTransaction={setSelectedTransaction} toggleEditModal={toggleEditModal}/> )}

    </div>
  )
}

export default TableTransactions