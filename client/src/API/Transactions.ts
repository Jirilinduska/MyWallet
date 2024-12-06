import { apiClient } from "../config/apiClient"
import { URL_GET_TRANSACTION, URL_NEW_TRANSACTION } from "../config/apiUrls"


// Add new transaction
export const handleNewTransaction = async(newTransObject: any) => {

    const response = await apiClient.post(URL_NEW_TRANSACTION, newTransObject)
    return response
}

// Get transaction
export const handleGetTransactions = async(month: number, year: number) => {

    const reponse = await apiClient.get(`${URL_GET_TRANSACTION}/${month}/${year}`)
    return reponse
}

export const handleDeleteTransaction = async() => {}

export const handleEditTransaction = async() => {}