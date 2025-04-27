import { apiClient } from "../config/apiClient"
import { URL_GET_OVERVIEW } from "../config/apiUrls"


export const handleGetOverview = async(year: number) => {

    const response = await apiClient.get(`${URL_GET_OVERVIEW}/${year}`)
    return response
}