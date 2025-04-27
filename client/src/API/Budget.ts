import { apiClient } from "../config/apiClient"
import { URL_ADD_CAT_TO_BUDGET, URL_DELETE_BUDGET, URL_DELETE_CAT_FROM_BUDGET, URL_EDIT_CAT_AMOUNT, URL_GET_ALL_BUDGETS, URL_GET_BUDGET, URL_GET_BUDGET_BY_ID, URL_NEW_BUDGET, URL_UPDATE_BUDGET } from "../config/apiUrls"
import { IGetBudget, INewBudget } from "../utils/interfaces/interfaces"


export const handleCreateBudget = async(newBudget: INewBudget ) => {

    const response = await apiClient.post(URL_NEW_BUDGET, newBudget)
    return response
}

export const handleGetBudgetByID = async(budgetID: string) => {

    const response = await apiClient.get(`${URL_GET_BUDGET_BY_ID}/${budgetID}`)
    return response
}

export const handleDeleteBudget = async(budgetID: string) => {

    const response = await apiClient.delete(`${URL_DELETE_BUDGET}/${budgetID}`)
    return response 
}

export const handleUpdateBudget = async(newBudget: IGetBudget) => {

    const response = await apiClient.post(URL_UPDATE_BUDGET, newBudget)
    return response
}

export const handleGetAllBudgets = async() => {
    const response = await apiClient.get(URL_GET_ALL_BUDGETS)
    return response
}

export const handleDeleteCatFromBudget = async(catID: string, budgetID: string) => {
    await apiClient.delete(`${URL_DELETE_CAT_FROM_BUDGET}/${catID}/${budgetID}`)
    
}

export const handleEditCatAmount = async(categoryID: string, budgetID: string, amount: number) => {
    await apiClient.post(`${URL_EDIT_CAT_AMOUNT}`, { categoryID, budgetID, amount })
}

export const handleAddCategoryToBudget = async(categoryID: string, budgetID: string) => {
    await apiClient.post(URL_ADD_CAT_TO_BUDGET, { categoryID, budgetID })
}
