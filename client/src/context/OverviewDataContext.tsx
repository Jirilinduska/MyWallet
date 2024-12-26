import { createContext, useContext, useEffect, useState } from "react"
import { IOverviewData } from "../utils/interfaces/interfaces"
import { handleGetOverview } from "../API/Overview"

interface OverviewDataProps {
    overviewData?: IOverviewData
    refreshOverviewData: (year: number, month: number) => void
    year: number
    month: number
    handlePrevYear: () => void
    handleNextYear: () => void
    loading: boolean
}

export const OverviewDataContext = createContext<OverviewDataProps | undefined>(undefined)

export const OverviewDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [overviewData, setOverviewData] = useState<IOverviewData | undefined>()
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [loading, setLoading] = useState(false)

    const handlePrevYear = () => setYear(year - 1)
    const handleNextYear = () => setYear(year + 1)

    const refreshOverviewData = async(year: number, month: number) => {
        try {
            setLoading(true)
            const response = await handleGetOverview(year, month)
            setOverviewData(response.data)
        } catch (error) {
            console.log("refreshOverviewData() => : ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshOverviewData(year, month)
    }, [year, month])

    return (
        <OverviewDataContext.Provider value={{ overviewData, refreshOverviewData, year, month, handleNextYear, handlePrevYear, loading }}>
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