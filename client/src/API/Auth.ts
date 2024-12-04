import { apiClient } from "../config/apiClient"
import { URL_LOGIN_USER, URL_REGISTER_USER } from "../config/apiUrls"


// Login User
export const handleLoginUser = async(email: string, password: string) => {

    const response = await apiClient.post(URL_LOGIN_USER, { email, password })
    localStorage.setItem("token", response.data.token)
    window.location.href = "/"
    
    return response
}

// Register User
export const handleRegisterUser = async(userName: string, email: string, password: string) => {

    const response = await apiClient.post(URL_REGISTER_USER, { userName, email, password })
    localStorage.setItem("token", response.data.token)
    window.location.href = "/new-user"

    return response
}