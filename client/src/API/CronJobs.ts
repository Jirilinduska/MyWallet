import { apiClient } from "../config/apiClient"
import { URL_MONTH_SUMMARY } from "../config/apiUrls"



export const handleMonthSummary = async() => {

    const response = await apiClient.post(URL_MONTH_SUMMARY)
    return response
}