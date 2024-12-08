import { apiClient } from "../config/apiClient"
import { URL_GET_CATEGORIES, URL_NEW_CATEGORY } from "../config/apiUrls"
import { INewCategory } from "../utils/interfaces/interfaces"


export const handleGetCategories = async(categoryType: string) => {
    
    const response = await apiClient.get(`${URL_GET_CATEGORIES}/${categoryType}`)
    return response
}

export const handleNewCategory = async(newCategory: INewCategory) => {

    const response = await apiClient.post(URL_NEW_CATEGORY, newCategory)
    return response
}