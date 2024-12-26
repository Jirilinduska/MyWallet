import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { IcategoriesYearOverview } from '../../../utils/interfaces/interfaces'
import { formatCurrency } from '../../../utils/functions/formatNumber'
import { useUserContext } from '../../../context/UserContext'
import { formatLang } from '../../../utils/functions/formatLang'

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend)

interface BarChartCategoriesProps {
    chartData: IcategoriesYearOverview[]
}

// * Chart data input:
// {_id: '676ab3f36442bcf0b603390f', totalAmount: 325776, categoryName: 'Výplata', categoryIconID: 26}

const BarChartCategories = ({ chartData } : BarChartCategoriesProps ) => {

    const { userCurrency, userLangID } = useUserContext()

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
        <div className="w-full h-full relative">
            { chartData.length === 0 && (
                <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-colorGray bg-opacity-50 z-10 flex items-center justify-center">
                    <p className="">{formatLang(userLangID, "Žádná data nejsou k dispozici", "No data available")}</p>
                </div>
                )}
                <Bar data={data} options={options} />
        </div>
    )
}

export default BarChartCategories
