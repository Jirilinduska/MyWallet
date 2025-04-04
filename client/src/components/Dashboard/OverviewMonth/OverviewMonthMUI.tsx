import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import InfoItemMUI from "../../UI/InfoItem/InfoItemMUI"
import { IconExpense, IconIncome, IconMoneyInHand } from "../../../utils/icons/icons"
import { Box, Typography } from "@mui/material"
import { BarChart } from "@mui/x-charts"

interface OverviewMonthProps {
    income: number
    expense: number
    budget: number
}

const OverviewMonthMUI = ({ budget, income, expense } : OverviewMonthProps ) => {

    const { userLangID } = useUserContext()

    const dataSet = [
        { label: formatLang(userLangID, "Příjmy", "Income"), value: income },
        { label: formatLang(userLangID, "Výdaje", "Expense"), value: expense },
        { label: formatLang(userLangID, "Rozpočet", "Budget"), value: budget },
    ]

  return (
    <div className="mb-4 pb-10 border-b border-colorGray animate-fadeIn">

        <Typography variant="h6" fontWeight={600} mb={2}>
            {formatLang(userLangID, "Tento měsíc", "This month")}
        </Typography>

        <Box>

            <Box display="flex" flexWrap="wrap" gap={{ xs: 1, sm: 2 }} mb={4} justifyContent={{ xs: "center", md: "start" }}>

                <>
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
                </>

                <>
                    <InfoItemMUI 
                        title={formatLang(userLangID, "Rozpočet", "Budget")}
                        amount={budget || 0}
                        color="primary"
                        icon={<IconMoneyInHand />}
                        formatToCurrency={true}
                    />

                    <InfoItemMUI 
                        title={formatLang(userLangID, "Ušetřeno", "Saved")}
                        amount={income > expense ? income - expense : 0}
                        color="info"
                        icon={<IconMoneyInHand />}
                        formatToCurrency={true}
                    />
                </>

            </Box>

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

        </Box>
    </div>
  )
}

export default OverviewMonthMUI