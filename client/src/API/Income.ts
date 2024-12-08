import { apiClient } from "../config/apiClient"
import { URL_GET_TRANSACTION } from "../config/apiUrls"
import { CATEGORY_ID_INCOME } from "../config/globals"



export const handleGetIncomes = async(month: number, year: number) => {

    const response = await apiClient.get(`${URL_GET_TRANSACTION}/${month}/${year}/${CATEGORY_ID_INCOME}`)
    return response
}