import { useState } from "react"
import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import { IconClose, IconMenu } from "../../utils/icons/icons"
import { useLocation, useParams } from "react-router-dom"
import Transactions from "../../components/Dashboard/Transactions/Transactions"
import Categories from "../../components/Dashboard/Categories/Categories"
import Overview from "../../components/Dashboard/Overview/Overview"
import Planner from "../../components/Dashboard/Planner/Planner"
import OneBudgetPreview from "../../components/OneBudgetPreview/OneBudgetPreview"
import Expense from "../../components/Dashboard/Expense/Expense"
import Income from "../../components/Dashboard/Income/Income"


const Dashboard = () => {

    const [showNav, setShowNav] = useState(false)

    const { pageID, budgetID } = useParams()

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
        { pageID === "categories" && <Categories/> }
        { pageID === "overview" && <Overview/> }
        { pageID === "planner" && !budgetID && <Planner /> }
        { pageID === "planner" && budgetID && <OneBudgetPreview /> }


    </section>
  )
}

export default Dashboard