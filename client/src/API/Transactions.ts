import { apiClient } from "../config/apiClient"
import { URL_NEW_TRANSACTION } from "../config/apiUrls"



export const handleNewTransaction = async(newTransObject: any) => {

    const response = await apiClient.post(URL_NEW_TRANSACTION, newTransObject)
    return response
}