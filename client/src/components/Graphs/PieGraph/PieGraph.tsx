import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, } from 'chart.js'
import { IPieGraph } from '../../../utils/interfaces/interfaces'
import { LANG_CZECH, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from '../../../config/globals'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const PieGraph: React.FC<IPieGraph> = ({ graphData, pageID, langID }) => {

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
            text: pageID === PAGE_ID_TRANSACTIONS 
                            ? (langID === LANG_CZECH ? "Souhrn útrat" : "Expense breakdown") 
                            : pageID === PAGE_ID_INCOME 
                                ? (langID === LANG_CZECH ? "Souhrn příjmů" : "Income breakdown") 
                                : ""
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