import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useUserContext } from '../../../context/UserContext'
import { formatCurrency } from '../../../utils/functions/formatNumber'
import { formatLang } from '../../../utils/functions/formatLang'

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale)

// * Příklad graphData props
// const graphData = {
//   2024: 143400,
//   2023: 1500,
//   2022: 300000,
//   Income: 1300000,
// }

interface BarChartProps {
  graphData: { [key: string]: number; [key: number]: number }
}

const BarChart = ({ graphData } : BarChartProps ) => {

  const { userCurrency, userLangID } = useUserContext()

  const labels = Object.keys(graphData)
  const dataValues = Object.values(graphData)

  const allValuesAreZero = dataValues.every((value) => value === 0)

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = formatCurrency(context.raw, userCurrency);
            return value ? value.toString() : '';
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          padding: 10,
        },
      },
    },
  }
  
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['#1d4ed8'],
        barThickness: 25, 
        maxBarThickness: 40,
      },
    ],
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
