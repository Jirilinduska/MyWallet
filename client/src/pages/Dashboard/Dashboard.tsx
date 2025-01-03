import Sidebar from "../../better_components/Layout/Sidebar/Sidebar"
import { useParams } from "react-router-dom"
import Categories from "../../components/Dashboard/Categories/Categories"
import Overview from "../../better_components/Dashboard/Overview/Overview"
import Planner from "../../components/Dashboard/Planner/Planner"
import OneBudgetPreview from "../../components/OneBudgetPreview/OneBudgetPreview"
import Expense from "../../better_components/Dashboard/Expense/Expense"
import Income from "../../better_components/Dashboard/Income/Income"
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview"
import TransactionsByCategory from "../../components/TransactionsByCategory/TransactionsByCategory"
import Goals from "../../better_components/Dashboard/Goals/Goals"


const Dashboard = () => {

    const { pageID, budgetID, categoryID, showTrans } = useParams()

  return (
    <section className="min-h-screen w-full">

        <Sidebar/>

        { pageID === "transactions" && <Expense/> }
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