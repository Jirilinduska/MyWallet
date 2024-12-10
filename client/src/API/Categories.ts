import { apiClient } from "../config/apiClient"
import { URL_DELETE_CATEGORY, URL_GET_CATEGORIES, URL_NEW_CATEGORY, URL_UPDATE_CATEGORY } from "../config/apiUrls"
import { INewCategory } from "../utils/interfaces/interfaces"


export const handleGetCategories = async(categoryType: string) => {
    
    const response = await apiClient.get(`${URL_GET_CATEGORIES}/${categoryType}`)
    return response
}

export const handleNewCategory = async(newCategory: INewCategory) => {

    const response = await apiClient.post(URL_NEW_CATEGORY, newCategory)
    return response
}

export const handleUpdateCategory = async(category: INewCategory) => {

    const response = await apiClient.patch(URL_UPDATE_CATEGORY, category)
    return response
}

export const handleDeleteCategory = async(id: string) => {

    const response = await apiClient.delete(`${URL_DELETE_CATEGORY}/${id}`)
    return response
}