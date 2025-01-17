import { apiClient } from "../config/apiClient"
import { URL_ARCHIVE_NOTIF, URL_DELETE_NOTIF, URL_GET_NOTIFS, URL_MARK_NOTIF_AS_READ } from "../config/apiUrls"


export const handleGetNotifications = async() => {

    const response = await apiClient.get(URL_GET_NOTIFS)
    return response
}

export const handleDeleteNotification = async(id: string) => {
    
    const response = await apiClient.delete(`${URL_DELETE_NOTIF}/${id}`)
    return response
}

export const handleMarkNotifAsRead = async(id: string) => {

    const response = await apiClient.post(`${URL_MARK_NOTIF_AS_READ}/${id}`)
    return response
}


// id = 0 unArchive
// id = 1 archive
export const handleArchiveNotification = async(notifID: string, id: string) => {

    const response = await apiClient.post(`${URL_ARCHIVE_NOTIF}/${notifID}/${id}`)
    return response
}