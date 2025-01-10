import { createContext, useContext, useEffect, useState } from "react"
import { IGetBudget, INewBudget } from "../utils/interfaces/interfaces"
import { handleCreateBudget, handleDeleteBudget, handleGetBudget, handleUpdateBudget } from "../API/Budget"
import { handleError } from "../Errors/handleError"
import { useUserContext } from "./UserContext"
import { useOverviewData } from "./OverviewDataContext"

interface BudgetContextProps {
    budgets: IGetBudget[]
    refreshBudgets: () => void
    createBudget: (newBudget: INewBudget) => void
    deleteBudget: (budgetID: string) => void
    updateBudget: (newBudget: IGetBudget) => void
}


export const BudgetContext = createContext<BudgetContextProps | undefined>(undefined)

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1

    const { userLangID } = useUserContext()
    const { refreshOverviewData } = useOverviewData()

    const [budgets, setBudgets] = useState<IGetBudget[]>([])

    // GET  - Get all budgets
    const refreshBudgets = async() => {
        try {
            const response = await handleGetBudget()
            const data : IGetBudget[] = response.data
            const sortedBudgets = data.sort((a, b) => {
                if (a.year !== b.year) {
                    return a.year - b.year
                }
                return a.month - b.month
            })
            setBudgets(sortedBudgets)
        } catch (error) {
            handleError(error,userLangID)
        }
    }

    // POST - Create new budget
    const createBudget = async(newBudget: INewBudget) => {
        try {
            await handleCreateBudget(newBudget)
            await refreshBudgets()
            refreshOverviewData(year, month)
        } catch (error) {
            handleError(error,userLangID)
        }
    }

    // DELETE - Delete budget
    const deleteBudget = async(budgetID: string) => {
        try {
            await handleDeleteBudget(budgetID)
            setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget._id !== budgetID))
            refreshOverviewData(year, month)
        } catch (error) {
            handleError(error,userLangID)
        }
    }

    // POST -  Update budget
    const updateBudget = async(newBudget: IGetBudget) => {
        try {
            await handleUpdateBudget(newBudget)
            await refreshBudgets()
            refreshOverviewData(year, month)
        } catch (error) {
            handleError(error,userLangID)
        }
    }

    useEffect(() => {
        refreshBudgets()
    }, [] )


    return(
        <BudgetContext.Provider value={{ budgets, refreshBudgets, createBudget, deleteBudget, updateBudget }}>
            { children }
        </BudgetContext.Provider>
    )
}

export const useBudgetContext = () => {
    const context = useContext(BudgetContext)
    if (!context) {
        throw new Error("useBudgetContext must be used within a BudgetProvider")
    }
    return context
}