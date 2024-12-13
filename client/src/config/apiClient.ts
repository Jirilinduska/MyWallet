import axios from "axios"
import { handleLogoutUser } from "../API/Auth"

const isTokenExpired = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000
    const now = Date.now()
    return exp < now
}

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use((config) => {

    const token = localStorage.getItem("token")

    if(token) {

        if(isTokenExpired(token)) {
            handleLogoutUser()
            return Promise.reject(new Error("Token expired"))
        }

        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})