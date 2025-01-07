import { createContext, useContext, useEffect, useState } from "react"
import { handleGetUserData, handleUpdateUserData } from "../API/User"
import { IUser, IUserDataUpdate } from "../utils/interfaces/interfaces"
import { handleError } from "../Errors/handleError"


interface UserContextProps {
    userData: IUser
    userLangID: string
    userCurrency: string
    refreshUserData: () => void
    updateUserData: (userData: IUserDataUpdate) => void
}


export const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [userData, setUserData] = useState<IUser | null>(null)
    const [userLangID, setUserLangID] = useState("")
    const [userCurrency, setUserCurrency] = useState("")

    // GET - get user data
    const fetchData = async() => {
        try {
            const response = await handleGetUserData()
            setUserData(response.data)
            setUserLangID(response.data?.utils?.language)
            setUserCurrency(response.data?.utils?.currency)
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    // PATCH - update user data 
    const updateUserData = async(userData: IUserDataUpdate) => {
        try {
            await handleUpdateUserData(userData)
            await fetchData()
        } catch (error) {
            handleError(error, userData.language)
        }
    }

    useEffect(() => {
        fetchData()
    }, [] )

    return (
        <UserContext.Provider value={{ userData: userData as IUser, userLangID, userCurrency, refreshUserData: fetchData, updateUserData }}>
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider")
    }
    return context
}
