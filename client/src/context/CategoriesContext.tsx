import { createContext, useContext, useEffect, useState } from "react"
import { ICategory } from "../utils/interfaces/interfaces"
import { handleGetCategories } from "../API/Categories"

interface CategoriesContextProps {
    categories: ICategory[]
    refreshCategories: () => void
}

export const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined)

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [categories, setCategories] = useState<ICategory[]>([])

    const fetchData = async() => {

        try {
            const response = await handleGetCategories()
            console.log(response)
            setCategories(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [] )

    return (
        <CategoriesContext.Provider value={{ categories, refreshCategories: fetchData }}>
          {children}
        </CategoriesContext.Provider>
    )
}

export const useCategoriesContext = () => {
    const context = useContext(CategoriesContext)
    if (!context) {
        throw new Error("useCategoriesContext must be used within a CategoriesProvider")
    }
    return context
}