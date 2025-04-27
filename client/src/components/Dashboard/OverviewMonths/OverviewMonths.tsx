import { Box, Button, Typography } from "@mui/material";
import { IOverviewMonths } from "../../../utils/interfaces/interfaces";
import { getMonthName } from "../../../utils/functions/dateUtils";
import { useUserContext } from "../../../context/UserContext";
import { BarChart } from "@mui/x-charts";
import { formatLang } from "../../../utils/functions/formatLang";
import { formatCurrency } from "../../../utils/functions/formatNumber"

interface OverviewMonthsProps {
  year: number;
  data: IOverviewMonths[];
}

const OverviewMonths = ({ year, data }: OverviewMonthsProps) => {

  const { userLangID, userCurrency } = useUserContext()

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2} fontSize={16}>
        {formatLang(userLangID, `Rok ${year} v měsících`, `Year ${year} in months`)}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {data.map((x) => {
          const dataSet = [
            {
              value: x.expense,
              label: formatLang(userLangID, "Výdaje", "Expense"),
            },
            {
              value: x.income,
              label: formatLang(userLangID, "Příjmy", "Income"),
            },
            {
              value: x.saved,
              label: formatLang(userLangID, "Ušetřeno", "Saved"),
            },
          ];

          return (
            <Box
              key={`${x.year}-${x.month}`}
              sx={{
                width: { xs: "100%", sm: "100%", md: "48%", lg: "32%" },
                backgroundColor: "#f9f9f9",
                borderRadius: 3,
                padding: 2,
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={600} fontSize={16} mb={1}>
                {getMonthName(x.year, x.month, userLangID)}
              </Typography>

              <Box mb={2} px={1.5} py={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Button 
                    sx={{ textTransform: 'capitalize', mb: 1 }}
                    variant="outlined"
                    color="error"
                    href={`/dashboard/expense?year=${x.year}&month=${x.month}`}
                    target="_blank"
                >
                    {formatLang(userLangID, "Výdaje: ", "Expense: ")} -{formatCurrency(x.expense, userCurrency)}
                </Button>

                <Button 
                    sx={{ textTransform: 'capitalize', mb: 1 }}
                    variant="outlined"
                    color="success"
                    href={`/dashboard/income?year=${x.year}&month=${x.month}`}
                    target="_blank"
                >
                    {formatLang(userLangID, "Příjmy: ", "Income: ")} {formatCurrency(x.income, userCurrency)}
                </Button>

                {x.expense === 0 && x.income === 0 ||
                    <Typography fontSize={16} color="info" fontWeight={500} p={1} bgcolor="background.paper" borderRadius="8px">
                        {formatLang(userLangID, "Ušetřeno: ", "Saved: ")} {formatCurrency(x.saved, userCurrency)}
                    </Typography>}
              </Box>

              {x.expense === 0 && x.income === 0 ||
                <BarChart
                    dataset={dataSet}
                    yAxis={[{ scaleType: "band", dataKey: "label" }]}
                    series={[{ dataKey: "value", color: "#5A4BAD" }]}
                    layout="horizontal"
                    height={200}
                    grid={{ vertical: true, horizontal: true }}
                    sx={{ width: "95% !important", overflow: "visible !important" }}
                />
              }
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OverviewMonths;
