import { Link } from "react-router-dom"
import ExpenseInfo from "../../ExpenseInfo/ExpenseInfo"
import { useUserContext } from "../../../../context/UserContext"
import { usePageTitle } from "../../../../hooks/usePageTitle"
import Sidebar from "../../../Layout/Sidebar/Sidebar"
import { useCompleteProfile } from "../../../../hooks/useCompleteProfile"
import { formatLang } from "../../../../utils/functions/formatLang"


const HeroLogged = () => {

  const { userData, userLangID } = useUserContext()

  usePageTitle("Home")
  useCompleteProfile()

  return (
    <div className="flex items-center justify-center gap-8 flex-col h-full w-full animate-fadeIn">

      { userData && <h3 className="font-extrabold">{ formatLang(userLangID, `Vítej zpět ${userData.userName}!`, `Welcome back ${userData.userName}!`) }</h3> }
      
      <ExpenseInfo />

      <Link to="/dashboard/overview" className="button-blue">{formatLang(userLangID, "Přehled", "Dashboard")}</Link>

    </div>
  )
}

export default HeroLogged