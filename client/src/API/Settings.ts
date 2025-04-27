import { apiClient } from "../config/apiClient"
import { URL_DELETE_USER_BY_ADMIN, URL_GET_ADMIN_DATA, URL_GET_MAINENANCE_STATUS, URL_UPDATE_APP_SETTINGS } from "../config/apiUrls"

export const handleGetAdminData = async() => {
    const response = await apiClient.get(URL_GET_ADMIN_DATA)
    return response
}

export const handleDeleteUserByAdmin = async(userName: string) => {
    const response = await apiClient.delete(`${URL_DELETE_USER_BY_ADMIN}/${userName}`)
}

export const handleUpdateAppSettings = async(settings: { allowRegistration: boolean, isMaintenance: boolean } ) => {
    const response = await apiClient.post(URL_UPDATE_APP_SETTINGS, settings)
}

export const handleGetMaintenanceStatus = async() => {
    const response = await apiClient.get(URL_GET_MAINENANCE_STATUS)
    return response.data
}