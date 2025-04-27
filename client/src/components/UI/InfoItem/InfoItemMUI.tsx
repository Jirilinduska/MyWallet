import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material"
import React from "react";
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { useUserContext } from "../../../context/UserContext"

interface InfoItemMUIProps {
    title: string
    amount: number
    color: "error" | "info" | "success" | "primary"
    icon?: React.ReactElement
    formatToCurrency: boolean
    isExpense: boolean
    loading?: boolean
    formatToPercent?: boolean
}

const InfoItemMUI = ({ title, amount, color, icon, formatToCurrency, isExpense, loading, formatToPercent } : InfoItemMUIProps ) => {

    const { userCurrency } = useUserContext()

  return (
    <Card sx={{ minWidth: { xs: 150, md: 225 }, bgcolor: "background.paper" }}>

      <CardContent>

        { loading 
          ? ( <Skeleton variant="circular" width={30} height={30}/> )
          : ( icon && <Box mb={2} fontSize={20}>{icon}</Box> )
        }
        
        <Typography variant="h5" component="h6" fontWeight={600} mb={2} color={color}>
          {loading ? (
            <Skeleton />
          ) : (
            formatToCurrency 
              ? `${isExpense ? '-' : ''}${formatCurrency(amount, userCurrency)}`
              : formatToPercent ? `${amount}% `
              : amount
          )}
        </Typography>

        <Typography color="text.primary">
          { loading ? <Skeleton />  : <>{title}</> }
        </Typography>

      </CardContent>

    </Card>
  );
};

export default InfoItemMUI;
