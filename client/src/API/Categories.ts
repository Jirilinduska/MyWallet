import { apiClient } from "../config/apiClient"
import { URL_GET_CATEGORIES } from "../config/apiUrls"


export const handleGetCategories = async(categoryType: string) => {
    
    const response = await apiClient.get(`${URL_GET_CATEGORIES}/${categoryType}`)
    return response
}