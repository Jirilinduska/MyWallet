import { CURR_CZECH, CURR_DOLLAR, CURR_EURO, LANG_CZECH } from "../../config/globals";

export const formatCurrency = (number: number, userCurrency: string) => {

    let currencyLocale;
    let currencyCode;

    if (userCurrency === CURR_CZECH) {
        currencyLocale = 'cs-CZ'
        currencyCode = 'CZK'
    } else if (userCurrency === CURR_DOLLAR) {
        currencyLocale = 'en-US'
        currencyCode = 'USD'
    } else if (userCurrency === CURR_EURO) {
        currencyLocale = 'de-DE'
        currencyCode = 'EUR'
    } else {
        currencyLocale = 'en-US'
        currencyCode = 'USD'
    }

    if (!currencyCode) {
        return number
    }

    return new Intl.NumberFormat(currencyLocale, { 
        style: 'currency', 
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number)
}
