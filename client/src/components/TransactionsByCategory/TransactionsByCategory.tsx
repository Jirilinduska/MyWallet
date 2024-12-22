import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { handleGetCategoryInfo } from "../../API/Categories"
import { useUserContext } from "../../context/UserContext"
import { useCategoriesContext } from "../../context/CategoriesContext"
import TopBar from "../UI/TopBar/TopBar"
import NavigatorCategories from "../NavigatorCategories/NavigatorCategories"
import SectionTitle from "../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../utils/functions/formatLang"
import TableTransactions from "../UI/Tables/TableTransactions/TableTransactions"
import { useTransactionsContext } from "../../context/TransactionsContext"

// TODO http://localhost:3000/dashboard/categories/preview-category/6760b39337cfdfa6dea08984/transactions
// TODO - Dokončit tabulku, modal atd...

const TransactionsByCategory = () => {

    const { userLangID } = useUserContext()
    const { getCategoryInfo, catInfo } = useCategoriesContext()
    const { getTransactionByCat, transactionsByCategory } = useTransactionsContext()

    const { categoryID, showTrans } = useParams()
    const navigate = useNavigate()

    const testFunction = () => {}

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

        <TopBar showMonthNavigator={false} showYearNavigator={false} />

        <NavigatorCategories pageStage={2} catName={catInfo?.categoryName} />

        <SectionTitle value={formatLang(userLangID, `Seznam všech transakcí pro kategorii: ${catInfo?.categoryName}`, `List of all transactions for the category: ${catInfo?.categoryName}`)}/>
    
        {/* // TODO - Boční funkce... přidat do kontextu! */}
        {/* <TableTransactions /> */}
        { transactionsByCategory.length >= 1 && catInfo && 
            <TableTransactions 
                data={transactionsByCategory} 
                setSelectedTransaction={testFunction} 
                toggleEditModal={testFunction} 
                transType={catInfo?.categoryType} 
            />
        }
    
    </div>
  )
}

export default TransactionsByCategory