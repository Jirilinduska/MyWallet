import { createContext, useContext, useEffect, useState } from "react"
import { IOverviewData } from "../utils/interfaces/interfaces"
import { handleGetOverview } from "../API/Overview"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { NOTIF_ERROR } from "../config/globals"

interface OverviewDataProps {
    overviewData?: IOverviewData
    refreshOverviewData: (year: number, month: number) => void
    year: number
    month: number
    handlePrevYear: () => void
    handleNextYear: () => void
}

export const OverviewDataContext = createContext<OverviewDataProps | undefined>(undefined)

export const OverviewDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [overviewData, setOverviewData] = useState<IOverviewData | undefined>()
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)

    const handlePrevYear = () => setYear(year - 1)
    const handleNextYear = () => setYear(year + 1)

    const refreshOverviewData = async(year: number, month: number) => {
        try {
            const response = await handleGetOverview(year, month)
            console.log("Overview: ", response.data)
            setOverviewData(response.data)
        } catch (error) {
            handleNotification(NOTIF_ERROR, "", "Něco se pokazilo", "Something went wrong")
            console.log("handleFetchData() => : ", error)
        }
    }

    useEffect(() => {
        refreshOverviewData(year, month)
    }, [year, month])

    return (
        <OverviewDataContext.Provider value={{ overviewData, refreshOverviewData, year, month, handleNextYear, handlePrevYear }}>
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