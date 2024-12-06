import { apiClient } from "../config/apiClient"
import { URL_GET_CATEGORIES } from "../config/apiUrls"


export const handleGetCategories = async() => {
    
    const response = await apiClient.get(URL_GET_CATEGORIES)
    return response
}