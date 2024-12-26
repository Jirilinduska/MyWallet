import axios from "axios"
import { handleLogoutUser } from "../API/Auth"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { NOTIF_INFO } from "./globals"

const isTokenExpired = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000
    const now = Date.now()
    return exp < now
}

export const apiClient = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    // baseURL: "https://my-wallet-be.vercel.app",
    headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use((config) => {

    const token = localStorage.getItem("token")

    if(token) {

        if(isTokenExpired(token)) {
            handleLogoutUser()
            handleNotification(NOTIF_INFO, "", "", "You have been logged out. Please log in")
            return Promise.reject(new Error("Token expired"))
        }

        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})