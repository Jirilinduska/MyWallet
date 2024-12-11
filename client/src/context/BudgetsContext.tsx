import { createContext, useContext, useEffect, useState } from "react"
import { IBudget, INewBudget } from "../utils/interfaces/interfaces"
import { handleCreateBudget, handleDeleteBudget, handleGetBudget } from "../API/Budget"


interface BudgetContextProps {
    budgets: IBudget[]
    refreshBudgets: () => void
    createBudget: (newBudget: INewBudget) => void
    deleteBudget: (budgetID: string) => void
}


export const BudgetContext = createContext<BudgetContextProps | undefined>(undefined)

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [budgets, setBudgets] = useState<IBudget[]>([])


    // GET  - Get all budgets
    const refreshBudgets = async() => {
        try {
            const response = await handleGetBudget()
            setBudgets(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // POST - Create new budget
    const createBudget = async(newBudget: INewBudget) => {
        try {
            await handleCreateBudget(newBudget)
        } catch (error) {
            console.log(error)
        }
    }

    // DELETE - Delete budget
    const deleteBudget = async(budgetID: string) => {
        try {
            await handleDeleteBudget(budgetID)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        refreshBudgets()
    }, [] )


    return(
        <BudgetContext.Provider value={{ budgets, refreshBudgets, createBudget, deleteBudget }}>
            { children }
        </BudgetContext.Provider>
    )
}

export const useBudgetContext = () => {
    const context = useContext(BudgetContext)
    if (!context) {
        throw new Error("useCategoriesContext must be used within a CategoriesProvider")
    }
    return context
}