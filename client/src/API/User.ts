import { apiClient } from "../config/apiClient"
import { URL_COMPLETE_PROFILE } from "../config/apiUrls"
import { ICompleteProfileData } from "../utils/interfaces/interfaces"



export const handleCompleteProfile = async(dataObject: ICompleteProfileData) => {

    try {
        const response = await apiClient.post(URL_COMPLETE_PROFILE, dataObject )
        console.log("handleCompleteProfile => : ", response)
    } catch (error) {
        console.log("handleCompleteProfile() => : ", error)
    }
}