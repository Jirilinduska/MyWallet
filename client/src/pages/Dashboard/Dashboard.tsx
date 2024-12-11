import { useState } from "react"
import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import { IconClose, IconMenu } from "../../utils/icons/icons"
import { useParams } from "react-router-dom"
import Transactions from "../../components/Dashboard/Transactions/Transactions"
import Categories from "../../components/Dashboard/Categories/Categories"
import Overview from "../../components/Dashboard/Overview/Overview"


const Dashboard = () => {

    const [showNav, setShowNav] = useState(false)
    const { pageID } = useParams()

  return (
    <section className="min-h-screen w-full">

        <span 
            onClick={ () => setShowNav((prev) => !prev) } 
            className="text-4xl text-colorBlue fixed top-3 right-3 cursor-pointer icon z-50 md:hidden"
        >
            { showNav ? <IconClose/> : <IconMenu/>}
        </span>

        <Sidebar/>

        { pageID === "transactions" && <Transactions/> }
        { pageID === "income" && <Transactions/> }
        { pageID === "categories" && <Categories/> }
        { pageID === "overview" && <Overview/> }


    </section>
  )
}

export default Dashboard