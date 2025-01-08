import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { IGetBudgetCategories } from "../../../utils/interfaces/interfaces"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"

// Registrace modulů Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  oneCategory: IGetBudgetCategories
}

const BudgetChart: React.FC<Props> = ({ oneCategory }) => {
  const { userLangID } = useUserContext()


  const icon = categoryIcons.find(icon => String(icon.id) === String(oneCategory.category.iconID))?.iconJSX
  // const price = formatCurrency(oneCategory.price, userCurrency)

  const labels = [oneCategory.category.name]

  const isSpent = oneCategory.spent !== 0

  const datasets: any[] = [
    {
      label: formatLang(userLangID, "Plánovaná částka", "Amount planned"),
      data: [oneCategory.price], // Hodnota pro 'price' musí být v poli
      backgroundColor: "rgba(75, 192, 192, 0.5)", // Barva pruhů pro `price`
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ]

  if (isSpent) {
    datasets.push({
      label: formatLang(userLangID, "Utracená částka", "Amount spent"),
      data: [oneCategory.spent], // Hodnota pro 'spent' musí být v poli
      backgroundColor: "rgba(255, 99, 132, 0.5)", // Barva pruhů pro `spent`
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    });
  }

  const data = {
    labels, // Osa Y: názvy kategorií
    datasets, // Používáme dynamicky sestavený dataset
  }

  const options = {
    indexAxis: "y" as const, // Nastavení vodorovného grafu
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Srovnání Plánované a Utracené částky pro kategorii ${oneCategory.category.name}`,
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Začněte od nuly na ose X
      },
    },
  }

  return (
    <div className="w-full xl:w-1/2 my-10 xl:m-0 h-[300px]">

        <div className="flex items-center gap-2 text-lg">
          {icon}
          <h3 className="font-semibold">{oneCategory.category.name}</h3>
        </div>

        <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetChart
