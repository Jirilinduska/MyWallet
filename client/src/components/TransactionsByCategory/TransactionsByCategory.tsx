import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import { useCategoriesContext } from "../../context/CategoriesContext"
import TopBar from "../UI/TopBar/TopBar"
import NavigatorCategories from "../NavigatorCategories/NavigatorCategories"
import SectionTitle from "../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../utils/functions/formatLang"
import TableTransactions from "../UI/Tables/TableTransactions/TableTransactions"
import { useTransactionsContext } from "../../context/TransactionsContext"
import EditTransModal from "../UI/Modals/EditTransModal/EditTransModal"
import { ITransaction } from "../../utils/interfaces/interfaces"
import { CATEGORY_ID_TRANSACTION, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../config/globals"

// TODO http://localhost:3000/dashboard/categories/preview-category/6760b39337cfdfa6dea08984/transactions
// TODO - Dokončit tabulku, modal atd...

const TransactionsByCategory = () => {

    const { userLangID } = useUserContext()
    const { getCategoryInfo, catInfo } = useCategoriesContext()
    const { getTransactionByCat, transactionsByCategory } = useTransactionsContext()

    const { categoryID, showTrans } = useParams()
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)

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
        {/* // TODO - Vyřešeit problémy (chybí nadpis, setSelected(null)) */}
        { showModal && selectedTransaction && (
            <EditTransModal
                toggleEditModal={handleModal}
                transaction={selectedTransaction}
                pageID={ catInfo?.categoryType === CATEGORY_ID_TRANSACTION ? PAGE_ID_TRANSACTIONS : PAGE_ID_INCOME }
            />
        )}

        <TopBar showMonthNavigator={false} showYearNavigator={false} />

        <NavigatorCategories pageStage={2} catName={catInfo?.categoryName} catID={catInfo?.categoryID}/>

        <SectionTitle value={formatLang(userLangID, `Seznam všech transakcí pro kategorii: ${catInfo?.categoryName}`, `List of all transactions for the category: ${catInfo?.categoryName}`)}/>
    
        {/* // TODO - Boční funkce... přidat do kontextu! */}
        {/* <TableTransactions /> */}
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