import { COLOR_BLUE, COLOR_GREEN, COLOR_RED, COLOR_WHITE, SIZE_MEDIUM, SIZE_ROW } from "../../../config/globals";
import { useUserContext } from "../../../context/UserContext";
import { formatCurrency } from "../../../utils/functions/formatNumber";

interface InfoItemProps {
    icon: React.ReactElement | null
    amount: number
    desc: string
    plannedAmount: number | null
    color: string
    size: string
    formatToCurrency: boolean
    subtitle?: string
}

const InfoItem = ({ icon, amount, desc, plannedAmount, color, size, formatToCurrency, subtitle }: InfoItemProps) => {

    const { userCurrency } = useUserContext()

    const percentage = plannedAmount ? Math.round((amount / plannedAmount) * 100) : null
    const percentageBar = plannedAmount ? Math.min(Math.round((amount / plannedAmount) * 100), 100) : null
    
    const handleItemColor = (color: string): string => {
        switch (color) {
            case COLOR_BLUE:
                return "bg-blue-500 text-white"
            case COLOR_GREEN:
                return "bg-green-500 text-white"
            case COLOR_WHITE:
                return "bg-white text-gray-800"
            case COLOR_RED:
                return "bg-red-400 text-white"
            default:
                return "bg-gray-100 text-gray-600"
        }
    }

    const bgColor = handleItemColor(color)

    // Row
    if(size === SIZE_ROW) {
        return (
            <div className={`rounded-xl shadow-lg ${bgColor} w-full p-3 flex items-center justify-between mb-4`}>

                <div className="flex items-center gap-4">
                    { icon && <span className="text-sm xs:text-base hidden sm:block">{icon}</span> }
                    <p className="text-xs xs:text-base font-semibold">{desc}</p>
                </div>

                <span className="text-xs hidden xs:block">{subtitle}</span>

                <div className="flex flex-col items-end">

                    <h3 className="font-semibold text-xs xs:text-base">{formatToCurrency ? formatCurrency(amount, userCurrency) : amount}</h3>

                    <span className={`${percentage! > 75 ? "text-red-400" : "text-black"} font-semibold text-xs`}>{ plannedAmount ? `${percentage}%` : null }</span>
                </div>
            </div>
        )
    }

    // Medium
    return (
        <div className={`
            rounded-xl shadow-lg flex flex-col justify-between
            ${bgColor} 
            ${size === SIZE_MEDIUM && "w-[200px] h-[230px] p-4"}
            `}
        >

            <span className="text-3xl">{icon}</span>

            <h3 className="font-semibold text-xl">{formatToCurrency ? formatCurrency(amount, userCurrency) : amount}</h3>

            <div className="">
                { plannedAmount 
                    ?   <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${percentageBar! > 75 ? "bg-red-400" : percentageBar! > 50 ? "bg-yellow-400" : "bg-colorGreen" }`} style={{ width: `${percentageBar}%` }}></div> 
                        </div>
                    : null
                }
                <div className="text-sm mt-2">

                    <div className="flex items-center justify-between mb-2">
                        <span className={`${percentage! > 75 ? "text-red-400" : "text-black"} font-semibold`}>{ plannedAmount ? `${percentage}%` : null }</span>
                        <span>{plannedAmount ? formatCurrency(plannedAmount, userCurrency) : null}</span>
                    </div>

                    <p className="text-lg font-semibold">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoItem
