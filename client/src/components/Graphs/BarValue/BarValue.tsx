import { formatCurrency } from "../../../utils/functions/formatNumber"

interface BarValueProps {
    value: number
    color: string
    userCurrency: string
}

const BarValue = ({ color, value, userCurrency } : BarValueProps ) => {

    const roundNearestNumber = Math.ceil(value / 5000) * 5000
    const percentage = (value / roundNearestNumber) * 100
    const barWidth = percentage > 0 ? `${percentage}%` : "0%"
    

    // TODO - Ošetřit záporné hodnoty!
  return (
    <div className="flex items-center gap-4 w-full">
        
        <div className="h-[10px] bg-gray-300 w-full rounded-[10px]">
            <div
                className="h-full transition-all duration-1000"
                style={{
                    width: barWidth,
                    borderRadius: "10px",
                    backgroundColor: color
                }}
            />
        </div>

        <span className="font-semibold w-[100px]">{formatCurrency(roundNearestNumber, userCurrency)} ({Math.round(percentage)})%</span>
        
    </div>

  )
}

export default BarValue