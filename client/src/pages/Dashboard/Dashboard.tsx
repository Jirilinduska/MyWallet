import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import { useParams } from "react-router-dom"
import Categories from "../../components/Dashboard/Categories/Categories"
import Overview from "../../components/Dashboard/Overview/Overview"
import Planner from "../../components/Dashboard/Planner/Planner"
import OneBudgetPreview from "../../components/UI/OneBudgetPreview/OneBudgetPreview"
import Expense from "../../components/Dashboard/Expense/Expense"
import Income from "../../components/Dashboard/Income/Income"
import CategoryPreview from "../CategoryPreview/CategoryPreview"
import TransactionsByCategory from "../../components/UI/TransactionsByCategory/TransactionsByCategory"
import Goals from "../../components/Dashboard/Goals/Goals"
import { useCompleteProfile } from "../../hooks/useCompleteProfile"


const Dashboard = () => {

    const { pageID, budgetID, categoryID, showTrans } = useParams()
    
    useCompleteProfile()

  return (
    <section className="min-h-screen w-full">

        <Sidebar/>

        { pageID === "expense" && <Expense/> }
        { pageID === "income" && <Income/> }
        { pageID === "overview" && <Overview/> }
        { pageID === "goals" && <Goals/>}

        { pageID === "categories" && !categoryID && <Categories/> }
        { pageID === "categories" && categoryID && !showTrans && <CategoryPreview/> }
        { pageID === "categories" && categoryID && showTrans && <TransactionsByCategory/> }

        { pageID === "planner" && !budgetID && <Planner /> }
        { pageID === "planner" && budgetID && <OneBudgetPreview /> }


    </section>
  )
}

export default Dashboard