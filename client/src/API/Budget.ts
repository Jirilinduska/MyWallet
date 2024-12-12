import { apiClient } from "../config/apiClient"
import { URL_DELETE_BUDGET, URL_GET_BUDGET, URL_NEW_BUDGET, URL_UPDATE_BUDGET } from "../config/apiUrls"
import { IGetBudget, INewBudget } from "../utils/interfaces/interfaces"


export const handleCreateBudget = async(newBudget: INewBudget ) => {

    const response = await apiClient.post(URL_NEW_BUDGET, newBudget)
    return response
}

export const handleGetBudget = async() => {

    const response = await apiClient.get(URL_GET_BUDGET)
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