import { Box, Typography } from "@mui/material"
import { IcategoriesYearOverview } from "../../../utils/interfaces/interfaces"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import InfoItemMUI from "../../UI/InfoItem/InfoItemMUI"
import { IconExpense, IconIncome, IconMoneyInHand } from "../../../utils/icons/icons"
import { BarChart } from "@mui/x-charts"
import { useCategoriesContext } from "../../../context/CategoriesContext"

interface OverviewYearProps {
    year: number
    income: number
    expense: number
    chartDataExpense: IcategoriesYearOverview[]
    chartDataIncome: IcategoriesYearOverview[]
    loading?: boolean
}

const OverviewYearMUI = ({ year, income, expense, chartDataExpense, chartDataIncome, loading } : OverviewYearProps ) => {

    const { userLangID, userCurrency } = useUserContext()
    const { categoriesIncome, categoriesTransactions } = useCategoriesContext()

    const dataSet = [
        { label: formatLang(userLangID, "Příjmy", "Income"), value: income },
        { label: formatLang(userLangID, "Výdaje", "Expense"), value: expense }
    ]

    const dataSetExpense = chartDataExpense.map(item => {
        const categoryName = categoriesTransactions.find(x => x._id === item.categoryID)?.name || "Neznámá kategorie"
        return {
            label: categoryName,
            value: item.total
        }
    })

    const dataSetIncome = chartDataIncome.map(item => {
        const categoryName = categoriesIncome.find(x => x._id === item.categoryID)?.name || "Neznámá kategorie"
        return {
            label: categoryName,
            value: item.total
        }
    })

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
                    isExpense={false}
                    loading={loading}
                />

                <InfoItemMUI 
                    title={formatLang(userLangID, "Výdaje", "Expense")}
                    amount={expense}
                    color="error"
                    icon={<IconExpense />}
                    formatToCurrency={true}
                    isExpense={true}
                    loading={loading}
                />

                <InfoItemMUI 
                    title={formatLang(userLangID, "Ušetřeno", "Saved")}
                    amount={income > expense ? income - expense : 0}
                    color="info"
                    icon={<IconMoneyInHand />}
                    formatToCurrency={true}
                    isExpense={false}
                    loading={loading}
                />

            </Box>

            <Box sx={{ width: '100%', height: 'auto', maxWidth: 500, mb: 6 }}>        
                <BarChart
                    dataset={dataSet}
                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                    series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                    layout="horizontal"
                    height={200} 
                    sx={{ width: "95% !important", overflow: "visible !important" }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </Box>

            <Box sx={{ width: '100%', height: 'auto', mb: 6, minHeight: 300 }}>
                <Typography mb={2} fontWeight={600}>{formatLang(userLangID, `Výdaje podle kategorií pro rok ${year}`, `Expenses by category for year ${year}`)} ({userCurrency})</Typography>
                <BarChart
                    dataset={dataSetExpense}
                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                    series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                    layout="horizontal"
                    grid={{ vertical: true, horizontal: true }}
                    height={500} 
                    sx={{ width: "95% !important", overflow: "visible !important" }}
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
                    grid={{ vertical: true, horizontal: true }}
                    sx={{ width: "95% !important", overflow: "visible !important" }}
                />
            </Box>
            
        </Box>
    </div>
  )
}

export default OverviewYearMUI