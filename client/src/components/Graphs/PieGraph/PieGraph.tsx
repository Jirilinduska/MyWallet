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
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#FFCD56',
                    '#36A2EB', '#9966FF', '#FF9999', '#66FF66', '#FFB3E6', '#00BFFF',
                    '#FFD700', '#32CD32', '#FF6347', '#DAA520', '#48D1CC', '#8A2BE2',
                    '#20B2AA', '#FF4500'
                ],
                borderWidth: 1, 
                hoverBorderWidth: 5,
            }
        ]
    }

    // TODO - Dokončit legendu - okolo grafu.
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false
            // position: 'top' as const,
          },
          tooltip: {
            callbacks: {
                label: (context: any) => {
                    return `${context.raw} Kč`
                },
            }
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