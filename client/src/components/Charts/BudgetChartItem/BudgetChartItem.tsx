import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { IGetBudgetCategories } from "../../../utils/interfaces/interfaces"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  oneCategory: IGetBudgetCategories
}

const BudgetChart: React.FC<Props> = ({ oneCategory }) => {

  const { userLangID, userCurrency } = useUserContext()
  const percentage = oneCategory.price > 0 ? (oneCategory.spent / oneCategory.price) * 100 : 0


  const icon = categoryIcons.find(icon => String(icon.id) === String(oneCategory.category.iconID))?.iconJSX

  const labels = [oneCategory.category.name]

  const isSpent = oneCategory.spent !== 0

  const datasets: any[] = [
    {
      label: formatLang(userLangID, "Plánovaná částka", "Amount planned"),
      data: [oneCategory.price], // Hodnota pro 'price' musí být v poli
      backgroundColor: "rgba(75, 192, 192, 0.5)", 
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ]

  if (isSpent) {
    datasets.push({
      label: formatLang(userLangID, "Utracená částka", "Amount spent"),
      data: [oneCategory.spent], // Hodnota pro 'spent' musí být v poli
      backgroundColor: "rgba(255, 99, 132, 0.5)", 
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    });
  }

  const data = {
    labels,
    datasets, 
  }

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: formatLang(
          userLangID, 
          `Srovnání plánované a utracené částky pro kategorii ${oneCategory.category.name}`, 
          `Comparison of planned and spent amount for category ${oneCategory.category.name}`
        ),
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="w-full xl:w-1/2 my-10 xl:m-0">

        <div className={`${percentage > 100 ? "text-red-500" : percentage > 85 ? "text-orange-500" : "text-green-500"} flex items-center gap-2 text-lg mb-4 font-semibold`}>
          {icon}
          <h3 className="font-semibold">{oneCategory.category.name}</h3>
          {/* <span className={`${percentage > 100 ? "text-red-500" : percentage > 85 ? "text-orange-500" : "text-green-500"} font-semibold`}>({percentage.toFixed()}%)</span> */}
          <span>({percentage.toFixed()}%)</span>
        </div>

        <div className="flex items-center gap-1 text-sm mb-1">
          <h4>{formatLang(userLangID, "Plánovaná částka:", "Amount planned:")}</h4>
          <span className="font-semibold">{formatCurrency(oneCategory.price, userCurrency)}</span>
        </div>

        <div className="flex items-center gap-1 text-sm mb-1">
          <h4>{formatLang(userLangID, "Utracená částka", "Amount spent")}</h4>
          <p className="font-semibold flex items-center gap-2">
            <span className="">{formatCurrency(oneCategory.spent, userCurrency)}</span>
          </p>
        </div>

        <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetChart
