import { LANG_CZECH } from "../../config/globals"


export const formatLang = (userLangID: string, valueCS: string, valueEN: string) => {
    return userLangID === LANG_CZECH ? valueCS : valueEN
}