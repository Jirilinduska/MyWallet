import { NOTIF_ERROR } from "../config/globals"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { ErrorCodes } from "./errorCodes"

export const handleError = (err: any, userLangID: string) => {

    const defaultMessage = {
        cs: "Něco se pokazilo",
        en: "Something went wrong",
    }

    if (err?.response?.data?.errCode) {
        handleErrorByCode(err.response.data.errCode, userLangID)
    } else {
        handleNotification(NOTIF_ERROR, userLangID, defaultMessage.cs, defaultMessage.en)
        console.error("Unhandled error:", err)
    }

}

const handleErrorByCode = (errCode: number, userLangID: string) => {

    const message = ErrorCodes[errCode]
    
    handleNotification(NOTIF_ERROR, userLangID, message.cs, message.en)
}