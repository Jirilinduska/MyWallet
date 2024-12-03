import React from 'react'


interface IProgressRadius {
    title: string,
    plannedPrice: number,
    actualPrice: number,
    currency: string
}

const ProgressRadius = ({ title, plannedPrice, actualPrice, currency } : IProgressRadius) => {

    const percent = Math.min((actualPrice / plannedPrice) * 100)
    const displayedPercent = percent.toFixed(0)

    const radius = 50
    const circumference = 2 * Math.PI * radius
    const limitedPercent = Math.min(percent, 100)
    const offset = circumference - (limitedPercent / 100) * circumference

    let progressColor 

    if(percent === 100) {
        progressColor = "#10b981"
    } else if (percent > 100){
        progressColor = "#dc2626"
    } else {
        progressColor = "#1d4ed8"
    }

  return (
    <div className="text-center shadow-lg rounded-lg w-[250px] p-4">
        
    <h2 className="text-xl font-bold mb-2">{title}</h2>

    {/* Popis */}
    <p className="text-gray-600 mb-4">
        Aktuální využití rozpočtu:
    </p>

    {/* SVG kruhový graf */}
    <svg width="120" height="120" className="mx-auto">
        
        {/* Šedé pozadí kruhu */}
        <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="#e0e0e0"
            strokeWidth="10"
        />

        {/* Vyplněný kruh s barvou */}
        <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke={progressColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
        />

        {/* Text s procenty */}
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#333">
            {displayedPercent}%
        </text>
    </svg>

    {/* Text pod grafem */}
    <p className="mt-4 text-gray-700 mb-4">
        {percent > 100 ? "Překročený rozpočet!" : "V rámci rozpočtu"}
    </p>

    <p className="flex items-center gap-2">
        Planned: 
        <span className="flex items-center gap-1">{plannedPrice.toLocaleString()} <span>{currency}</span></span>
    </p>

    <p className="flex items-center gap-2">
        Actual: 
        <span className="flex items-center gap-1">{actualPrice.toLocaleString()} <span>{currency}</span></span>
    </p>
</div>
  )
}

export default ProgressRadius