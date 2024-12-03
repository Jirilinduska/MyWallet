import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { IPrivateRoute } from "../../utils/interfaces/interfaces"


const PrivateRoute = ({ children }: IPrivateRoute) => {

    const token = localStorage.getItem("token")

    if(!token) return <Navigate to="/"/>
    
    return <>{children}</>
}

export default PrivateRoute