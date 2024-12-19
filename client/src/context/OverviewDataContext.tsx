import { createContext, useContext, useState } from "react"
import { IOverviewData } from "../utils/interfaces/interfaces"
import { handleGetOverview } from "../API/Overview"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { NOTIF_ERROR } from "../config/globals"



interface OverviewDataProps {
    overviewData?: IOverviewData
    refreshOverviewData: (year: number, month: number) => void
}

export const OverviewDataContext = createContext<OverviewDataProps | undefined>(undefined)

export const OverviewDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [overviewData, setOverviewData] = useState<IOverviewData | undefined>()

    const refreshOverviewData = async(year: number, month: number) => {
        try {
            const response = await handleGetOverview(year, month)
            setOverviewData(response.data)
        } catch (error) {
            handleNotification(NOTIF_ERROR, "", "Něco se pokazilo", "Something went wrong")
            console.log("handleFetchData() => : ", error)
        }
    }

    return (
        <OverviewDataContext.Provider value={{ overviewData, refreshOverviewData }}>
            { children }
        </OverviewDataContext.Provider>
    )
}

export const useOverviewData = () => {
    const context = useContext(OverviewDataContext)
    if (!context) {
        throw new Error("OverviewDataContext must be used within an OverviewDataProvider")
    }
    return context
}