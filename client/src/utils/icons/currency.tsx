import CurrencyFlag from "react-currency-flags";

export const CurrencyIconDollar: React.FC = () => {
    return <CurrencyFlag currency="USD" size="lg" />
}

export const CurrencyIconEuro: React.FC = () => {
    return <CurrencyFlag currency="EUR" size="lg" />
}

export const CurrencyIconCzech: React.FC = () => {
    return <CurrencyFlag currency="CZK" size="lg" />
}
