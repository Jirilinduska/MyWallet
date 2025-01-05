import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { useEffect } from "react"


export const useCompleteProfile = () => {
    const { userData } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (userData && !userData.settings.profileCompleted) {
            navigate("/new-user")
        }
    }, [userData, navigate])
}