import { apiClient } from "../config/apiClient"
import { URL_COMPLETE_PROFILE } from "../config/apiUrls"
import { ICompleteProfileData } from "../utils/interfaces/interfaces"


// Complete profile data after registration (language, currency, avatarID)
export const handleCompleteProfile = async(dataObject: ICompleteProfileData) => {

    const response = await apiClient.post(URL_COMPLETE_PROFILE, dataObject)
    return response
}