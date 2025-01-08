import { Link, Navigate } from "react-router-dom"
import ExpenseInfo from "../../UI/ExpenseInfo/ExpenseInfo"
import { useUserContext } from "../../../context/UserContext"
import { usePageTitle } from "../../../hooks/usePageTitle"
import Sidebar from "../../Layout/Sidebar/Sidebar"
import { useCompleteProfile } from "../../../hooks/useCompleteProfile"
import { formatLang } from "../../../utils/functions/formatLang"


const HeroLogged = () => {

  const { userData, userLangID } = useUserContext()

  usePageTitle("Home")
  useCompleteProfile()

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full w-full">

      {/* <Sidebar/> */}

      { userData && <h3 className="">{ formatLang(userLangID, `Vítej zpět ${userData.userName}`, `Welcome back ${userData.userName}`) }</h3> }

      <div className="flex flex-col items-center justify-between gap-10 xl:flex-row">
        <ExpenseInfo />
      </div>

      <Link to="/dashboard/overview" className="button-blue">Dashboard</Link>

    </div>
  )
}

export default HeroLogged