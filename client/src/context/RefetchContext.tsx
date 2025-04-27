import { createContext, useContext, useState } from "react"

interface RefetchContextProps {
    overviewDataKey: number
    triggerOverviewDataRefetch: () => void
}

export const RefetchContext = createContext<RefetchContextProps | undefined>(undefined)

export const RefetchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [overviewDataKey, setOverviewDataKey] = useState(0)
    const triggerOverviewDataRefetch = () => setOverviewDataKey(prev => prev + 1)

    return(
        <RefetchContext.Provider
            value={{ 
                overviewDataKey,
                triggerOverviewDataRefetch,
             }}
        >
            { children }
        </RefetchContext.Provider>
    )
}


export const useRefetchContext = () => {
    const context = useContext(RefetchContext)
    if (!context) {
        throw new Error("useRefetchContext must be used within a RefetchProvider")
    }
    return context
}