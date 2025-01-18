import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../../../context/UserContext"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import TopBar from "../../Layout/TopBar/TopBar"
import NavigatorCategories from "../NavigatorCategories/NavigatorCategories"
import { formatLang } from "../../../utils/functions/formatLang"
import TableTransactions from "../TableTransactions/TableTransactions"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import EditTransModal from "../../Modals/EditTransModal/EditTransModal"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import { CATEGORY_ID_TRANSACTION, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { usePageTitle } from "../../../hooks/usePageTitle"

// TODO - při editu - aktualizovat tabulku!

const TransactionsByCategory = () => {

    const { userLangID } = useUserContext()
    const { getCategoryInfo, catInfo } = useCategoriesContext()
    const { getTransactionByCat, transactionsByCategory } = useTransactionsContext()

    const { categoryID, showTrans } = useParams()
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)

    usePageTitle(formatLang(userLangID, `${catInfo?.categoryName} - transakce`, `${catInfo?.categoryName} - transactions`))

    const handleModal = () => setShowModal(!showModal)

    useEffect(() => {
        if(showTrans !== "transactions") {
            navigate(`/dashboard/categories/preview-category/${categoryID}`)
        }
    }, [showTrans, categoryID] )

    useEffect(() => {
        if(categoryID) getCategoryInfo(categoryID, userLangID)
    }, [] )

    useEffect(() => {
        if(categoryID) getTransactionByCat(categoryID)
    }, [categoryID])

  return (
    <div className="section-padding">

        {/* Modal - Edit transaction*/}
        { showModal && selectedTransaction && (
            <EditTransModal
                toggleEditModal={handleModal}
                transaction={selectedTransaction}
                pageID={ catInfo?.categoryType === CATEGORY_ID_TRANSACTION ? PAGE_ID_TRANSACTIONS : PAGE_ID_INCOME }
            />
        )}

        <TopBar showMonthNavigator={false} showYearNavigator={false} />

        <NavigatorCategories pageStage={2} catName={catInfo?.categoryName} catID={catInfo?.categoryID}/>

        <h3 className="font-semibold">
            {formatLang(
                userLangID, 
                `Seznam všech transakcí pro kategorii: ${catInfo?.categoryName}`, 
                `List of all transactions for the category: ${catInfo?.categoryName}`
            )}
        </h3>

        { transactionsByCategory.length === 0 && <p className="text-center my-10">{ formatLang(userLangID, "Žádné transakce", "No transactions") }</p> }
    
        { transactionsByCategory.length >= 1 && catInfo && 
            <TableTransactions 
                data={transactionsByCategory} 
                setSelectedTransaction={setSelectedTransaction} 
                toggleEditModal={handleModal} 
                transType={catInfo?.categoryType} 
            />
        }
    
    </div>
  )
}

export default TransactionsByCategory