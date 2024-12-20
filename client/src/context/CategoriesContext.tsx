import { createContext, useContext, useEffect, useState } from "react"
import { CategoryDetails, ICategory, ICategoryPreview, IGraphBreakdownData } from "../utils/interfaces/interfaces"
import { handleDeleteCategory, handleGetCategories, handleGetCategoryInfo } from "../API/Categories"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, NOTIF_ERROR, NOTIF_INFO} from "../config/globals"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { categoryIcons } from "../utils/icons/category-icons"
import { formatLang } from "../utils/functions/formatLang"


// TODO - Přida do všech contextů i ostatní funkce :)

interface CategoriesContextProps {
    categoriesIncome: ICategory[]
    categoriesTransactions: ICategory[]
    refreshCategories: () => void
    deleteCategory: (catID: string, userLangID: string, catName: string) => void
    getCategoryInfo: (catID: string, userLangID: string) => void
    catInfo: ICategoryPreview | null
}

export const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined)

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [categoriesIncome, setCategoriesIncome] = useState<ICategory[]>([])
    const [categoriesTransactions, setCategoriesTransactions] = useState<ICategory[]>([])
    const [catInfo, setCatInfo] = useState<ICategoryPreview | null>(null)

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

    const deleteCategory = async(catID: string, userLangID: string, catName: string) => {
        
        try {
            await handleDeleteCategory(catID)
            await fetchData()
            handleNotification(NOTIF_INFO, userLangID, `Kategorie: ${catName} byla odstraněna.`, `Category: ${catName} has been deleted.`);
        } catch (error) {
            handleNotification(NOTIF_ERROR, userLangID, "Něco se pokazilo", "Something went wrong")
        }
    }

    const getCategoryInfo = async(catID: string, userLangID: string) => {
        try {
            const response = await handleGetCategoryInfo(catID)
            // console.log("PREVIEW: ", response)
            setCatInfo(response.data)
        } catch (error) {
            handleNotification(NOTIF_ERROR, userLangID,  "Něco se pokazilo", "Something went wrong")
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [] )

    return (
        <CategoriesContext.Provider value={{ categoriesIncome, categoriesTransactions, refreshCategories: fetchData, deleteCategory, getCategoryInfo, catInfo }}>
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