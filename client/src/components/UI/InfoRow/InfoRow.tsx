
export interface InfoRow {
    title: string
    value: string | number
    color: string
}

const InfoRow = ({ title, value, color } : InfoRow) => {
  return (
    <div className="flex flex-col items-start mb-2">
        <h3 className="font-semibold text-gray-600">{title}</h3>
        <span className={`font-bold ${color}`}>{value}</span>
    </div>
  )
}

export default InfoRow