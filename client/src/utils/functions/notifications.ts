import { LANG_CZECH, LANG_ENGLISH } from "../../config/globals"

// ! Už není potřeba
export const handleShowNotif= (msgEN: string, msgCS: string, handleNotif: (msg: string) => void, usersLangID: string) => {

    if(usersLangID === LANG_CZECH) handleNotif(msgCS)
    if(usersLangID === LANG_ENGLISH) handleNotif(msgEN)
}