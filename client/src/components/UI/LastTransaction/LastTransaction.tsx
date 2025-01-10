import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH, TODAY_TRANSACTION } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { cs } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

interface LastTransactionProps {
    iconID: number
    name: string
    date: Date
    amount: number
    type: string
    fullWidth: boolean
}

const LastTransaction = ({ iconID, name, date, amount, type, fullWidth } : LastTransactionProps ) => {

    const { userCurrency, userLangID } = useUserContext()

    const dateObj = new Date(date)
    const timestamp = dateObj.getTime()

return (
    <div className={` ${!fullWidth && "xs:w-[300px]" } p-2 bg-white border-b border-gray-200 shadow-sm text-xs w-full`}>


        <div className="flex items-center justify-between mb-1">
            <h6 className="text-gray-700 font-medium">
                { type === CATEGORY_ID_TRANSACTION && formatLang(userLangID, "Poslední transakce", "Last transaction")}
                { type === CATEGORY_ID_INCOME      && formatLang(userLangID, "Poslední příjem", "Last income")}
                { type === TODAY_TRANSACTION       && formatLang(userLangID, "Dnešní transakce", "Today's transaction")}
            </h6>
            <span className="text-gray-500 hidden xs:block">{formatDistanceToNow(timestamp, { addSuffix: true, locale: userLangID === LANG_CZECH ? cs : undefined })}</span>
        </div>
  
        <div className="flex items-center justify-between">

            {/* Kategorie */}
            <div className="flex items-center space-x-1 text-gray-700">
                <span className="text-lg">{categoryIcons.find(x => x.id === iconID)?.iconJSX}</span>
                <span className="font-medium">{name}</span>
            </div>
  
            {/* Částka */}
            <span className={`${ type === CATEGORY_ID_INCOME ? "text-green-500" : "text-red-500" } font-semibold`}>
                { type === CATEGORY_ID_TRANSACTION && "-" }
                {formatCurrency(amount, userCurrency)}
            </span>
        </div>
    </div>
  )
}

export default LastTransaction