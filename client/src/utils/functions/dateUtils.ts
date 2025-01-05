import { LANG_CZECH } from "../../config/globals"


export const getMonthName = (year: number, month: number, userLangID: string) => {
    const monthName = new Date(year, month - 1).toLocaleString(userLangID === LANG_CZECH ? "cs-CZ" : "en-US", { month: "long" })
    return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}

export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}