import { LANG_CZECH, LANG_ENGLISH } from "../../config/globals"

export const handleSuccMsg = ( msgEN: string, msgCS: string,setSuccMsg: (msg: string) => void, userLANG: string ) => {

    if(userLANG === LANG_CZECH) setSuccMsg(msgCS)
    if(userLANG === LANG_ENGLISH) setSuccMsg(msgEN)
}

