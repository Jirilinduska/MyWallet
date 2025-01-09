import InfoItem from "../../UI/InfoItem/InfoItem"
import { CATEGORY_ID_INCOME, COLOR_BLUE, COLOR_GREEN, COLOR_RED, SIZE_ROW } from "../../../config/globals"
import { ICategoryPreview } from "../../../utils/interfaces/interfaces"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import BarChart from "../BarChart/BarChart"
import { IconChart2 } from "../../../utils/icons/icons"

interface CategoryStatsWithChartProps {
    catInfo: ICategoryPreview
}

const CategoryStatsWithChart = ({ catInfo } : CategoryStatsWithChartProps ) => {

    const { userLangID } = useUserContext()

    const getAmountForYear = (year: number) => catInfo.yearlySummary[year] || 0

  return (
    <div className="flex flex-col justify-between mb-6 h-[400px] xl:flex-row gap-6">

      <div className="w-full xl:w-1/2">

        <InfoItem
          formatToCurrency={true}
          amount={catInfo.totalAmount}
          color={COLOR_RED}
          icon={null}
          plannedAmount={null}
          size={SIZE_ROW}
          desc={formatLang(userLangID, catInfo.categoryType === CATEGORY_ID_INCOME ? "Celkové příjmy" : "Celkem utraceno", catInfo.categoryType === CATEGORY_ID_INCOME ? "Total income" : "Total spent")}
          spentAmount={null}
        />

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">

          <InfoItem
            formatToCurrency={true}
            amount={getAmountForYear(new Date().getFullYear())}
            color={COLOR_GREEN}
            icon={null}
            plannedAmount={null}
            size={SIZE_ROW}
            desc={new Date().getFullYear().toString()}
            spentAmount={null}
          />

          <InfoItem
            formatToCurrency={true}
            amount={getAmountForYear(new Date().getFullYear() - 1)}
            color={COLOR_GREEN}
            icon={null}
            plannedAmount={null}
            size={SIZE_ROW}
            desc={ (new Date().getFullYear() - 1).toString()}
            spentAmount={null}
          />

        </div>

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          
          <InfoItem
            formatToCurrency={true}
            amount={getAmountForYear(new Date().getFullYear() - 2)}
            color={COLOR_GREEN}
            icon={null}
            plannedAmount={null}
            size={SIZE_ROW}
            desc={ (new Date().getFullYear() - 2).toString()}
            spentAmount={null}
          />
          
          <InfoItem
            formatToCurrency={true}
            amount={getAmountForYear(new Date().getFullYear() - 3)}
            color={COLOR_GREEN}
            icon={null}
            plannedAmount={null}
            size={SIZE_ROW}
            desc={ (new Date().getFullYear() - 3).toString()}
            spentAmount={null}
          />
        </div>

        <InfoItem
          formatToCurrency={true}
          amount={catInfo.averageAmount}
          color={COLOR_BLUE}
          icon={<IconChart2/>}
          plannedAmount={null}
          size={SIZE_ROW}
          desc={formatLang(userLangID, "Měsíční průměr", "Monthly average")}
          spentAmount={null}
        />
      </div>

      <div className="w-full xl:w-1/2 h-full">
        <BarChart graphData={catInfo.yearlySummary}/>
      </div>
    </div>
  )
}

export default CategoryStatsWithChart
