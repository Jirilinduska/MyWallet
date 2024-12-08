import { createContext, useContext, useEffect, useState } from "react"
import { ICategory } from "../utils/interfaces/interfaces"
import { handleGetCategories } from "../API/Categories"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../config/globals"

interface CategoriesContextProps {
    categoriesIncome: ICategory[]
    categoriesTransactions: ICategory[]
    refreshCategories: () => void
}

export const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined)

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [categoriesIncome, setCategoriesIncome] = useState<ICategory[]>([])
    const [categoriesTransactions, setCategoriesTransactions] = useState<ICategory[]>([])

    const fetchData = async() => {

        try {
            const income = await handleGetCategories(CATEGORY_ID_INCOME)
            const transactions = await handleGetCategories(CATEGORY_ID_TRANSACTION)
            setCategoriesIncome(income.data)
            setCategoriesTransactions(transactions.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [] )

    return (
        <CategoriesContext.Provider value={{ categoriesIncome, categoriesTransactions, refreshCategories: fetchData }}>
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