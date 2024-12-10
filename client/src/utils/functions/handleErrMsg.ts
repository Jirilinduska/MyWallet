import { AxiosError } from "axios"
import { LANG_CZECH, LANG_ENGLISH } from "../../config/globals"

// export const handleErrMsg = (e: any, handleSetErrMsg: (msg: string) => void) => {

//     if(e instanceof AxiosError) {
//         handleSetErrMsg(e.response?.data.message)
//     } else {
//         handleSetErrMsg("Something went wrong. Please try again.")
//     }
// }


export const handleErrMsg = (msgEN: string, msgCS: string, handleSetErrMsg: (msg: string) => void, userLangID: string) => {

    if(userLangID === LANG_CZECH) handleSetErrMsg(msgCS)
    if(userLangID === LANG_ENGLISH) handleSetErrMsg(msgEN)
}