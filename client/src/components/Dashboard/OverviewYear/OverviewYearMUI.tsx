import { Box, Typography } from "@mui/material"
import { IcategoriesYearOverview } from "../../../utils/interfaces/interfaces"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import InfoItemMUI from "../../UI/InfoItem/InfoItemMUI"
import { IconExpense, IconIncome, IconMoneyInHand } from "../../../utils/icons/icons"
import { BarChart, Gauge, PieChart, gaugeClasses } from "@mui/x-charts"

interface OverviewYearProps {
    year: number
    income: number
    expense: number
    chartDataExpense: IcategoriesYearOverview[]
    chartDataIncome: IcategoriesYearOverview[]
}

const OverviewYearMUI = ({ year, income, expense, chartDataExpense, chartDataIncome } : OverviewYearProps ) => {

    const { userLangID, userCurrency } = useUserContext()

    const dataSet = [
        { label: formatLang(userLangID, "Příjmy", "Income"), value: income },
        { label: formatLang(userLangID, "Výdaje", "Expense"), value: expense }
    ]

    const dataSetExpense = chartDataExpense.map(item => ({
        label: item.categoryName, value: item.totalAmount
    }))

    const dataSetIncome = chartDataIncome.map(item => ({
        label: item.categoryName, value: item.totalAmount
    }))

  return (
    <div className="mb-4 pb-10 border-b border-colorGray animate-fadeIn">
        
        <Typography variant="h6" fontWeight={600} mb={2}>
            { year === new Date().getFullYear() ? formatLang(userLangID, `Tento rok (${year})`, `This year (${year})`) :`(${year})` }
        </Typography>

        <Box>
            <Box display="flex" flexWrap="wrap" gap={{ xs: 1, sm: 2 }} mb={4} justifyContent={{ xs: "center", md: "start" }}>
                
                <InfoItemMUI
                    title={formatLang(userLangID, "Příjmy", "Income")}
                    amount={income}
                    color="success"
                    icon={<IconIncome />}
                    formatToCurrency={true}
                />

                <InfoItemMUI 
                    title={formatLang(userLangID, "Výdaje", "Expense")}
                    amount={expense}
                    color="error"
                    icon={<IconExpense />}
                    formatToCurrency={true}
                />

                <InfoItemMUI 
                    title={formatLang(userLangID, "Ušetřeno", "Saved")}
                    amount={income > expense ? income - expense : 0}
                    color="info"
                    icon={<IconMoneyInHand />}
                    formatToCurrency={true}
                />

            </Box>

            <Box sx={{ width: '100%', height: 'auto', maxWidth: 500, mb: 6 }}>        
                <BarChart
                    dataset={dataSet}
                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                    series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                    layout="horizontal"
                    height={200} 
                />
            </Box>

            <Box sx={{ width: '100%', height: 'auto', mb: 6, minHeight: 300 }}>
                <Typography mb={2} fontWeight={600}>{formatLang(userLangID, `Výdaje podle kategorií pro rok ${year}`, `Expenses by category for year ${year}`)} ({userCurrency})</Typography>
                <BarChart
                    dataset={dataSetExpense}
                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                    series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                    layout="horizontal"
                    grid={{ vertical: true }}
                    height={400} 
                />
            </Box>

            <Box sx={{ width: '100%', height: 'auto' }}>
                <Typography mb={2} fontWeight={600}>{formatLang(userLangID, `Příjmy podle kategorií pro rok ${year}`, `Income by category for year ${year}`)} ({userCurrency})</Typography>
                <BarChart
                    dataset={dataSetIncome}
                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                    series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                    layout="horizontal"
                    height={400} 
                    grid={{ vertical: true }}
                />
            </Box>
            
        </Box>
    </div>
  )
}

export default OverviewYearMUI