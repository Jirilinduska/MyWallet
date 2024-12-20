import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, TooltipItem } from 'chart.js';
import { useUserContext } from '../../../context/UserContext'
import { formatCurrency } from '../../../utils/functions/formatNumber'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title)


// * Příklad graphData props

// const graphData = {
//   2024: 143400,
//   2023: 1500,
//   2022: 300000,
//   2021: 1300000,
// }

interface BarChartProps {
  graphData: { [key: number]: number }
}

const BarChart = ({ graphData } : BarChartProps ) => {

  const { userCurrency } = useUserContext()

  const labels = Object.keys(graphData)
  const dataValues = Object.values(graphData)

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        // backgroundColor: ["#1d4ed8"], // modrá
        backgroundColor: ["#10B981"], // zelená
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
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart
