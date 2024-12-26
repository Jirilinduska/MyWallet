import React, { createContext, useContext, useState } from "react"

interface UtilsContextProps {
    showNav: boolean
    toggleNav: () => void
    hideNav: () => void
}

export const UtilsContext = createContext<UtilsContextProps | undefined>(undefined)

export const UtilsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [showNav, setShowNav] = useState(false)

    const toggleNav = () => setShowNav( prev => !prev )
    const hideNav = () => setShowNav(false)

    return(
        <UtilsContext.Provider value={{ showNav, toggleNav, hideNav }}>
            { children }
        </UtilsContext.Provider>
    )
}


export const useUtilsContext = () => {
    const context = useContext(UtilsContext)
    if(!context) {
        throw new Error("useUtilsContext must be used within a UtilsProvider")
    }
    return  context
}