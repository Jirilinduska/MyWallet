import { apiClient } from "../config/apiClient"
import { URL_COMPLETE_PROFILE, URL_GET_USER_DATA, URL_UPDATE_USER_DATA } from "../config/apiUrls"
import { ICompleteProfileData, IUserDataUpdate } from "../utils/interfaces/interfaces"


// Complete profile data after registration (language, currency, avatarID)
export const handleCompleteProfile = async(dataObject: ICompleteProfileData) => {

    const response = await apiClient.post(URL_COMPLETE_PROFILE, dataObject)
    return response
}

// Get user data
export const handleGetUserData = async() => {

    const response = await apiClient.get(URL_GET_USER_DATA)
    return response
}

// Update user data
export const handleUpdateUserData = async(userData: IUserDataUpdate) => {

    const response = await apiClient.patch(URL_UPDATE_USER_DATA, userData)
    return response
}
