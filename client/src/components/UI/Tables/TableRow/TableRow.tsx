import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../../config/globals"
import { useCategoriesContext } from "../../../../context/CategoriesContext"
import { useUserContext } from "../../../../context/UserContext"
import { formatLang } from "../../../../utils/functions/formatLang"
import { formatCurrency } from "../../../../utils/functions/formatNumber"
import { ITransaction } from "../../../../utils/interfaces/interfaces"

interface TableRowProps {
    transaction: ITransaction
    transType: string;
    setSelectedTransaction: (transaction: ITransaction) => void
    toggleEditModal: () => void
}

const TableRow = ({ transaction, transType, setSelectedTransaction, toggleEditModal }: TableRowProps) => {

    const { categoriesIncome, categoriesTransactions } = useCategoriesContext()
    const { userCurrency, userLangID } = useUserContext()

    const categoryID = transaction.category
    let categoryName = "Neznámá kategorie";

    if (transType === PAGE_ID_INCOME) {
        categoryName = categoriesIncome.find(cat => cat._id === categoryID)?.name || "Neznámá kategorie"
    } else if (transType === PAGE_ID_TRANSACTIONS) {
        categoryName = categoriesTransactions.find(cat => cat._id === categoryID)?.name || "Neznámá kategorie"
    }

    return (
        <div className="flex border-b text-xs sm:text-sm bg-gray-800 border-gray-700 text-gray-400 py-2 relative">

            <div className="flex-1 p-2 text-left pl-4 hidden xs:block">
                <span className="hidden sm:block">{`${transaction.day}.${transaction.month}.${transaction.year}`}</span>
                <span className="block sm:hidden">{`${transaction.day}.${transaction.month}`}</span>
            </div>

            <div className="hidden sm:block flex-1 p-2 text-left">
                {transaction.title || ""}
            </div>

            <div className="flex-1 p-2 text-left">
                {categoryName}
            </div>

            <div className="flex-1 p-2 text-left">
                {formatCurrency(transaction.amount, userCurrency)}
            </div>

            <div className="w-20 p-2 text-center">
                <span
                    onClick={ () => {
                       setSelectedTransaction(transaction)
                       toggleEditModal() 
                    }} 
                    className="font-medium text-blue-500 cursor-pointer hover:underline"
                >
                    <span className="block sm:hidden">{formatLang(userLangID, "Detaily", "Details")}</span>
                    <span className="hidden sm:block">{formatLang(userLangID, "Upravit", "Edit")}</span>
                </span>
            </div>

        </div>
    )
}

export default TableRow