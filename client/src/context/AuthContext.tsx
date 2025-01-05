import { createContext, useContext, useState } from "react"
import { handleChangePassword, handleForgottenPassword, handleLoginUser, handleRegisterUser } from "../API/Auth"
import { handleError } from "../Errors/handleError"
import { LANG_ENGLISH, NOTIF_SUCCESS } from "../config/globals"
import { useUserContext } from "./UserContext"
import { handleNotification } from "../utils/functions/notificationsUtils"

interface AuthContextProps {
    loading: boolean
    loginUser: (email: string, password: string) => void
    registerUser: (name: string, email: string, password: string) => void
    changePassword: (currentPassword: string, newPassword: string) => void
    forgottenPassword: (email: string) => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { userLangID } = useUserContext()

    const [loading, setLoading] = useState(false)

    // POST - Login user
    const loginUser = async(email: string, password: string) => {
        setLoading(true)
        try {
            await handleLoginUser(email, password)
        } catch (error) {
            handleError(error, LANG_ENGLISH)
        } finally {
            setLoading(false)
        }
    }

    // POST - Register user
    const registerUser = async(name: string, email: string, password: string) => {
        setLoading(true)
        try {
            await handleRegisterUser(name, email, password)
        } catch (error) {
            handleError(error, LANG_ENGLISH)
        } finally {
            setLoading(false)
        }
    }

    // POST - Change password 
    const changePassword = async(currentPassword: string, newPassword: string) => {
        setLoading(true)
        try {
            await handleChangePassword(currentPassword, newPassword)
            handleNotification(NOTIF_SUCCESS, userLangID, "Vaše heslo bylo úspěšně změněno", "Your password has been successfully changed")
        } catch (error) {
            handleError(error, userLangID)
        } finally {
            setLoading(false)
        }
    }

    // Post - Forgotten password (send me email code)
    const forgottenPassword = async(email: string) => {
        setLoading(true)
        try {
            await handleForgottenPassword(email)
            handleNotification(NOTIF_SUCCESS, userLangID, "Email byl odeslán", "Email has been sent")
        } catch (error) {
            handleError(error, userLangID)
        } finally {
            setLoading(false)
        }
    }

    return(
        <AuthContext.Provider
            value={{ 
                loading,
                loginUser,
                registerUser,
                changePassword,
                forgottenPassword
             }}
        >
            { children }
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthProvider")
    }
    return context
}