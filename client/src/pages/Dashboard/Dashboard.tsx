import { useState } from "react"
import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import { IconClose, IconMenu } from "../../utils/icons/icons"


const Dashboard = () => {

    const [showNav, setShowNav] = useState(false)

  return (
    <section className="min-h-screen w-full">

        <span 
            onClick={ () => setShowNav((prev) => !prev) } 
            className="text-4xl text-colorBlue fixed top-3 right-3 cursor-pointer icon z-50 md:hidden"
        >
            { showNav ? <IconClose/> : <IconMenu/>}
        </span>

        <Sidebar/>


    </section>
  )
}

export default Dashboard