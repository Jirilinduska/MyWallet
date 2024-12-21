import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, TooltipItem } from 'chart.js';
import { useUserContext } from '../../../context/UserContext'
import { formatCurrency } from '../../../utils/functions/formatNumber'
import { formatLang } from '../../../utils/functions/formatLang'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title)


// * Příklad graphData props

// const graphData = {
//   2024: 143400,
//   2023: 1500,
//   2022: 300000,
//   Income: 1300000,
// }

interface BarChartProps {
  // graphData: { [key: number | string]: number }
  graphData: { [key: string]: number; [key: number]: number }
}

const BarChart = ({ graphData } : BarChartProps ) => {

  const { userCurrency, userLangID } = useUserContext()

  const labels = Object.keys(graphData)
  const dataValues = Object.values(graphData)

  const allValuesAreZero = dataValues.every((value) => value === 0)

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ["#1d4ed8"], // modrá
        // backgroundColor: ["#10B981"], // zelená
        hoverBorderWidth: 5,
      },
    ],
  };

  const options = {
    indexAxis: 'x' as const,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Přehled transakcí',
        font: {
            size: 20,
            weight: 'bold' as const  
        },
        color: '#1e40af', 
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 90, 
  }

  return (
    <div className="w-full h-full relative">
      {(dataValues.length === 0 || allValuesAreZero) && (
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-colorGray bg-opacity-50 z-10 flex items-center justify-center">
          <p className="">{formatLang(userLangID, "Žádná data nejsou k dispozici", "No data available")}</p>
        </div>
      )}
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart
