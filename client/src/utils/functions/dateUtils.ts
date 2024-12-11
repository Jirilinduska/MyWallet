import { LANG_CZECH } from "../../config/globals"



export const handleGetMonthName = (year: number, month: number, userLangID: string) => {
    return new Date(year, month - 1).toLocaleString(userLangID === LANG_CZECH ? "cs-CZ" : "en-US", { month: "long" })
}

export const handleMonthName = (monthName: string) => {
    return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}