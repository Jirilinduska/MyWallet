import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, } from 'chart.js'
import { IGraphBreakdownData, IPieGraph } from '../../../utils/interfaces/interfaces'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const PieGraph: React.FC<IPieGraph> = ({ graphData }) => {

    const data = {
        labels: graphData.map( (x) => x.category),
        datasets: [
            {
                data: graphData.map( (x) => x.totalAmount ),
                // TODO - Upravit barvy
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Expense Breakdown',
          },
        },
    }

    return (
        <div className="w-full md:w-[300px] md:h-[300px] max-w-full">
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieGraph