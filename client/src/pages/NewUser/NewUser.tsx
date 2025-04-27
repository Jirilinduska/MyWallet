import { useUserContext } from "../../context/UserContext"
import { Navigate } from "react-router-dom"
import NewUserStepper from "../../components/UI/NewUserStepper/NewUserStepper"

const NewUser = () => {

    const { userData } = useUserContext()

    if(userData) {
        if(userData.settings.profileCompleted) {
            return <Navigate to="/"/>
        }
    }

  return <NewUserStepper />

}

export default NewUser