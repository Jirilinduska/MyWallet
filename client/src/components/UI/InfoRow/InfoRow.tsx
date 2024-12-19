import { formatCurrency } from "../../../utils/functions/formatNumber"
import BarValue from "../../Graphs/BarValue/BarValue"

interface InfoRowProps {
    title: string
    value: number
    color: string
    userCurrency: string
}

const InfoRow = ({ title, value, color, userCurrency } : InfoRowProps) => {

  return (
    <div className="flex items-center gap-4 mb-2">

        <div className="flex flex-col items-start w-[200px]">
          <h3 className="font-semibold text-gray-600">{title}</h3>
          <span className="font-bold" style={{ color: color }} >{formatCurrency(value, userCurrency)}</span>
        </div>

        <div className="h-full" style={{ width: "50%" }}>
            <BarValue color={color} value={value} userCurrency={userCurrency}/>
        </div>
    </div>
  )
}

export default InfoRow