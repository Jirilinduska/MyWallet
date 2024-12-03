import { Link } from "react-router-dom"
import { handleLogOut } from "../../../utils/functions/handleLogOut"
import ProgressRadius from "../../UI/ProgressRadius/ProgressRadius"

const HeroLogged = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full">
      {/* <button className="" onClick={handleLogOut}>LogOut</button> */}

      <ProgressRadius
        actualPrice={100}
        currency="Kč"
        plannedPrice={200}
        title="Stav Rozpočtu"
      />

      <Link to="/dashboard" className="button-blue">Dashboard</Link>

    </div>
  )
}

export default HeroLogged