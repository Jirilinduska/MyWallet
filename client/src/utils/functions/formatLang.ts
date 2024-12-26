import { LANG_CZECH } from "../../config/globals"


export const formatLang = (userLangID: string, valueCS: string, valueEN: string) => {

    if(!userLangID) return valueEN

    return userLangID === LANG_CZECH ? valueCS : valueEN
}