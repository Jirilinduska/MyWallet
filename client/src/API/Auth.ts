import { apiClient } from "../config/apiClient"
import { URL_LOGIN_USER, URL_REGISTER_USER } from "../config/apiUrls"


// Login User
export const handleLoginUser = async(email: string, password: string) => {

    let result

    try {
        const response = await apiClient.post(URL_LOGIN_USER, { email, password })
        result = response.data
        localStorage.setItem("token", response.data.token)
        window.location.href = "/"
    } catch (error) {
        console.log("handleLoginUser() => : ", error)
        // TODO result = error.message
    }
    return result
}

// Register User
export const handleRegisterUser = async(userName: string, email: string, password: string) => {

    let result

    try {
        const response = await apiClient.post(URL_REGISTER_USER, { userName, email, password })
        console.log("response: ", response)
        localStorage.setItem("token", response.data.token)
        window.location.href = "/new-user"
    } catch (error) {
        console.log("handleRegisterUser() => : ", error)
        // TODO result = error.message
    }
    return result
}