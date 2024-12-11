import { LANG_CZECH } from "../../config/globals"


export const getMonthName = (year: number, month: number, userLangID: string) => {
    const monthName = new Date(year, month - 1).toLocaleString(userLangID === LANG_CZECH ? "cs-CZ" : "en-US", { month: "long" })
    return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}