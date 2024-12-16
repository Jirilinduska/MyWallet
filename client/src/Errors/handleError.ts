import { LANG_CZECH, LANG_ENGLISH } from "../config/globals"
import { ErrorCodes } from "./errorCodes"



// ! Už není potřeba
export const handleError = (errCode: number, userLangID: string, setErrMsg : (msg: string) => void ) => {

    const lang = userLangID === LANG_CZECH ? "cs" : userLangID === LANG_ENGLISH ? "en" : "en"

    const message = ErrorCodes[errCode]?.[lang] || "Unknown error"

    setErrMsg(message)
}