import { LANG_CZECH } from "../../../config/globals"
import { INotification } from "../../../context/NotifContext"
import { useUserContext } from "../../../context/UserContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import BarChart from "../../Charts/BarChart/BarChart"


interface NotifMonthlySummaryProps {
    data: INotification
}

const NotifMonthlySummary = ({ data } : NotifMonthlySummaryProps ) => {

    const { userLangID, userCurrency } = useUserContext()

    const messages = userLangID === LANG_CZECH ? data.messageCS : data.messageEN

    const graphDataEN = {
        // "Income": income,
        "Expenses": data.totalSpent || 0,
        "Budget": data.totalPlanned || 0
    }

    const graphDataCS = {
        // "Příjmy": income,
        "Výdaje": data.totalSpent || 0,
        "Rozpočet": data.totalPlanned || 0
    }
  
    return (
    <div className="">

        <div className="mb-6">
            { messages.map( (x, index) => <p key={index} className="mb-4 text-sm sm:text-base">{x}</p> ) }
        </div>

        { data.month && data.year &&
            <h3 className="font-semibold mb-2 text-sm sm:text-lg">
                { formatLang(
                    userLangID,
                    `Data pro měsíc ${getMonthName(data.year || 0, data.month || 0, userLangID)} (${data.year})`,
                    `Data for month ${getMonthName(data.year || 0, data.month || 0, userLangID)} (${data.year})`
                )}
            </h3>
        }

        <div className="flex items-center gap-2 text-sm sm:text-base">
            <p className="">{formatLang(userLangID, "Vaše naplánovaná útrata:", "Your planned spending:")}</p>
            <h3 className="font-semibold">{formatCurrency(data.totalPlanned || 0, userCurrency)}</h3>
        </div>

        <div className="flex items-center gap-2 mb-10 text-sm sm:text-base">
            <p className="">{formatLang(userLangID, "Vaše skutečná útrata:", "Your actual spending:")}</p>
            <h3 className="font-semibold">{formatCurrency(data.totalSpent || 0, userCurrency)}</h3>
        </div>

        <div className="w-full h-auto xl:h-[300px]">
            <BarChart graphData={userLangID === LANG_CZECH ? graphDataCS : graphDataEN} />
        </div>


        {/* // TODO - Dodplnit data podle kategorií! */}

    </div>
  )
}

export default NotifMonthlySummary