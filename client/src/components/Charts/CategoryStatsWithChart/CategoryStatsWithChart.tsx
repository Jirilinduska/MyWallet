import { CATEGORY_ID_INCOME } from "../../../config/globals"
import { ICategoryPreview } from "../../../utils/interfaces/interfaces"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import { IconChart2 } from "../../../utils/icons/icons"
import InfoItemMUI from "../../UI/InfoItem/InfoItemMUI"
import { Box } from "@mui/material"
import { BarChart } from "@mui/x-charts"

interface CategoryStatsWithChartProps {
    catInfo: ICategoryPreview
}

const CategoryStatsWithChart = ({ catInfo } : CategoryStatsWithChartProps ) => {

    const { userLangID } = useUserContext()

    const getAmountForYear = (year: number) => catInfo.yearlySummary[year] || 0

    const dataSet = Object.entries(catInfo.yearlySummary)
      .map(([year, value]) => ({
        label: year,
        value: value  
      }))
      .sort((a, b) => parseInt(b.label) - parseInt(a.label))

  return (
    <div className="flex flex-col justify-between mb-6 h-[400px] xl:flex-row gap-6">

      <div className="w-full xl:w-1/2">
        <Box mb={4}>
          <InfoItemMUI
            formatToCurrency={true}
            amount={catInfo.totalAmount}
            color={catInfo.categoryType === CATEGORY_ID_INCOME ? "success" : "error"}
            title={formatLang(userLangID, catInfo.categoryType === CATEGORY_ID_INCOME ? "Celkové příjmy" : "Celkem utraceno", catInfo.categoryType === CATEGORY_ID_INCOME ? "Total income" : "Total spent")}
          />
        </Box>

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row mb-4">

          <Box width={{ xs: "100%", md: "50%" }}>
            <InfoItemMUI
              amount={getAmountForYear(new Date().getFullYear())}
              formatToCurrency={true}
              color="primary"
              title={new Date().getFullYear().toString()}
            />
          </Box>

          <Box width={{ xs: "100%", md: "50%" }}>
            <InfoItemMUI
              amount={getAmountForYear(new Date().getFullYear() - 1)}
              formatToCurrency={true}
              color="primary"
              title={(new Date().getFullYear() - 1).toString()}
            />
          </Box>

        </div>

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row mb-4">

          <Box width={{ xs: "100%", md: "50%" }}>
            <InfoItemMUI
              amount={getAmountForYear(new Date().getFullYear() - 2)}
              formatToCurrency={true}
              color="primary"
              title={(new Date().getFullYear() - 2).toString()}
            />
          </Box>

          <Box width={{ xs: "100%", md: "50%" }}>
            <InfoItemMUI
              amount={getAmountForYear(new Date().getFullYear() - 3)}
              formatToCurrency={true}
              color="primary"
              title={(new Date().getFullYear() - 3).toString()}
            />
          </Box>
        </div>

        <InfoItemMUI
          formatToCurrency={true}
          amount={catInfo.averageAmount}
          icon={<IconChart2/>}
          color="info"
          title={formatLang(userLangID, "Měsíční průměr", "Monthly average")}
        />
      </div>

      <Box sx={{ width: '100%', height: 'auto', maxWidth: 500 }}>      
          <BarChart
            dataset={dataSet}
            yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
            series={[{ dataKey: 'value', color: '#5A4BAD' }]}
            layout="horizontal"
            grid={{ vertical: true }}
            height={300} 
          />
        </Box>
    </div>
  )
}

export default CategoryStatsWithChart
