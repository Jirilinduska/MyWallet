import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { IcategoriesYearOverview } from '../../../utils/interfaces/interfaces'
import { formatCurrency } from '../../../utils/functions/formatNumber'
import { useUserContext } from '../../../context/UserContext'

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend)

interface BarChartCategoriesProps {
    chartData: IcategoriesYearOverview[]
}

const BarChartCategories = ({ chartData } : BarChartCategoriesProps ) => {

    console.log(chartData)

    const { userCurrency } = useUserContext()

    // Data pro graf
    const data = {
        labels: chartData.map( x => x.categoryName ),
        datasets: [
            {
                label: "",
                data: chartData.map( x  => x.totalAmount),
                backgroundColor: '#36A2EB',
            }
        ]
    }

    // Možnosti grafu
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
                        const value = formatCurrency(context.raw, userCurrency)
                        return value ? value.toString() : ''
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
            }
        }
    }

    return (
        <div className="w-full">
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChartCategories
