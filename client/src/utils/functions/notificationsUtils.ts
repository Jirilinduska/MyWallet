import { toast } from 'react-toastify'
import { LANG_CZECH, LANG_ENGLISH, NOTIF_ERROR, NOTIF_INFO, NOTIF_SUCCESS, NOTIF_WARN } from '../../config/globals'


const handleToastNotify = (message: string, type: string) => {

    switch (type) {

        case NOTIF_SUCCESS:
            toast.success(message)
            break
        case NOTIF_ERROR:
            toast.error(message)
            break
        case NOTIF_INFO:
            toast.info(message)
            break
        case NOTIF_WARN:
            toast.warn(message)
            break
        default:
            toast(message)
      }
}


export const handleNotification = (type: string, userLangID: string, valueCS: string, valueEN: string) => {

    let message: string

    switch(userLangID) {

        case LANG_CZECH:
            message = valueCS
            break
        case LANG_ENGLISH:
            message = valueEN
            break
        default:
            message = valueEN
    }

    handleToastNotify(message, type)

}