import { apiClient } from "../config/apiClient"
import { URL_CHANGE_PASSWORD, URL_CHECK_RESET_TOKEN, URL_FORGOTTEN_PASSWORD, URL_LOGIN_USER, URL_REGISTER_USER, URL_RESET_PASSWORD } from "../config/apiUrls"


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

// Change password
export const handleChangePassword = async(currentPassword: string, newPassword: string, newPasswordAgain: string) => {
    const response = await apiClient.post(URL_CHANGE_PASSWORD, { currentPassword, newPassword })
    return response
}

// Send me code (forgotten password)
export const handleForgottenPassword = async(email: string) => {

    const response = await apiClient.post(URL_FORGOTTEN_PASSWORD, { email } )
    return response
}

// Check if token is valid (forgotten password)
export const handleIsTokenValid = async(token: string) => {

    const response = await apiClient.get(`${URL_CHECK_RESET_TOKEN}/${token}`)
    return response
}

// Reset password (forgotten password)
export const handleResetPassword = async(token: string, newPassword: string) => {

    const response = await apiClient.post(URL_RESET_PASSWORD, { token, newPassword })
    return response
}

// Logout 
export const handleLogoutUser = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
}