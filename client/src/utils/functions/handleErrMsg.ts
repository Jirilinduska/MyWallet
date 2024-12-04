import { AxiosError } from "axios"

export const handleErrMsg = (e: any, handleSetErrMsg: (msg: string) => void) => {

    if(e instanceof AxiosError) {
        handleSetErrMsg(e.response?.data.message)
    } else {
        handleSetErrMsg("Something went wrong. Please try again.")
    }
}