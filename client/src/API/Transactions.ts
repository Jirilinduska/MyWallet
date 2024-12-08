import { apiClient } from "../config/apiClient"
import { URL_DELETE_TRANSACTION, URL_GET_TRANSACTION, URL_NEW_TRANSACTION, URL_UPDATE_TRANSACTION } from "../config/apiUrls"
import { CATEGORY_ID_TRANSACTION } from "../config/globals"


// Add new transaction
export const handleNewTransaction = async(newTransObject: any) => {

    const response = await apiClient.post(URL_NEW_TRANSACTION, newTransObject)
    return response
}

// Get transaction
export const handleGetTransactions = async(month: number, year: number) => {

    const reponse = await apiClient.get(`${URL_GET_TRANSACTION}/${month}/${year}/${CATEGORY_ID_TRANSACTION}`)
    return reponse
}

// Delete transaction
export const handleDeleteTransaction = async(id: string) => {

    const response = await apiClient.delete(`${URL_DELETE_TRANSACTION}/${id}`)
    return response
}

export const handleUpdateTransaction = async(transObject: any) => {

    const response = await apiClient.patch(URL_UPDATE_TRANSACTION, transObject)
    return response
}