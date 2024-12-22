import { useState } from "react"
import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import { IconClose, IconMenu } from "../../utils/icons/icons"
import { useLocation, useParams } from "react-router-dom"
import Categories from "../../components/Dashboard/Categories/Categories"
import Overview from "../../components/Dashboard/Overview/Overview"
import Planner from "../../components/Dashboard/Planner/Planner"
import OneBudgetPreview from "../../components/OneBudgetPreview/OneBudgetPreview"
import Expense from "../../components/Dashboard/Expense/Expense"
import Income from "../../components/Dashboard/Income/Income"
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview"
import TransactionsByCategory from "../../components/TransactionsByCategory/TransactionsByCategory"


const Dashboard = () => {

    const [showNav, setShowNav] = useState(false)

    const { pageID, budgetID, categoryID, showTrans } = useParams()

  return (
    <section className="min-h-screen w-full">

        <span 
            onClick={ () => setShowNav((prev) => !prev) } 
            className="text-4xl text-colorBlue fixed top-3 right-3 cursor-pointer icon z-50 md:hidden"
        >
            { showNav ? <IconClose/> : <IconMenu/>}
        </span>

        <Sidebar/>

        { pageID === "transactions" && <Expense/> }
        { pageID === "income" && <Income/> }
        { pageID === "overview" && <Overview/> }

        { pageID === "categories" && !categoryID && <Categories/> }
        { pageID === "categories" && categoryID && !showTrans && <CategoryPreview/> }
        { pageID === "categories" && categoryID && showTrans && <TransactionsByCategory/> }

        { pageID === "planner" && !budgetID && <Planner /> }
        { pageID === "planner" && budgetID && <OneBudgetPreview /> }


    </section>
  )
}

export default Dashboard