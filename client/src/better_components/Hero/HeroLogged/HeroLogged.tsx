import { Link, Navigate } from "react-router-dom"
import ExpenseInfo from "../../../components/UI/ExpenseInfo/ExpenseInfo"
import { useUserContext } from "../../../context/UserContext"
import { useEffect } from "react"
import { usePageTitle } from "../../../hooks/usePageTitle"


const HeroLogged = () => {

  const { userData } = useUserContext()

  usePageTitle("Home")

  if(userData) {
    if(!userData.settings.profileCompleted) {
        return <Navigate to="/new-user"/>
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full w-full">

      { userData && <h3 className="">Welcome back {userData.userName}!</h3> }

      <div className="flex flex-col items-center justify-between gap-10 xl:flex-row">
        <ExpenseInfo />
      </div>

      <Link to="/dashboard/overview" className="button-blue">Dashboard</Link>

    </div>
  )
}

export default HeroLogged