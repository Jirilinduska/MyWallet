import { createContext, useContext, useEffect, useState } from "react"
import { handleGetUserData } from "../API/User"
import { IUser } from "../utils/interfaces/interfaces"


interface UserContextProps {
    userData: IUser
    userLangID: string
    userCurrency: string
    refreshUserData: () => void
}


export const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [userData, setUserData] = useState<IUser | null>(null)
    const [userLangID, setUserLangID] = useState("")
    const [userCurrency, setUserCurrency] = useState("")

    const fetchData = async() => {
        try {
            const response = await handleGetUserData()
            setUserData(response.data)
            setUserLangID(response.data?.utils?.language)
            setUserCurrency(response.data?.utils?.currency)
        } catch (error) {
            console.log("fetchData() => userDataContext : ", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [] )

    return (
        <UserContext.Provider value={{ userData: userData as IUser, userLangID, userCurrency, refreshUserData: fetchData }}>
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
